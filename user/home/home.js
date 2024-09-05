// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
}

// Appointment button functionality
const appointmentBtn = document.querySelector('.appointment-btn');

if (appointmentBtn) {
    appointmentBtn.addEventListener('click', () => {
        // Add appointment scheduling logic here
        alert('Appointment scheduling coming soon!');
    });
}
