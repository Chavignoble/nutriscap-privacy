document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".topnav").forEach((nav) => {
        const toggle = nav.querySelector(".nav-toggle");
        const links = nav.querySelector(".nav-links");
        if (toggle && links) {
            const ICON_MENU = `\n        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>\n      `;
            const ICON_CLOSE = `\n        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>\n      `;

            // Ensure initial icon is burger
            toggle.innerHTML = ICON_MENU;

            toggle.addEventListener("click", () => {
                const opened = nav.classList.toggle("open");
                toggle.setAttribute("aria-expanded", opened ? "true" : "false");
                toggle.setAttribute(
                    "aria-label",
                    opened ? "Fermer le menu" : "Ouvrir le menu"
                );
                toggle.innerHTML = opened ? ICON_CLOSE : ICON_MENU;
            });

            links.querySelectorAll("a").forEach((a) =>
                a.addEventListener("click", () => {
                    if (nav.classList.contains("open")) {
                        nav.classList.remove("open");
                        toggle.setAttribute("aria-expanded", "false");
                        toggle.innerHTML = ICON_MENU;
                    }
                })
            );
        }
    });

    // Inline external SVGs to allow CSS color control (no-op for PNG)
    const inlineSvg = async (img) => {
        try {
            const res = await fetch(img.src);
            const text = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "image/svg+xml");
            const svg = doc.documentElement;
            svg.querySelectorAll("*").forEach((el) => {
                if (
                    el.getAttribute("fill") &&
                    el.getAttribute("fill") !== "none"
                )
                    el.removeAttribute("fill");
                if (
                    el.getAttribute("stroke") &&
                    el.getAttribute("stroke") !== "none"
                )
                    el.removeAttribute("stroke");
            });
            svg.setAttribute("fill", "currentColor");
            svg.setAttribute("aria-hidden", img.alt ? "false" : "true");
            svg.classList.add(...img.classList);
            svg.removeAttribute("xmlns:a");
            img.replaceWith(svg);
        } catch (e) {
            /* ignore */
        }
    };
    document.querySelectorAll("img[data-inline-svg]").forEach(inlineSvg);
});
