import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
	name: "mf_remote",
	filename: "remoteEntry.js",
	exposes: {
		"./counter": "./src/components/counter.tsx",
		"./button": "./src/components/button.tsx",
	},
	shared: {
		react: { singleton: true },
		"react-dom": { singleton: true },
	},
	dts: {
		tsConfigPath: "./tsconfig.app.json",
	},
});
