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
	return (localStorage.getItem("theme") as ThemeMode) || "system";
}

function setStoredTheme(mode: ThemeMode) {
	localStorage.setItem("theme", mode);
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
 */
export function initTheme() {
	const mode = getStoredTheme();
	applyTheme(mode);

	// When 'system' is chosen, automatically update if the user’s system theme changes.
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", () => {
			if (getStoredTheme() === "system") {
				applyTheme("system");
			}
		});
}
