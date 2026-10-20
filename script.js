// Portfolio JavaScript

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", open);
    });
}
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => { if (navLinks) navLinks.classList.remove("active"); });
});

// Current year in footer
const yearElement = document.getElementById("current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Project filter pills
const pills = document.querySelectorAll(".pill");
const cards = document.querySelectorAll(".projects article");
pills.forEach(pill => {
    pill.addEventListener("click", () => {
        pills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const f = pill.dataset.filter;
        cards.forEach(c => { c.hidden = !(f === "all" || c.dataset.cat === f); });
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});
