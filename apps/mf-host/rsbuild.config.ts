import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import moduleFederationConfig from "./module-federation.config";

export default defineConfig({
	html: {
		template: "./src/index.html",
	},
	plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],

	source: {
		entry: {
			index: "./src/main.tsx",
		},
		tsconfigPath: "./tsconfig.app.json",
	},
	server: {
		port: 4200,
	},
	output: {
		copy: [{ from: "./src/favicon.ico" }, { from: "./src/assets" }],

		target: "web",
		distPath: {
			root: "dist",
		},
	},
});
