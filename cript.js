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

// Announcement banner
const banner = document.getElementById("banner");
const bannerClose = document.getElementById("bannerClose");
if (banner && bannerClose) bannerClose.addEventListener("click", () => banner.classList.add("hide"));

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

// Three-phase AC waveform in the hero (phases 120 degrees apart), with glow
const canvas = document.getElementById("waves");
if (canvas) {
    const ctx = canvas.getContext("2d");
    const colors = ["#ffc83d", "#4fd1e8", "#8b6bff"];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);
        colors.forEach((c, i) => {
            ctx.beginPath();
            for (let x = 0; x <= w; x += 4) {
                const y = h / 2 + Math.sin(x / 90 - t + i * 2.094) * (h * 0.32);
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.strokeStyle = c;
            ctx.shadowColor = c;
            ctx.shadowBlur = 14;
            ctx.globalAlpha = 0.85;
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        if (!reduce) {
            t += 0.03;
            requestAnimationFrame(draw);
        }
    }

    window.addEventListener("resize", () => { resize(); if (reduce) draw(); });
    resize();
    draw();
}
