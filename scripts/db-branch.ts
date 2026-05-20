import { spawnSync } from "node:child_process";
import {
  formatBranchSummary,
  getConnectionString,
  listBranches,
  requireNeonctl,
  resolveParentName,
  writePostgresUrl,
} from "./_lib/neon.js";

const user = process.env.USER ?? "dev";
const branch = `dev-${user}`;
const EXPIRY_DAYS = 14;

requireNeonctl();

let branches = await listBranches();
const existing = branches.find((b) => b.name === branch);
if (!existing) {
  const r = spawnSync("neonctl", ["branches", "create", "--name", branch, "--parent", "main"], {
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
  branches = await listBranches();
}

const expiresAt = new Date(Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString();
const setExpiry = spawnSync(
  "neonctl",
  ["branches", "set-expiration", branch, "--expires-at", expiresAt],
  { encoding: "utf8" },
);
if (setExpiry.status !== 0) {
  console.warn(`[db] could not set expiration on '${branch}': ${setExpiry.stderr.trim()}`);
}

writePostgresUrl(getConnectionString(branch));

const refreshed = (await listBranches()).find((b) => b.name === branch);
if (refreshed) {
  const parentName = await resolveParentName(refreshed);
  console.log(formatBranchSummary(refreshed, parentName));
} else {
  console.log(`[db] on '${branch}'`);
}
