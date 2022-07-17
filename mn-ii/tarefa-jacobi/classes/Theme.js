class Theme {
    static set(theme) {
        let html = document.querySelector("html");
        if (html.classList.contains("dark-theme") !== (theme === "dark")) {
            html.classList.toggle("dark-theme");
        }
        localStorage.setItem("theme", theme);
    }
    static load() {
        let defaultTheme = localStorage.getItem("theme");
        if (defaultTheme !== "light")
            defaultTheme = "dark";
        else
            defaultTheme = "light";
        Theme.set(defaultTheme);
    }
    static toggle() {
        if (localStorage.getItem("theme") !== "dark") {
            Theme.set("dark");
        } else {
            Theme.set("light");
        }
    }
}