type ThemeMode = "light" | "dark" | "system";

/**
 * Applies the given theme mode to the document:
 * - 'system': checks the prefers-color-scheme and sets accordingly
 * - 'light': sets data-theme="light"
 * - 'dark': sets data-theme="dark"
 */
function applyTheme(mode: ThemeMode) {
	if (mode === "system") {
		const darkModeOn = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		document.documentElement.setAttribute(
			"data-theme",
			darkModeOn ? "dark" : "light",
		);
	} else {
		document.documentElement.setAttribute("data-theme", mode);
	}
}

function getStoredTheme(): ThemeMode {
	try {
		return (localStorage.getItem("theme") as ThemeMode) || "system";
	} catch (e) {
		return "system";
	}
}

function setStoredTheme(mode: ThemeMode) {
	try {
		localStorage.setItem("theme", mode);
	} catch (e) {
		// Silently fail if localStorage is not available
	}
}

/**
 * Returns the current theme mode, either from localStorage or 'system' if none is set.
 */
export function getTheme(): ThemeMode {
	return getStoredTheme();
}

/**
 * Sets and applies the specified theme mode. Also saves it to localStorage.
 */
export function setTheme(mode: ThemeMode) {
	setStoredTheme(mode);
	applyTheme(mode);
}

/**
 * Initializes the theme by reading the stored preference or defaulting to 'system'.
 * Also attaches a listener to update the theme if the system preference changes.
 * Note: The initial theme application is now handled by a blocking script in the HTML head.
 */
export function initTheme() {
	const mode = getStoredTheme();

	// Only apply theme if it hasn't been set yet (fallback for edge cases)
	const currentTheme = document.documentElement.getAttribute("data-theme");
	if (!currentTheme) {
		applyTheme(mode);
	}

	// When 'system' is chosen, automatically update if the user's system theme changes.
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", () => {
			if (getStoredTheme() === "system") {
				applyTheme("system");
			}
		});
}
