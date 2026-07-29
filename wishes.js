// Music control
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = musicToggle.querySelector('.music-icon');

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('playing');
        musicIcon.textContent = '🎵';
        localStorage.setItem('musicPlaying', 'true');
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicIcon.textContent = '🔇';
        localStorage.setItem('musicPlaying', 'false');
    }
}

musicToggle.addEventListener('click', toggleMusic);

// Check if music was playing on previous page
if (localStorage.getItem('musicPlaying') === 'true') {
    bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        musicIcon.textContent = '🎵';
    }).catch(() => {
        musicIcon.textContent = '🔇';
    });
}

// ===== CUSTOMIZE: Add your reasons here! =====
// Each reason has:
// - text: The message to display
// - emoji: An emoji shown before the text
// - gif: Animation file to show (optional, use animation-1.gif or animation-2.gif)
const reasons = [
    {
        text: "Because from our very first meeting to today, you have been my greatest blessing! 🏡💖",
        emoji: "✨",
        gif: "gif1.gif"
    },
    {
        text: "Because your smile lights up my entire world! 😍💫",
        emoji: "🌸",
        gif: "gif2.gif"
    },
    {
        text: "Because holding your hand makes me feel complete and at home! 👫💕",
        emoji: "🤝",
        gif: "gif1.gif"
    },
    {
        text: "Because every date, every laugh, and every conversation with you feels magical! ☕🌹",
        emoji: "💖",
        gif: "gif2.gif"
    },
    {
        text: "Because your sweet kisses leave the most beautiful marks on my heart! 💋❤️",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: "Because I love you more than words can ever say—Happy 24th Birthday, Hasti! 🎂🎉",
        emoji: "🎊",
        gif: "gif2.gif"
    }
];

// True 180-degree 3D Flip Card state management
let currentReasonIndex = 0;
let currentAngle = 0;
let isFlipping = false;

const cardInner = document.getElementById('card-inner');
const frontBadge = document.getElementById('front-badge');
const frontEmoji = document.getElementById('front-emoji');
const frontText = document.getElementById('front-text');

const backBadge = document.getElementById('back-badge');
const backEmoji = document.getElementById('back-emoji');
const backText = document.getElementById('back-text');

const nextBtn = document.getElementById('next-btn');

function populateFace(side, index) {
    const r = reasons[index];
    if (side === 'front') {
        if (frontBadge) frontBadge.textContent = `Reason ${index + 1} of ${reasons.length}`;
        if (frontEmoji) frontEmoji.textContent = r.emoji;
        if (frontText) frontText.textContent = r.text;
    } else {
        if (backBadge) backBadge.textContent = `Reason ${index + 1} of ${reasons.length}`;
        if (backEmoji) backEmoji.textContent = r.emoji;
        if (backText) backText.textContent = r.text;
    }
}

// Initialize front and back faces
if (cardInner) {
    populateFace('front', 0);
    populateFace('back', 1 % reasons.length);
    if (nextBtn) nextBtn.textContent = `Next Reason 🔄 (2 of ${reasons.length})`;
}

function flipToNextReason() {
    if (isFlipping) return;

    // If already at last reason and button is in story-mode
    if (currentReasonIndex === reasons.length - 1 && nextBtn && nextBtn.classList.contains('story-mode')) {
        gsap.to('body', {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                window.location.href = 'timeline.html';
            }
        });
        return;
    }

    isFlipping = true;

    // Rotate continuously by 180 degrees
    currentAngle += 180;
    currentReasonIndex = (currentReasonIndex + 1) % reasons.length;

    gsap.to(cardInner, {
        rotationY: currentAngle,
        duration: 0.65,
        ease: "power2.inOut",
        onComplete: () => {
            // Update button text
            if (nextBtn) {
                if (currentReasonIndex === reasons.length - 1) {
                    nextBtn.textContent = "Continue to Timeline 💫";
                    nextBtn.classList.add('story-mode');
                } else {
                    nextBtn.textContent = `Next Reason 🔄 (${currentReasonIndex + 2} of ${reasons.length})`;
                    nextBtn.classList.remove('story-mode');
                }
            }

            // Prepare the hidden face for the subsequent reason
            const nextHiddenIndex = (currentReasonIndex + 1) % reasons.length;
            if ((currentAngle / 180) % 2 === 1) {
                // Currently showing Back, so Front is hidden -> update Front
                populateFace('front', nextHiddenIndex);
            } else {
                // Currently showing Front, so Back is hidden -> update Back
                populateFace('back', nextHiddenIndex);
            }

            createFloatingElement();
            isFlipping = false;
        }
    });
}

const handleFlip = function(e) {
    if (e.type === 'touchend') e.preventDefault();
    flipToNextReason();
};

if (cardInner) {
    cardInner.addEventListener('click', handleFlip);
    cardInner.addEventListener('touchend', handleFlip);
}

if (nextBtn) {
    nextBtn.addEventListener('click', handleFlip);
    nextBtn.addEventListener('touchend', handleFlip);
}

// Floating elements function
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);
