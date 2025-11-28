import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import moduleFederationConfig from "./module-federation.config";

export default defineConfig({
	plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],
	source: {
		entry: {
			index: "./src/index.tsx", // ← Add this! Point to index.tsx (not bootstrap)
		},
		tsconfigPath: "./tsconfig.app.json",
	},
	server: {
		port: 4201,
	},
});
