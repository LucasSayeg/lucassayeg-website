import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// Minimal subset of fields returned by `neonctl branches list --output json`.
// Source: https://neon.tech/docs/reference/cli-branches
export type NeonBranch = {
  id: string;
  name: string;
  parent_id?: string;
  created_at: string;
  expires_at?: string;
  primary?: boolean;
  protected?: boolean;
};

export function getEnvPath(): string {
  return path.join(process.cwd(), ".env.local");
}

export function readPostgresUrl(): string | null {
  const envPath = getEnvPath();
  if (!fs.existsSync(envPath)) return null;
  const env = fs.readFileSync(envPath, "utf8");
  const match = env.match(/^POSTGRES_URL=(.*)$/m);
  if (!match) return null;
  return match[1].trim().replace(/^["']|["']$/g, "");
}

export function writePostgresUrl(url: string): void {
  const envPath = getEnvPath();
  const env = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  const next = /^POSTGRES_URL=/m.test(env)
    ? env.replace(/^POSTGRES_URL=.*/m, `POSTGRES_URL=${url}`)
    : (env.endsWith("\n") || env.length === 0 ? env : env + "\n") + `POSTGRES_URL=${url}\n`;
  fs.writeFileSync(envPath, next);
}

export function parseEndpointId(url: string): string | null {
  // Neon hostnames look like: ep-cool-name-123456.us-east-1.aws.neon.tech
  const match = url.match(/\/\/[^@]*@(ep-[a-z0-9-]+)\./);
  return match ? match[1] : null;
}

export function requireNeonctl(): void {
  const probe = spawnSync("neonctl", ["--version"], { encoding: "utf8" });
  if (probe.status !== 0) {
    console.error("neonctl not available; install from https://neon.tech/docs/reference/cli");
    process.exit(1);
  }
}

export async function listBranches(): Promise<NeonBranch[]> {
  const result = spawnSync("neonctl", ["branches", "list", "--output", "json"], {
    encoding: "utf8",
  });
  if (result.status !== 0) {
    console.error("neonctl not available; install from https://neon.tech/docs/reference/cli");
    process.exit(1);
  }
  return JSON.parse(result.stdout) as NeonBranch[];
}

export async function getCurrentBranch(): Promise<NeonBranch | null> {
  const url = readPostgresUrl();
  if (!url) return null;
  const endpointId = parseEndpointId(url);
  if (!endpointId) return null;

  // The endpoint id is not in the branch list payload; resolve it by asking
  // neonctl for each branch's connection string and matching. To avoid N
  // round-trips, walk branches and short-circuit on first match.
  const branches = await listBranches();
  for (const branch of branches) {
    const cs = spawnSync("neonctl", ["connection-string", branch.name], { encoding: "utf8" });
    if (cs.status !== 0) continue;
    const branchEndpoint = parseEndpointId(cs.stdout.trim());
    if (branchEndpoint === endpointId) return branch;
  }
  return null;
}

export function formatBranchSummary(
  branch: Pick<NeonBranch, "name" | "parent_id" | "expires_at">,
  parentName: string | null,
): string {
  const parent = parentName ?? branch.parent_id ?? "—";
  const expiry = branch.expires_at
    ? `expires ${new Date(branch.expires_at).toISOString().slice(0, 10)}`
    : "no expiry";
  return `[db] on '${branch.name}' (parent: ${parent}, ${expiry})`;
}

export async function resolveParentName(branch: NeonBranch): Promise<string | null> {
  if (!branch.parent_id) return null;
  const branches = await listBranches();
  return branches.find((b) => b.id === branch.parent_id)?.name ?? null;
}

export function getConnectionString(branchName: string): string {
  const cs = spawnSync("neonctl", ["connection-string", branchName], { encoding: "utf8" });
  if (cs.status !== 0 || !cs.stdout.trim()) {
    console.error(`failed to get connection string for branch '${branchName}'`);
    process.exit(1);
  }
  return cs.stdout.trim();
}
