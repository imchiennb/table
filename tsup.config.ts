import { defineConfig } from "tsup";

const tsUpDefined = defineConfig({
  entry: ["src/lib/index.ts"],
  treeshake: true,
  clean: true,
  splitting: true,
  sourcemap: false,
  outDir: "dist",
  dts: true,
  format: ["cjs", "esm"],
  external: ["react", "react-dom"],
});

export default tsUpDefined;
