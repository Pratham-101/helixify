// Fix for Appointment button functionality
const appointmentBtn = document.querySelector('#appointment-btn a');

if (appointmentBtn) {
    appointmentBtn.addEventListener('click', (event) => {
        // Ensure the link works for redirection
        window.location.href = appointmentBtn.getAttribute('href');
    });
}

// Parallax effect on mouse move for hero section background
const heroSection = document.querySelector('.hero');

window.addEventListener('mousemove', function (e) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    // Move the background image based on cursor position
    heroSection.style.backgroundPosition = `${x}% ${y}%`;
});

// Example of implementing smooth scroll for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add hover effects and interactions for hero section buttons
const heroButtons = document.querySelectorAll('.hero-buttons-row .main-btn');

heroButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-5px)'; // Lifting effect
        button.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)'; // Shadow on hover
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)'; // Reset position
        button.style.boxShadow = 'none'; // Reset shadow
    });
});

// Example to add animations on scroll (for better visual creativity)
const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');

const appearOptions = {
    threshold: 0,
    rootMargin: '0px 0px -200px 0px'
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});

// Functionality to open/close the navbar for mobile view
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
