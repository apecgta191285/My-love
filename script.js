// Floating Hearts
function createFloatingHearts() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        document.body.appendChild(heart);
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}
createFloatingHearts();

// Reveal Functionality
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach((el) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(el);
});

// Flip Cards
const cards = document.querySelectorAll('.flip-card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// Gallery Lightbox
const lightbox = document.querySelector('.lightbox');
const images = document.querySelectorAll('.lightbox img');
const galleryImages = document.querySelectorAll('.gallery img');
galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        lightbox.classList.add('active');
        const src = image.src;
        lightbox.querySelector('img').src = src;
    });
});
lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Promises
function fetchQuote() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Love is in the air!');
        }, 2000);
    });
}
fetchQuote().then(quote => {
    document.querySelector('.quote').textContent = quote;
});

// Music Player
const audio = document.querySelector('audio');
document.querySelector('#play').addEventListener('click', () => audio.play());
document.querySelector('#pause').addEventListener('click', () => audio.pause());

// Theme Toggle
const themeToggle = document.querySelector('#theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// Date Counter
const countDownDate = new Date('2026-02-14T00:00:00Z').getTime();
const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.querySelector('.date-counter').textContent = days + ' days until the big day!';
}, 1000);

// Love Quotes Carousel
const quotes = ['Love is in the air!', 'You are my sunshine!', 'Love never fails!'];
let index = 0;
setInterval(() => {
    document.querySelector('.quote-carousel').textContent = quotes[index];
    index = (index + 1) % quotes.length;
}, 3000);