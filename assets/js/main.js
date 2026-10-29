const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

// Mark the sidebar link of the section currently in view.
if ("IntersectionObserver" in window) {
    const links = document.querySelectorAll('.navigation a[href^="#"]');
    const linkById = {};

    links.forEach((link) => {
        linkById[link.getAttribute("href").slice(1)] = link;
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((link) => link.removeAttribute("aria-current"));
                const active = linkById[entry.target.id];
                if (active) active.setAttribute("aria-current", "true");
            });
        },
        { rootMargin: "-30% 0px -60% 0px" }
    );

    Object.keys(linkById).forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}