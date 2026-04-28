/* eslint-disable no-restricted-exports */
/* THIS FILE IS ADAPTED FROM A PAYLOAD-GENERATED FILE — KEEP STRUCTURE SIMILAR */
import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";
import { notFound } from "next/navigation";
import { importMap } from "./admin/importMap";

const DISABLED = process.env.PAYLOAD_ENABLED === "false";

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  if (DISABLED) notFound();
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
};

export default Layout;
