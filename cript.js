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
    link.addEventListener("click", () => {
        if (navLinks) navLinks.classList.remove("active");
    });
});

// Current year in footer
const yearElement = document.getElementById("current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

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

// Three-phase AC waveform in the hero (phases 120 degrees apart)
const canvas = document.getElementById("waves");
if (canvas) {
    const ctx = canvas.getContext("2d");
    const colors = ["#f5a300", "#4fd1e8", "#ffffff"];
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
            ctx.globalAlpha = 0.75;
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        ctx.globalAlpha = 1;
        if (!reduce) {
            t += 0.03;
            requestAnimationFrame(draw);
        }
    }

    window.addEventListener("resize", () => { resize(); if (reduce) draw(); });
    resize();
    draw();
}
