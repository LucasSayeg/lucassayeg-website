import { getCurrentBranch, listBranches, requireNeonctl } from "./_lib/neon.js";

requireNeonctl();

const branches = await listBranches();
const current = await getCurrentBranch();

const byId = new Map(branches.map((b) => [b.id, b.name]));
const sorted = [...branches].sort(
  (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
);

const rows = sorted.map((b) => ({
  marker: current && b.id === current.id ? "*" : " ",
  name: b.name,
  parent: b.parent_id ? (byId.get(b.parent_id) ?? b.parent_id) : "—",
  created: b.created_at.slice(0, 10),
  expires: b.expires_at ? b.expires_at.slice(0, 10) : "—",
}));

const header = {
  marker: " ",
  name: "name",
  parent: "parent",
  created: "created",
  expires: "expires",
};
const all = [header, ...rows];

const widths = {
  marker: 1,
  name: Math.max(...all.map((r) => r.name.length)),
  parent: Math.max(...all.map((r) => r.parent.length)),
  created: Math.max(...all.map((r) => r.created.length)),
  expires: Math.max(...all.map((r) => r.expires.length)),
};

const pad = (s: string, n: number) => s + " ".repeat(Math.max(0, n - s.length));
const fmt = (r: typeof header) =>
  `${r.marker} ${pad(r.name, widths.name)}  ${pad(r.parent, widths.parent)}  ${pad(r.created, widths.created)}  ${pad(r.expires, widths.expires)}`;

console.log(fmt(header));
console.log(
  `${" ".repeat(2)}${"-".repeat(widths.name)}  ${"-".repeat(widths.parent)}  ${"-".repeat(widths.created)}  ${"-".repeat(widths.expires)}`,
);
for (const r of rows) console.log(fmt(r));

if (!current) {
  console.log("\n(no current branch — `.env.local` POSTGRES_URL is missing or unmatched)");
}
