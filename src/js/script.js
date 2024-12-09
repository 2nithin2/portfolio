/**
 * Main JavaScript file for portfolio website
 * Handles core functionality including theme switching, animations,
 * navigation, and interactive features
 */

// Initialize page loader
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body for initial animation
    document.body.classList.add('loading');
});

// Handle page load completion
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    document.body.classList.remove('loading');
    
    // Fade out loader
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
    
    // Remove loader from DOM
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

/**
 * Theme Toggle Functionality
 * Handles switching between light and dark themes
 * Persists theme preference in localStorage
 */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * Sets the theme and updates the toggle icon
 * @param {string} theme - 'dark' or 'light'
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Animate icon change
    themeIcon.style.transform = 'scale(0)';
    
    setTimeout(() => {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        themeIcon.style.transform = 'scale(1) rotate(360deg)';
    }, 150);
}

// Initialize theme from localStorage or system preference
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

/**
 * Navigation and Scroll Functionality
 * Handles smooth scrolling and active section highlighting
 */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// Add smooth scroll behavior to navigation links
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

        // Update active navigation link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

/**
 * Updates active navigation link based on scroll position
 */
function updateActiveLink() {
    const fromTop = window.scrollY + 100;

    sections.forEach(section => {
        const link = document.querySelector(`a[href="#${section.id}"]`);
        
        if (!link) return;

        const { top, bottom } = section.getBoundingClientRect();
        const sectionTop = top + window.pageYOffset;
        const sectionBottom = bottom + window.pageYOffset;

        if (fromTop >= sectionTop && fromTop <= sectionBottom) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add scroll event listeners
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

/**
 * Initialize AOS with enhanced settings
 * Handles animations for sections and elements
 */
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out',
    disable: 'mobile'
});

/**
 * Contact Form Handling
 * Handles form submission and validation
 */
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

/**
 * Enhanced form submission handler with validation
 * Handles form validation and submission
 */
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

/**
 * Email validation helper
 * Checks if an email address is valid
 * @param {string} email - Email address to validate
 * @returns {boolean} - Whether the email address is valid
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Notification system
 * Displays notifications to the user
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success or error)
 */
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

/**
 * Visitor Counter Functionality
 * Maintains and displays visitor count starting from 22
 */
document.addEventListener('DOMContentLoaded', function() {
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        // Get stored count or start from 22
        let count = localStorage.getItem('visitorCount');
        if (!count) {
            count = '22';
            localStorage.setItem('visitorCount', count);
        }
        // Display the count
        visitorCountElement.textContent = count;
        
        // Increment count after a short delay
        setTimeout(() => {
            count = parseInt(count) + 1;
            localStorage.setItem('visitorCount', count.toString());
            visitorCountElement.textContent = count;
        }, 1000);
    }
});

/**
 * Handle flip card back scroll
 * Prevents scroll issues within flip cards
 */
document.querySelectorAll('.flip-card-back').forEach(card => {
    card.addEventListener('wheel', (e) => {
        const { scrollTop, scrollHeight, clientHeight } = card;
        const isScrollingUp = e.deltaY < 0;
        const isScrollingDown = e.deltaY > 0;
        const isAtTop = scrollTop === 0;
        const isAtBottom = scrollTop + clientHeight === scrollHeight;

        if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
            e.preventDefault();
        }
    });
});

/**
 * Mobile Menu Toggle
 * Handles mobile menu toggle functionality
 */
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

/**
 * Initialize EmailJS
 * Handles EmailJS initialization
 */
emailjs.init("zwUYib7NBA0mc965I"); // Your EmailJS public key

/**
 * Enhanced scroll-based effects
 * Handles scroll-based effects for the header
 */
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

/**
 * Intersection Observer for smooth section reveals
 * Handles smooth section reveals using IntersectionObserver
 */
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
