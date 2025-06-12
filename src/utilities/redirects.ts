/**
 * Utility functions for handling redirects to under construction pages
 */

export interface RedirectConfig {
	/** Pages or patterns that should redirect to under construction */
	underConstructionRoutes: string[];
	/** Documentation categories that should redirect to under construction */
	underConstructionDocCategories: string[];
}

/**
 * Default configuration for routes that should redirect to under construction
 */
export const defaultRedirectConfig: RedirectConfig = {
	underConstructionRoutes: ["/services", "/guides"],
	underConstructionDocCategories: [
		// Add category IDs here when they should redirect
		// Example: 'advanced-features', 'enterprise'
	],
};

/**
 * Check if a route should redirect to under construction
 */
export function shouldRedirectToUnderConstruction(
	path: string,
	config: RedirectConfig = defaultRedirectConfig,
): boolean {
	return config.underConstructionRoutes.includes(path);
}

/**
 * Check if a documentation category should redirect to under construction
 */
export function shouldDocCategoryRedirect(
	categoryId: string,
	config: RedirectConfig = defaultRedirectConfig,
): boolean {
	return config.underConstructionDocCategories.includes(categoryId);
}

/**
 * Get the under construction redirect response
 */
export function getUnderConstructionRedirect() {
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/under-construction",
		},
	});
}

/**
 * Check if a documentation collection has sufficient content
 * Returns true if the category has fewer than the minimum number of docs
 */
export function hasInsufficientContent(
	docCount: number,
	minimumDocs = 2,
): boolean {
	return docCount < minimumDocs;
}

/**
 * Helper to create redirect URLs with context for the under construction page.
 * The under construction page now supports props via query parameters or Astro.props.
 * Pass any of: from, reason, expectedDate, title, description, backLink, backText.
 */
export function createRedirectUrl(
	basePath = "/under-construction",
	context?: {
		from?: string;
		reason?: "missing-content" | "under-development" | "coming-soon";
		expectedDate?: string;
		title?: string;
		description?: string;
		backLink?: string;
		backText?: string;
	},
): string {
	if (!context) return basePath;

	const params = new URLSearchParams();
	if (context.from) params.set("from", context.from);
	if (context.reason) params.set("reason", context.reason);
	if (context.expectedDate) params.set("expected", context.expectedDate);
	if (context.title) params.set("title", context.title);
	if (context.description) params.set("description", context.description);
	if (context.backLink) params.set("backLink", context.backLink);
	if (context.backText) params.set("backText", context.backText);

	const queryString = params.toString();
	return queryString ? `${basePath}?${queryString}` : basePath;
}
