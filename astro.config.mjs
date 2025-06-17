// @ts-check
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	adapter: node({ mode: "standalone" }),
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [metaTags()],
});
