import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
	name: "mf_host",
	exposes: {},
	remotes: {
		mf_remote: "mf_remote@http://localhost:4201/remoteEntry.js",
	},
	shareStrategy: "loaded-first",
	shared: {
		react: {
			singleton: true,
		},
		"react-dom": {
			singleton: true,
		},
	},
	dts: {
		tsConfigPath: "./tsconfig.app.json",
		consumeTypes: true,
	},
});
