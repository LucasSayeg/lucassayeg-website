import { getPayload } from "payload";
import config from "@payload-config";
import { seedHomePage } from "./home-page";
import { seedSettings } from "./settings";
import { seedSiteInfo } from "./site-info";

async function main() {
  const force = process.argv.includes("--force");
  const payload = await getPayload({ config });
  await seedSettings(payload, { force });
  await seedSiteInfo(payload, { force });
  await seedHomePage(payload, { force });
  console.log("Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
