/*  PARTICLES */
if (window.particlesJS) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 60 },
            color: { value: '#6366f1' },
            shape: { type: 'circle' },
            size: { value: 3 },
            line_linked: { enable: true, color: '#6366f1' },
            move: { enable: true, speed: 2 }
        }
    });
}

/*  NAVBAR TOGGLE  */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

/*  NAVBAR SCROLL  */
window.addEventListener('scroll', () => {
    document
        .getElementById('navbar')
        ?.classList.toggle('scrolled', window.scrollY > 50);
});

/* TYPEWRITER  */
const words = ['Developer', 'Designer', 'Coder'];
let i = 0, j = 0;
const el = document.getElementById('typewriter');

(function type() {
    if (!el) return;
    el.textContent = words[i].slice(0, j++);
    if (j > words[i].length) {
        j = 0;
        i = (i + 1) % words.length;
    }
    setTimeout(type, 200);
})();

/* SMOOTH SCROLL*/
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document
            .querySelector(link.getAttribute('href'))
            ?.scrollIntoView({ behavior: 'smooth' });
    });
});

/*  CONTACT FORM  */
const form = document.getElementById('contactForm');
const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL';

form?.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(() => alert('Message Sent'))
    .catch(() => alert('Error sending message'))
    .finally(() => form.reset());
});
