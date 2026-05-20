import { spawnSync } from "node:child_process";

const env = process.env.VERCEL_ENV ?? "unknown";

if (env !== "production") {
  console.log(`[migrate] skipped on non-production deploy (VERCEL_ENV=${env})`);
  process.exit(0);
}

const r = spawnSync("payload", ["migrate"], { stdio: "inherit" });
process.exit(r.status ?? 1);
