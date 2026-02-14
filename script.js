document.addEventListener('DOMContentLoaded', () => {
    // 1. Floating Hearts
    function createFloatingHearts() {
        const container = document.getElementById('floatingHearts');
        if (!container) return;

        // Clear existing just in case
        container.innerHTML = '';

        for (let i = 0; i < 15; i++) {
            spawnHeart(container);
        }
    }

    function spawnHeart(container) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 4}s`; // 4-7s duration
        heart.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
            spawnHeart(container); // Infinite loop
        });
    }

    createFloatingHearts();

    // 2. Reveal Functionality
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => observer.observe(el));
    }

    // 3. Flip Cards
    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });

    // 4. Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryImages = document.querySelectorAll('.shot');

    if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
        galleryImages.forEach(btn => {
            btn.addEventListener('click', () => {
                const img = btn.querySelector('img');
                const caption = btn.getAttribute('data-caption');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxCaption.textContent = caption || '';
                    lightbox.classList.remove('hidden');
                }
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add('hidden');
            }
        });
    }

    // 5. Promises Button
    const promiseBtn = document.getElementById('promiseBtn');
    const promiseText = document.getElementById('promiseText');
    const promises = [
        "เราจะอยู่ข้างเธอให้มากที่สุดเท่าที่เราจะทำได้",
        "จะคอยรับฟังเธอเสมอ",
        "จะพาไปกินของอร่อยๆ บ่อยๆ",
        "จะเป็นกำลังใจให้เธอในทุกๆ เรื่อง",
        "จะรักเธอในแบบที่เธอเป็น",
        "จะพาไปเที่ยวทุกที่ที่อยากไป"
    ];

    if (promiseBtn && promiseText) {
        promiseBtn.addEventListener('click', () => {
            const randomPromise = promises[Math.floor(Math.random() * promises.length)];
            promiseText.textContent = randomPromise;
            // Re-trigger animation
            promiseText.style.animation = 'none';
            promiseText.offsetHeight; /* trigger reflow */
            promiseText.style.animation = 'reveal 0.5s ease';
        });
    }

    // 6. Final Button (Hug)
    const finalBtn = document.getElementById('finalBtn');
    const finalMessage = document.getElementById('finalMessage');
    if (finalBtn && finalMessage) {
        finalBtn.addEventListener('click', () => {
             finalMessage.classList.remove('hidden');
        });
    }

    // 7. Hero Burst Button
    const burstBtn = document.getElementById('burstBtn');
    if (burstBtn) {
        burstBtn.addEventListener('click', () => {
            for(let i=0; i<15; i++) {
                createBurstHeart();
            }
        });
    }

    function createBurstHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart tap';
        // Random position near center but spread out
        heart.style.left = `${50 + (Math.random() - 0.5) * 50}vw`;
        heart.style.top = `${50 + (Math.random() - 0.5) * 50}vh`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

    // 8. Open Letter Button
    const openLetterBtn = document.getElementById('openLetterBtn');
    if (openLetterBtn) {
        openLetterBtn.addEventListener('click', () => {
            const letterSection = document.getElementById('letterSection');
            if (letterSection) {
                letterSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 9. Music Player
    const audio = document.getElementById('bgMusic');
    const playBtn = document.getElementById('play');
    const pauseBtn = document.getElementById('pause');

    if (audio && playBtn && pauseBtn) {
        playBtn.addEventListener('click', () => {
            const source = audio.querySelector('source');
            if (source && source.src && source.src !== window.location.href) {
                 audio.play().catch(e => {
                     console.log("Audio play failed:", e);
                     alert("ไม่สามารถเล่นเพลงได้ (Browser might block autoplay or file missing)");
                 });
            } else {
                alert("ยังไม่ได้ใส่เพลงนะ!");
            }
        });
        pauseBtn.addEventListener('click', () => {
            audio.pause();
        });
    }

    // 10. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                themeToggle.textContent = '☀️';
            } else {
                themeToggle.textContent = '🌙';
            }
        });
    }

    // 11. Date Counter
    const dateCounter = document.querySelector('.date-counter');
    if (dateCounter) {
        // Target Date: 2026-02-14
        const targetDate = new Date('2026-02-14T00:00:00');

        function updateCounter() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                 dateCounter.textContent = "Today is the big day!";
                 return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            dateCounter.textContent = `${days} days until the big day!`;
        }

        updateCounter();
        setInterval(updateCounter, 1000 * 60 * 60);
    }

    // 12. Love Quotes Carousel
    const quoteCarousel = document.querySelector('.quote-carousel');
    if (quoteCarousel) {
        const quotes = [
            'Love is in the air!',
            'You are my sunshine!',
            'Love never fails!',
            'Every moment with you is magic.',
            'My heart is wherever you are.'
        ];
        let index = 0;

        // Ensure transition property
        quoteCarousel.style.transition = "opacity 0.5s ease";

        function showQuote() {
            quoteCarousel.style.opacity = 0;
            setTimeout(() => {
                quoteCarousel.textContent = quotes[index];
                quoteCarousel.style.opacity = 1;
                index = (index + 1) % quotes.length;
            }, 500);
        }

        showQuote();
        setInterval(showQuote, 4000);
    }

    // 13. Fetch Quote (Simulated)
    const quoteFooter = document.querySelector('.quote');
    if (quoteFooter) {
         setTimeout(() => {
             quoteFooter.textContent = "“The best thing to hold onto in life is each other.”";
         }, 1000);
    }
});
