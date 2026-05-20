import {
  formatBranchSummary,
  getConnectionString,
  listBranches,
  requireNeonctl,
  resolveParentName,
  writePostgresUrl,
} from "./_lib/neon.js";

const args = process.argv.slice(2);
const allowProd = args.includes("--allow-prod");
const positional = args.filter((a) => !a.startsWith("--"));
const target = positional[0];

if (!target) {
  console.error("usage: tsx scripts/db-switch.ts <branch-name> [--allow-prod]");
  process.exit(1);
}

requireNeonctl();

const branches = await listBranches();
const match = branches.find((b) => b.name === target);
if (!match) {
  console.error(
    `[db] no branch named '${target}' — run \`pnpm db:branches\` to list available branches`,
  );
  process.exit(1);
}

if (target === "main" && !allowProd) {
  console.error(
    "[db] refusing to switch to 'main' (production). If you meant to reset your dev branch, use `pnpm db:reset`. If you meant to create/point at your dev branch, use `pnpm db:branch`. To override, re-run with --allow-prod.",
  );
  process.exit(1);
}

writePostgresUrl(getConnectionString(target));

const parentName = await resolveParentName(match);
console.log(formatBranchSummary(match, parentName));
