// =====================================================
// SPACE BACKGROUND ANIMATION (UNIVERSAL FOR ALL PAGES)
// =====================================================

// =============== MATRIX RAIN (opsional, bisa dihapus) ==================
const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const techElements = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()[]{}<>/\\~";
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 20, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ffcc";
    ctx.font = fontSize + "px monospace";

    drops.forEach((drop, i) => {
        const text = techElements[Math.floor(Math.random() * techElements.length)];
        ctx.fillText(text, i * fontSize, drop * fontSize);

        if (drop * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}

setInterval(drawMatrix, 40);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// =====================================================
// ELEMENTS: MOON – PLANET ORBIT – GALAXY – STARS – METEORS
// =====================================================

// Bulan (kiri atas)
function createMoon() {
    const moon = document.createElement("div");
    moon.className = "moon";
    document.body.appendChild(moon);
}

// Planet orbiting around galaxy center
function createOrbitPlanet() {
    const orbitContainer = document.createElement("div");
    orbitContainer.className = "orbit-container";

    const planet = document.createElement("div");
    planet.className = "orbit-planet";

    orbitContainer.appendChild(planet);
    document.body.appendChild(orbitContainer);
}

// Spiral Galaxy glowing
function createGalaxy() {
    const galaxy = document.createElement("div");
    galaxy.className = "galaxy";
    document.body.appendChild(galaxy);
}

// Stars drifting across space
function createStars(amount = 150) {
    for (let i = 0; i < amount; i++) {
        const star = document.createElement("div");
        star.className = "star";

        star.style.top = Math.random() * 100 + "%";
        star.style.left = Math.random() * 100 + "%";

        star.style.animationDuration = (Math.random() * 5 + 3) + "s";
        star.style.animationDelay = (Math.random() * 5) + "s";

        document.body.appendChild(star);
    }
}

// Meteor Shooting
function createMeteor() {
    const meteor = document.createElement("div");
    meteor.className = "meteor";

    meteor.style.left = Math.random() * window.innerWidth + "px";
    meteor.style.top = "-100px";

    document.body.appendChild(meteor);

    setTimeout(() => meteor.remove(), 2500);
}

function startMeteors() {
    setInterval(createMeteor, 3000);
}

// RUN ALL ELEMENTS
document.addEventListener("DOMContentLoaded", () => {
    createMoon();
    createGalaxy();
    createOrbitPlanet();
    createStars();
    startMeteors();
});

// =====================================================
// METEOR AUTO GENERATOR (2–4 meteor acak)
// =====================================================

function createMeteor() {
    const meteor = document.createElement("div");
    meteor.className = "meteor";

    // Posisi random di atas layar
    meteor.style.top = "-100px";
    meteor.style.left = Math.random() * window.innerWidth + "px";

    // Ukuran random
    const size = Math.random() * 40 + 40;
    meteor.style.width = "2px";
    meteor.style.height = size + "px";

    document.body.appendChild(meteor);

    // Hapus meteor setelah animasi selesai
    setTimeout(() => meteor.remove(), 1500);
}

// Generate 2–4 meteor setiap 3–6 detik
function startMeteorShower() {
    setInterval(() => {
        const meteorCount = Math.floor(Math.random() * 3) + 2; // 2–4 meteor
        for (let i = 0; i < meteorCount; i++) {
            setTimeout(createMeteor, i * 300); // jeda sedikit biar realistis
        }
    }, Math.random() * 3000 + 4000); // interval 4–7 detik
}

document.addEventListener("DOMContentLoaded", startMeteorShower);

// ====== Tambah Elemen Lucu (Astronot, UFO, Alien, Planet) ======
function createCuteElements() {
    const assets = [
        { class: "astronaut", src: "https://i.ibb.co/qhrxnFv/astronaut.png" },
        { class: "ufo", src: "https://i.ibb.co/DpZXBcr/ufo.png" },
        { class: "alien", src: "https://i.ibb.co/Mf8RbKH/alien.png" },
        { class: "cute-planet", src: "https://i.ibb.co/vwhJtFC/cuteplanet.png" }
    ];

    assets.forEach(a => {
        const img = document.createElement("img");
        img.className = a.class;
        img.src = a.src;
        document.body.appendChild(img);
    });
}

// Tambahkan ke DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    createCuteElements();
});
