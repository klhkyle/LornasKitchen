export function updateHeaderState() {
    const header = document.querySelector("header");
    const body = document.body;

    if (window.isLandingPage && window.scrollY === 0) {
        header.classList.add("large-header");
        body.classList.add("large-header-active");
    } else {
        header.classList.remove("large-header");
        body.classList.remove("large-header-active");
    }
}
