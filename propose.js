// Custom cursor
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 16,
            y: e.clientY - 16,
            duration: 0.2
        });
    });
}

// Background Music Controller
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';

function updateMusicState() {
    if (isMusicPlaying) {
        bgMusic.play().catch(() => {});
        if (musicToggle) musicToggle.textContent = '🎵 Music ON';
    } else {
        bgMusic.pause();
        if (musicToggle) musicToggle.textContent = '🔇 Music OFF';
    }
}

if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;
        localStorage.setItem('musicPlaying', isMusicPlaying);
        updateMusicState();
    });
}

// Auto start music if enabled
window.addEventListener('DOMContentLoaded', () => {
    updateMusicState();
});

// Floating background hearts
const floatingContainer = document.getElementById('floating-container');
const floatingItems = ['💖', '💕', '🌹', '✨', '💍', '❤️'];

function createFloatingHeart() {
    if (!floatingContainer) return;
    const item = document.createElement('div');
    item.className = 'floating-heart';
    item.textContent = floatingItems[Math.floor(Math.random() * floatingItems.length)];
    item.style.left = Math.random() * 95 + 'vw';
    item.style.fontSize = (Math.random() * 22 + 16) + 'px';
    floatingContainer.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, 12000);
}

setInterval(createFloatingHeart, 900);

// Playful Dodging NO Button
const noBtn = document.getElementById('no-btn');
const noTexts = [
    "Nice try! 😉",
    "Are you sure? 🥺",
    "No escape! 💖",
    "Only YES allowed! 😘",
    "Just click YES! 💕",
    "You know you want to say YES! 🥰"
];
let noAttempts = 0;

function dodgeNoButton() {
    if (!noBtn) return;
    noAttempts++;

    const textIndex = Math.min(noAttempts - 1, noTexts.length - 1);
    noBtn.textContent = noTexts[textIndex];

    const padding = window.innerWidth < 600 ? 20 : 80;
    const safeWidth = Math.max(20, window.innerWidth - padding * 2 - noBtn.offsetWidth);
    const safeHeight = Math.max(20, window.innerHeight - padding * 2 - noBtn.offsetHeight);

    const randomX = padding + Math.random() * safeWidth;
    const randomY = padding + Math.random() * safeHeight;

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '999';

    gsap.fromTo(noBtn,
        { scale: 0.8 },
        { scale: 1.05, duration: 0.25, ease: "back.out(2)" }
    );
}

if (noBtn) {
    noBtn.addEventListener('mouseover', dodgeNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dodgeNoButton();
    });
}

// YES Celebration Button
const yesBtn = document.getElementById('yes-btn');
const proposalCard = document.getElementById('proposal-card');
const yesCelebration = document.getElementById('yes-celebration');

function launchHeartConfetti() {
    const duration = 8 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff1493', '#ff69b4', '#ffd700', '#ffb6c1']
        });
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff1493', '#ff69b4', '#ffd700', '#ffb6c1']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        gsap.to(proposalCard, {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                proposalCard.style.display = 'none';
                yesCelebration.style.display = 'block';

                gsap.fromTo(yesCelebration,
                    { scale: 0.7, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.3)" }
                );

                launchHeartConfetti();
            }
        });
    });
}
