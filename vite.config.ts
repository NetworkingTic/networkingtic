import { AliasOptions, defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
//@ts-ignore
import path from "path";

//@ts-ignore
const root = path.resolve(__dirname, "src");

// Identificador único de cada publicación. Se guarda dentro del código y en version.json;
// así la página puede detectar si el visitante tiene abierta una versión vieja (ver VersionCheck.tsx).
const BUILD_ID = new Date().toISOString();

const versionFile = (): Plugin => ({
  name: "version-file",
  apply: "build",
  generateBundle() {
    this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ id: BUILD_ID }) });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), versionFile()],
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID),
  },
  resolve: {
    alias: {
      "@": root,
      "@assets": path.resolve(root, "assets"),
    } as AliasOptions,
  },
});