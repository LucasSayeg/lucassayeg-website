import {
  getCurrentBranch,
  readPostgresUrl,
  requireNeonctl,
  resolveParentName,
} from "./_lib/neon.js";

function formatAge(createdAt: string): string {
  const ms = Date.now() - new Date(createdAt).getTime();
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  if (days >= 1) return `${days}d`;
  const hours = Math.floor(ms / (60 * 60 * 1000));
  if (hours >= 1) return `${hours}h`;
  const mins = Math.floor(ms / (60 * 1000));
  return `${mins}m`;
}

function formatExpiry(expiresAt: string | undefined): string {
  if (!expiresAt) return "no expiry";
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (ms <= 0) return `expired ${new Date(expiresAt).toISOString().slice(0, 10)}`;
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const date = new Date(expiresAt).toISOString().slice(0, 10);
  return `expires ${date} (in ${days}d)`;
}

requireNeonctl();

if (!readPostgresUrl()) {
  console.error("[db] no POSTGRES_URL in .env.local — run `pnpm db:branch` to provision one");
  process.exit(2);
}

const current = await getCurrentBranch();
if (!current) {
  console.error("[db] POSTGRES_URL does not match any Neon branch in this project");
  process.exit(1);
}

const parentName = await resolveParentName(current);

if (current.name === "main") {
  const bold = (s: string) => `\x1b[1m\x1b[31m${s}\x1b[0m`;
  console.log(bold("[db] WARNING: local dev is pointed at 'main' (production)"));
  console.log(
    `  branch: main  parent: ${parentName ?? "—"}  age: ${formatAge(current.created_at)}  ${formatExpiry(current.expires_at)}`,
  );
  process.exit(0);
}

console.log(
  `[db] on '${current.name}'  parent: ${parentName ?? "—"}  age: ${formatAge(current.created_at)}  ${formatExpiry(current.expires_at)}`,
);
