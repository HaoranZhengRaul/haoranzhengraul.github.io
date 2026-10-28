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

// Hover cards (AMOR, Conceptizer, ...): shift each card sideways so it stays inside the text column.
// Placed on load, after fonts, on resize and again on hover, so a card never slides on its first showing.
document.addEventListener('DOMContentLoaded', function() {
    const wraps = Array.from(document.querySelectorAll('.tip-wrap'));
    function place(wrap) {
        const box = wrap.querySelector('.tip-box');
        if (!box) return;
        const area = (wrap.closest('.hero-text') || document.body).getBoundingClientRect();
        const minLeft = Math.max(area.left, 8);
        const maxRight = Math.min(area.right, window.innerWidth - 8);
        const w = wrap.getBoundingClientRect();
        const width = box.offsetWidth;
        const left = w.left + w.width / 2 - width / 2;
        let shift = 0;
        if (left + width > maxRight) shift = maxRight - (left + width);
        if (left + shift < minLeft) shift = minLeft - left;
        box.style.setProperty('--tip-shift', shift + 'px');
    }
    function placeAll() {
        wraps.forEach(place);
    }
    wraps.forEach(function(wrap) {
        wrap.addEventListener('mouseenter', function() { place(wrap); });
        wrap.addEventListener('focusin', function() { place(wrap); });
    });
    placeAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeAll);
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(placeAll, 100);
    });
});

// Flips. The photo: hovering previews the other side, a click keeps it, and the next hover (after the mouse has left)
// previews the side you left; on phones a tap switches it. The hero's text side: a click on empty space (not on a word,
// a link or a button) switches it to the research map and back; no hover, so the text stays easy to read and select.
// On phones the hero doesn't flip (it is the text and the photo, as one).
const phone = window.matchMedia('(max-width: 768px)');

function onText(e) {
    // is the click on a rendered character (rather than on blank space)?
    let node = null, off = 0;
    if (document.caretRangeFromPoint) {
        const r = document.caretRangeFromPoint(e.clientX, e.clientY);
        if (r) { node = r.startContainer; off = r.startOffset; }
    } else if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(e.clientX, e.clientY);
        if (pos) { node = pos.offsetNode; off = pos.offset; }
    }
    if (!node || node.nodeType !== Node.TEXT_NODE) return false;
    for (const [a, b] of [[off, off + 1], [off - 1, off]]) {
        if (a < 0 || b > node.length) continue;
        const range = document.createRange();
        range.setStart(node, a);
        range.setEnd(node, b);
        for (const rect of range.getClientRects()) {
            if (e.clientX >= rect.left - 2 && e.clientX <= rect.right + 2 &&
                e.clientY >= rect.top - 2 && e.clientY <= rect.bottom + 2) return true;
        }
    }
    return false;
}

function makeFlip(root, opts) {
    opts = opts || {};
    const hover = opts.hover !== false;      // preview on hover (the photo) or not (the hero)
    const allow = opts.allow || function() { return true; };   // which clicks switch sides
    let kept = false;                        // the side that stays: false = front, true = back
    let previewing = false;
    let hold = false;                        // after a click, no preview until the mouse leaves
    const canHover = window.matchMedia('(hover: hover)').matches;
    const off = function() { return opts.notOnPhones && phone.matches; };
    function apply() {
        const back = kept !== previewing;
        root.classList.toggle('show-back', back);
        if (opts.onChange) opts.onChange(back);
    }
    if (hover && canHover) {
        root.addEventListener('mouseenter', function() {
            if (!off() && !hold) { previewing = true; apply(); }
        });
        root.addEventListener('mouseleave', function() {
            previewing = false;
            hold = false;
            apply();
        });
    }
    root.addEventListener('click', function(e) {
        if (off() || !allow(e)) return;
        kept = !kept;                        // keep the side being previewed (or switch, without hover)
        previewing = false;
        root.classList.add('turned');        // the hero's turn animates only once someone has clicked
        hold = hover && canHover;
        apply();
    });
    root.addEventListener('keydown', function(e) {
        if (e.target === root && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); root.click(); }
    });
    phone.addEventListener('change', function() {
        if (off()) { kept = false; previewing = false; hold = false; apply(); }
    });
    apply();
}

document.addEventListener('DOMContentLoaded', function() {
    const photo = document.querySelector('.flip-container');
    if (photo) {
        photo.setAttribute('tabindex', '0');
        photo.setAttribute('aria-label', 'Flip the photo');
        makeFlip(photo);
    }

    const hero = document.getElementById('hero-flip');
    if (hero) {
        const front = hero.querySelector('.hero-face-front');
        const back = hero.querySelector('.hero-face-back');
        hero.setAttribute('tabindex', '0');
        hero.setAttribute('aria-label', 'Flip to my research map');
        makeFlip(hero, {
            hover: false,
            notOnPhones: true,
            allow: function(e) {
                if (e.target.closest('a, button, .tip-wrap, .hero-social, .hero-buttons')) return false;
                if (String(window.getSelection())) return false;            // selecting text
                return e.target.closest('.hero-face-back') ? true : !onText(e);   // the map: anywhere
            },
            onChange: function(showBack) {
                front.inert = showBack;          // the hidden side takes no focus or clicks
                back.inert = !showBack;
            }
        });
    }

    // Experience: each stretch of the line fades into the next position's colour
    const items = Array.from(document.querySelectorAll('.timeline-item'));
    items.forEach(function(item, i) {
        const next = items[i + 1];
        if (next) item.style.setProperty('--c-next', getComputedStyle(next).getPropertyValue('--c').trim());
    });
});
