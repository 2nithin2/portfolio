# Personal Portfolio Website

A modern, responsive portfolio website showcasing skills, projects, and professional experience.

## Project Structure

```
myportfolio/
├── public/              # Public assets (images, documents)
│   └── assets/         # Images, resume PDF, and other static files
├── src/
│   ├── components/     # Reusable UI components
│   ├── js/            # JavaScript files
│   │   ├── script.js  # Main JavaScript functionality
│   │   └── auto-scroll.js # Smooth scrolling functionality
│   └── styles/        # CSS stylesheets
│       └── styles.css # Main stylesheet
└── index.html         # Main HTML file
```

## Features

### 1. Interactive UI Elements
- Smooth scrolling navigation
- Dynamic theme toggle (light/dark mode)
- Animated section transitions using AOS (Animate On Scroll)
- Typing animation for role descriptions
- Flip cards for experience and education details

### 2. Sections
- **Header**: Navigation menu with theme toggle
- **Hero**: Introduction with typing animation
- **About**: Professional summary and skills
- **Technologies**: Skills grid with icons
- **Experience**: Work history in flip cards
- **Projects**: Portfolio of completed projects
- **Contact**: Contact form with email integration
- **Footer**: Social links and visitor counter

### 3. Key Components

#### Navigation
- Responsive menu with hamburger toggle for mobile
- Smooth scroll to sections
- Active section highlighting

#### Theme Toggle
- Light/dark mode switch
- Persists user preference in localStorage
- Respects system theme preference

#### Skills Grid
- Icon-based technology showcase
- Organized by categories
- Animated on scroll

#### Visitor Counter
- Starts from 22
- Increments on each visit
- Persists count in localStorage
- Located in footer section

#### Contact Form
- Email integration using EmailJS
- Form validation
- Success/error notifications

## Technologies Used

- HTML5
- CSS3 (with custom properties for theming)
- JavaScript (ES6+)
- Libraries:
  - AOS (Animate On Scroll)
  - Typed.js (Text animation)
  - EmailJS (Contact form)
  - Font Awesome (Icons)

## JavaScript Files Documentation

### script.js
Main JavaScript file containing core functionality:

```javascript
// Theme Management
- Theme toggle functionality
- System theme preference detection
- Theme persistence in localStorage

// Navigation
- Mobile menu toggle
- Smooth scrolling
- Active section highlighting

// Animations
- AOS initialization
- Typing animation setup
- Loader animation

// Visitor Counter
- Initialization at 22
- Count persistence
- Increment logic

// Contact Form
- Form submission handling
- Email integration
- Validation
```

### auto-scroll.js
Handles smooth scrolling functionality:

```javascript
// Smooth scroll implementation
- Section targeting
- Offset calculation
- Animation timing
```

## Styles Documentation

### styles.css
Main stylesheet organized by sections:

```css
/* Core Styles */
- CSS Variables (theming)
- Base styles
- Typography
- Layout

/* Components */
- Navigation
- Buttons
- Cards
- Grid layouts
- Forms

/* Animations */
- Transitions
- Hover effects
- Loading animations

/* Responsive Design */
- Mobile-first approach
- Breakpoints
- Layout adjustments
```

## Setup and Usage

1. Clone the repository
2. No build process required - static HTML/CSS/JS
3. Open index.html in a modern browser
4. For contact form:
   - Configure EmailJS with your credentials
   - Update the emailjs.init() call with your user ID

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Considerations

- Lazy loading for images
- Minified third-party libraries
- Optimized animations
- Local storage for preferences

## Future Enhancements

- [ ] Add blog section
- [ ] Implement project filtering
- [ ] Add more interactive elements
- [ ] Enhance accessibility
- [ ] Add more animations

## Contributing

Feel free to submit issues and enhancement requests.


