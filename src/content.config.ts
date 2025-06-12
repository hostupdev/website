import { defineCollection, reference, z } from "astro:content";
import { file, glob } from "astro/loaders";

const docCategories = defineCollection({
	loader: file("src/content/docs/categories.yml"),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		icon: z.string(),
		textColor: z.string(),
		bgColor: z.string(),
		order: z.number(),
	}),
});

const docs = defineCollection({
	loader: glob({
		pattern: "**/*{.md,.mdx}",
		base: "src/content/docs",
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: reference("docCategories"),
		order: z.number().optional(),
		tags: z.array(z.string()).optional(),
		lastUpdated: z.date().optional(),
		author: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = {
	docs,
	docCategories,
};
