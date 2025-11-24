import react from "@vitejs/plugin-react";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import * as path from "path";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	root: __dirname,
	cacheDir: "../../node_modules/.vite/packages/ui",
	plugins: [
		react(),
		dts({
			entryRoot: "src",
			tsconfigPath: path.join(__dirname, "tsconfig.lib.json"),
			insertTypesEntry: true,
		}),
		// Plugin to copy globals.css to dist
		{
			name: "copy-globals-css",
			writeBundle() {
				try {
					mkdirSync(resolve(__dirname, "dist/styles"), { recursive: true });
					copyFileSync(
						resolve(__dirname, "src/styles/globals.css"),
						resolve(__dirname, "dist/globals.css"),
					);
				} catch (err) {
					console.warn("Failed to copy globals.css:", err);
				}
			},
		},
		{
			name: "add-use-client",
			writeBundle() {
				const files = ["dist/index.js", "dist/index.cjs"];
				files.forEach((file) => {
					try {
						const filePath = resolve(__dirname, file);
						const content = readFileSync(filePath, "utf-8");
						// Only add if not already present
						if (
							!content.startsWith('"use client"') &&
							!content.startsWith("'use client'")
						) {
							writeFileSync(filePath, `"use client";\n${content}`);
							console.log(`Added "use client" to ${file}`);
						}
					} catch (err) {
						console.warn(`Could not add "use client" to ${file}:`, err);
					}
				});
			},
		},
	],
	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [],
	// },
	// Configuration for building your library.
	// See: https://vitejs.dev/guide/build.html#library-mode
	build: {
		outDir: "./dist",
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: "src/index.ts",
			name: "@lewora/ui",
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ["es", "cjs", "umd"],
			fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
		},
		rollupOptions: {
			// External packages that should not be bundled into your library.
			external: ["react", "react-dom", "react/jsx-runtime"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
		cssCodeSplit: false,
	},
	resolve: {
		alias: {
			"@lewora/ui": resolve(__dirname, "src"), // NOTE: should reflect the compilerOptions.paths in tsconfig.lib.json
		},
	},
});
