import { buildConfig } from "payload";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { pt } from "@payloadcms/translations/languages/pt";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { HomeComoAjuda } from "./globals/HomeComoAjuda";
import { HomeContactForm } from "./globals/HomeContactForm";
import { HomeContato } from "./globals/HomeContato";
import { HomeFaq } from "./globals/HomeFaq";
import { HomeHero } from "./globals/HomeHero";
import { HomeLayout } from "./globals/HomeLayout";
import { HomeServicos } from "./globals/HomeServicos";
import { HomeSobre } from "./globals/HomeSobre";
import { SiteInfo } from "./globals/SiteInfo";
import { SobrePage } from "./globals/SobrePage";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: {
    fallbackLanguage: "pt",
    supportedLanguages: { pt },
  },
  collections: [Users, Media],
  globals: [
    SiteInfo,
    HomeLayout,
    HomeHero,
    HomeComoAjuda,
    HomeSobre,
    HomeServicos,
    HomeFaq,
    HomeContato,
    HomeContactForm,
    SobrePage,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures],
  }),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: vercelPostgresAdapter({ pool: { connectionString: process.env.POSTGRES_URL } }),
  plugins: [
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? "",
    }),
  ],
});
