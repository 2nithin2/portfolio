// Add this at the beginning of your script.js
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body
    document.body.classList.add('loading');
});

// Loader handling
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    document.body.classList.remove('loading');
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
    
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icon with animation
    themeIcon.style.transform = 'scale(0)';
    
    setTimeout(() => {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon'; // Moon for dark mode
        } else {
            themeIcon.className = 'fas fa-sun'; // Sun for light mode
        }
        themeIcon.style.transform = 'scale(1) rotate(360deg)';
    }, 150);
}

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize AOS with enhanced settings
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out',
    disable: 'mobile'
});

// Navigation active state and smooth scroll
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// Smooth scroll with offset
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Update active class
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active state on scroll
function updateActiveLink() {
    const fromTop = window.scrollY + 100; // Offset for better activation point

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (fromTop >= sectionTop && fromTop <= sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Initialize EmailJS
emailjs.init("zwUYib7NBA0mc965I"); // Your EmailJS public key

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('button[type="submit"]');
const buttonText = submitButton.querySelector('.button-text');
const buttonLoader = submitButton.querySelector('.button-loader');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    submitButton.disabled = true;
    buttonText.textContent = 'Sending...';
    buttonLoader.classList.remove('hidden');

    try {
        const formData = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Message sent successfully!');
            this.reset();
        } else {
            throw new Error(data.message || 'Something went wrong!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    } finally {
        submitButton.disabled = false;
        buttonText.textContent = 'Send Message';
        buttonLoader.classList.add('hidden');
    }
});

// Enhanced form submission handler with validation
const contactFormValidation = document.querySelector('.contact-form');
if (contactFormValidation) {
    contactFormValidation.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Enhanced validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });
        showNotification('Thank you for your message! I will get back to you soon.', 'success');
        
        // Clear form
        this.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Enhanced scroll-based effects
const header = document.querySelector('.neu-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Enhanced header shadow effect
    if (currentScroll > 100) {
        header.style.boxShadow = `0 4px 20px ${getComputedStyle(document.documentElement)
            .getPropertyValue('--shadow-color')}`;
    } else {
        header.style.boxShadow = `0 2px 10px ${getComputedStyle(document.documentElement)
            .getPropertyValue('--shadow-color')}`;
    }
});

// Intersection Observer for smooth section reveals
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Mobile Menu Toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-btn neu-button';
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.nav-controls').prepend(mobileMenuButton);

mobileMenuButton.addEventListener('click', () => {
    document.querySelector('.nav-controls').classList.toggle('active');
    mobileMenuButton.innerHTML = document.querySelector('.nav-controls').classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Visitor Counter
async function updateVisitorCount() {
    try {
        const response = await fetch('https://api.countapi.xyz/hit/nithinportfolio/visits');
        const data = await response.json();
        document.getElementById('visitor-count').textContent = data.value.toLocaleString();
    } catch (error) {
        console.error('Error updating visitor count:', error);
    }
}

// Update visitor count when page loads
document.addEventListener('DOMContentLoaded', updateVisitorCount);

// Handle flip card back scroll
document.querySelectorAll('.flip-card-back').forEach(card => {
    let isScrolling;
    
    card.addEventListener('scroll', () => {
        // Add scrolled class immediately when scrolling starts
        if (card.scrollTop > 10) {
            card.classList.add('scrolled');
        } else {
            card.classList.remove('scrolled');
        }
        
        // Clear the existing timeout
        window.clearTimeout(isScrolling);
        
        // Set a timeout to remove the class when scrolling stops
        isScrolling = setTimeout(() => {
            if (card.scrollTop <= 10) {
                card.classList.remove('scrolled');
            }
        }, 100);
    });
});
