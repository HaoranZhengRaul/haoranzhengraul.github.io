// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeTheme();
    initializeNavigation();
    initializeScrollAnimations();
    initializeMobileMenu();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a subtle animation to the toggle
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// Navigation
function initializeNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    // Handle scroll effect on navigation
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLinkOnScroll);
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileToggle || !navLinks) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Mobile menu toggle clicked'); // Debug log
        
        this.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
        document.body.classList.toggle('menu-open');
        
        // Update ARIA attributes for accessibility
        const isOpen = navLinks.classList.contains('mobile-open');
        this.setAttribute('aria-expanded', isOpen);
        navLinks.setAttribute('aria-hidden', !isOpen);
    });
    
    // Close mobile menu when clicking on a link
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('mobile-open');
            document.body.classList.remove('menu-open');
            
            // Reset ARIA attributes
            mobileToggle.setAttribute('aria-expanded', false);
            navLinks.setAttribute('aria-hidden', true);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('mobile-open');
            document.body.classList.remove('menu-open');
            
            // Reset ARIA attributes
            mobileToggle.setAttribute('aria-expanded', false);
            navLinks.setAttribute('aria-hidden', true);
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.research-card, .timeline-item, .education-card, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Add interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Remove parallax effect to fix weird scroll disappearing behavior
    // Profile image will now behave as a normal static element during scroll
    
    // Add floating animation to research cards
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add touch support for mobile image flip
    const flipContainer = document.querySelector('.flip-container');
    if (flipContainer) {
        let isFlipped = false;
        
        flipContainer.addEventListener('touchstart', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                isFlipped = !isFlipped;
                
                if (isFlipped) {
                    this.querySelector('.flip-inner').style.transform = 'rotateY(180deg)';
                } else {
                    this.querySelector('.flip-inner').style.transform = 'rotateY(0deg)';
                }
            }
        });
    }
    
    // Add stagger animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Removed typewriter effect - name appears immediately
});

// Add CSS for active nav link and mobile menu
const additionalStyles = `
.nav-link.active {
    color: var(--primary-color);
}

.nav-link.active::after {
    width: 100%;
}

.mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

.scrolled {
    box-shadow: var(--shadow-medium);
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

.research-card:nth-child(1) {
    animation: float 6s ease-in-out infinite;
}

.research-card:nth-child(2) {
    animation: float 6s ease-in-out infinite 2s;
}

.research-card:nth-child(3) {
    animation: float 6s ease-in-out infinite 4s;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(updateActiveNavLinkOnScroll, 10);
window.removeEventListener('scroll', updateActiveNavLinkOnScroll);
window.addEventListener('scroll', debouncedScrollHandler);