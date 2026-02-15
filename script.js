function checkAge() {
    let age = document.getElementById("ageInput").value;
    if (age == "55") {
        document.getElementById("page1").classList.add("hidden");
        document.getElementById("page2").classList.remove("hidden");
        document.getElementById("bgMusic").play().catch(() => {}); // ignore autoplay blocks

        startConfettiRain();   // endless confetti
        startBalloonsFloat();  // endless balloons
        startFireworks();      // improved fireworks
        startSlideshow();       // unchanged slideshow

        setTimeout(() => {
            document.getElementById("giftCake").classList.remove("hidden");
        }, 5000);

        setTimeout(() => {
            document.getElementById("sparkle").classList.remove("hidden");
        }, 6000);
    } else {
        document.getElementById("error").textContent = "Oops! That’s not the correct age 😉";
    }
}

// ================== ENDLESS CONFETTI ==================
let confettiInterval;
function startConfettiRain() {
    // Clear any previous interval (if restarting)
    if (confettiInterval) clearInterval(confettiInterval);

    // Create a batch of confetti every 200ms
    confettiInterval = setInterval(() => {
        for (let i = 0; i < 20; i++) { // 20 new pieces each time
            createConfettiPiece();
        }
    }, 200);

    // Also create an initial big burst
    for (let i = 0; i < 100; i++) {
        createConfettiPiece();
    }
}

function createConfettiPiece() {
    const conf = document.createElement("div");
    conf.classList.add("confetti");

    // Random styles
    conf.style.left = Math.random() * 100 + "%";
    conf.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    conf.style.width = (Math.random() * 10 + 5) + "px";
    conf.style.height = (Math.random() * 10 + 5) + "px";
    conf.style.animationDuration = (Math.random() * 4 + 3) + "s"; // 3-7 seconds
    conf.style.animationDelay = "0s";
    conf.style.opacity = Math.random() * 0.8 + 0.2;

    // Remove after animation ends to avoid memory buildup
    conf.addEventListener("animationend", () => {
        conf.remove();
    });

    document.body.appendChild(conf);
}

// ================== ENDLESS BALLOONS ==================
let balloonInterval;
function startBalloonsFloat() {
    if (balloonInterval) clearInterval(balloonInterval);

    balloonInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) { // 5 new balloons every 800ms
            createBalloon();
        }
    }, 800);

    // Initial burst
    for (let i = 0; i < 20; i++) {
        createBalloon();
    }
}

function createBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.textContent = "🎈";

    // Random left position
    balloon.style.left = Math.random() * 100 + "%";

    // Random colour
    const hue = Math.random() * 360;
    balloon.style.backgroundColor = `hsl(${hue}, 90%, 65%)`;

    // Random size (scale)
    const scale = 0.6 + Math.random() * 1.0;
    balloon.style.transform = `scale(${scale})`;

    // Random animation duration (8–16 seconds) and delay
    balloon.style.animationDuration = (Math.random() * 8 + 8) + "s";
    balloon.style.animationDelay = "0s";

    // Remove after floating away
    balloon.addEventListener("animationend", () => {
        balloon.remove();
    });

    document.body.appendChild(balloon);
}

// ================== IMPROVED FIREWORKS ==================
let fireworksInterval;
function startFireworks() {
    // Get or create canvas
    let canvas = document.getElementById("fireworks");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "fireworks";
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";     // so clicks pass through
    canvas.style.zIndex = "1";                // 🔻 behind everything

    // Clear previous interval
    if (fireworksInterval) clearInterval(fireworksInterval);

    let particles = [];

    // New burst every 800ms
    fireworksInterval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;
        // Less bright colors: lower saturation (70%) and lightness (50%)
        const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        for (let i = 0; i < 30; i++) {
            particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6 - 1.5,
                size: Math.random() * 3 + 1.5,
                color,
                life: 1.0,
                decay: 0.01 + Math.random() * 0.02
            });
        }
    }, 800);

    function animate() {
        // Very faint fade to keep background visible
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= p.decay;

            if (p.life <= 0 || p.y > canvas.height + 50) {
                particles.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.life * 0.8; // slightly transparent
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
// ================== SLIDESHOW (unchanged) ==================
function startSlideshow() {
    let slides = document.querySelectorAll(".slideshow img");
    let index = 0;
    setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }, 3000);
}