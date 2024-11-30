/**
 * theme.js
 * Handles theme switching functionality and persistence
 */

class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listeners
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.prefersDark.addEventListener('change', (e) => this.handleSystemThemeChange(e));
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        
        // Update icon
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    handleSystemThemeChange(e) {
        if (!localStorage.getItem('theme')) {
            this.setTheme(e.matches ? 'dark' : 'light');
        }
    }
}

// Initialize theme manager
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
