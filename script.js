// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.8)';
        header.style.backdropFilter = 'blur(20px)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.about-content',
        '.service-card',
        '.differential-card',
        '.portfolio-item',
        '.testimonial',
        '.stat',
        '.number',
        '.cta-content'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
});

// Team Slider
let currentMember = 0;
const teamMembers = document.querySelectorAll('.team-member');
const totalMembers = teamMembers.length;
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.team-nav-btn.prev');
const nextBtn = document.querySelector('.team-nav-btn.next');

function showMember(index) {
    // Hide all members
    teamMembers.forEach(member => {
        member.classList.remove('active');
    });
    
    // Remove active from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current member
    teamMembers[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentMember = index;
}

function nextMember() {
    currentMember = (currentMember + 1) % totalMembers;
    showMember(currentMember);
}

function prevMember() {
    currentMember = (currentMember - 1 + totalMembers) % totalMembers;
    showMember(currentMember);
}

// Navigation buttons
if (nextBtn) {
    nextBtn.addEventListener('click', nextMember);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevMember);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showMember(index);
    });
});

// Auto-play (optional)
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(nextMember, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Start auto-play
startAutoPlay();

// Stop auto-play on hover
const teamSlider = document.querySelector('.team-slider');
if (teamSlider) {
    teamSlider.addEventListener('mouseenter', stopAutoPlay);
    teamSlider.addEventListener('mouseleave', startAutoPlay);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevMember();
        stopAutoPlay();
    } else if (e.key === 'ArrowRight') {
        nextMember();
        stopAutoPlay();
    }
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

teamSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

teamSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextMember();
    } else if (touchEndX > touchStartX + 50) {
        prevMember();
    }
}

// Portfolio hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        // Open image in new tab or lightbox if needed
        window.open(this.src, '_blank');
    });
});

// Counter animation for numbers
const animateCounter = (element, target) => {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };
    
    updateCounter();
};

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/[0-9]/g, '');
            
            entry.target.classList.add('animated');
            animateCounter(entry.target, number);
        }
    });
}, { threshold: 0.5 });

// Observe counter elements
document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Form validation (if contact form is added)
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
});

// Observe all images with data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Performance optimization: Throttle scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 100));

// Preloader
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', throttle(highlightNavigation, 100));

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--color-accent);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Console branding
console.log('%c🦌 Cervo Films', 'font-size: 20px; font-weight: bold; color: #ffffff;');
console.log('%cTransformamos eventos em experiências cinematográficas', 'font-size: 14px; color: #666;');

/* EXPANSÃO POR HOVER */

document.querySelectorAll(".service-card").forEach(card => {

    const video = card.querySelector(".service-video");

    card.addEventListener("mouseenter", () => {

        document.querySelectorAll(".service-card")
        .forEach(c => c.classList.remove("expanded"));

        card.classList.add("expanded");

        if(video){
            video.currentTime = 0;
            video.play();
        }

    });

    card.addEventListener("mouseleave", () => {

        card.classList.remove("expanded");

        if(video){
            video.pause();
            video.currentTime = 0;
        }

    });

});



const grid = document.querySelector('.services-grid');
const cards = document.querySelectorAll('.service-card');

cards.forEach(card => {

    card.addEventListener('mouseenter', () => {

        grid.classList.add('has-active');

        cards.forEach(c => c.classList.remove('active'));

        card.classList.add('active');

    });

});

grid.addEventListener('mouseleave', () => {

    grid.classList.remove('has-active');

    cards.forEach(c => c.classList.remove('active'));

});