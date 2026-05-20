import { spawnSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { getCurrentBranch, listBranches, requireNeonctl } from "./_lib/neon.js";

const args = process.argv.slice(2);
const skipConfirm = args.includes("--yes") || args.includes("-y");
const positional = args.filter((a) => !a.startsWith("--") && a !== "-y");
const target = positional[0];

if (!target) {
  console.error("usage: tsx scripts/db-delete.ts <branch-name> [--yes]");
  process.exit(1);
}

if (target === "main") {
  console.error("[db] refusing to delete 'main' (production branch).");
  process.exit(1);
}

requireNeonctl();

const branches = await listBranches();
const match = branches.find((b) => b.name === target);
if (!match) {
  console.error(`[db] no branch named '${target}'`);
  process.exit(1);
}

const current = await getCurrentBranch();
if (current && current.id === match.id) {
  console.error(
    `[db] refusing to delete '${target}' — it is your current branch. Switch away first (e.g. \`pnpm db:switch main --allow-prod\` or another dev branch).`,
  );
  process.exit(1);
}

if (!skipConfirm) {
  const rl = createInterface({ input, output });
  const answer = await rl.question(`Delete Neon branch '${target}'? [y/N] `);
  rl.close();
  if (!/^y(es)?$/i.test(answer.trim())) {
    console.log("[db] aborted.");
    process.exit(0);
  }
}

const r = spawnSync("neonctl", ["branches", "delete", target], { stdio: "inherit" });
process.exit(r.status ?? 0);
