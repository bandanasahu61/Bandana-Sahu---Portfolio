// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeNavigation();
    initializeSkillBars();
    initializeProjectCards();
    initializeContactForm();
    initializeLoadingScreen();
});

// Typing Effect
function initializeTypingEffect() {
    const phrases = [
        "Full Stack Developer",
        "Automation Testing Expert",
        "Manual Testing Professional"
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    const typingElement = document.getElementById('typing-text');

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting new phrase
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('skill-bar')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.section, .skill-bar, .project-card, .education-box')
        .forEach(el => observer.observe(el));
}

// Navigation
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                menuBtn?.classList.remove('active');
                navLinks?.classList.remove('active');
            }
        });
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skills = {
        'Frontend Development': 90,
        'Backend Development': 85,
        'Automation Testing': 88,
        'Manual Testing': 92
    };

    Object.entries(skills).forEach(([skill, progress]) => {
        const skillBar = document.querySelector(`[data-skill="${skill}"]`);
        if (skillBar) {
            skillBar.style.setProperty('--progress', `${progress}%`);
        }
    });
}

function animateSkillBar(skillBar) {
    const progress = skillBar.getAttribute('data-progress');
    skillBar.style.width = `${progress}%`;
}

// Project Cards Initialization
function initializeProjectCards() {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        // Create ripple effect element
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        project.appendChild(ripple);

        // Mouse Enter Event
        project.addEventListener('mouseenter', (e) => {
            const overlay = project.querySelector('.project-overlay');
            const projectImage = project.querySelector('.project-image');
            const projectDetails = project.querySelector('.project-details');
            const techStack = project.querySelector('.tech-stack');

            // Animate overlay
            overlay.style.opacity = '1';
            
            // Animate project card
            project.style.transform = 'translateY(-10px)';
            project.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';

            // Animate project image
            if (projectImage) {
                projectImage.style.transform = 'scale(1.1)';
            }

            // Animate project details
            if (projectDetails) {
                projectDetails.style.transform = 'translateY(0)';
                projectDetails.style.opacity = '1';
            }

            // Animate tech stack tags
            if (techStack) {
                const tags = techStack.querySelectorAll('.tech-tag');
                tags.forEach((tag, index) => {
                    tag.style.transform = 'translateY(0)';
                    tag.style.opacity = '1';
                    tag.style.transitionDelay = `${index * 0.1}s`;
                });
            }

            // Add active class
            project.classList.add('active');
        });

        // Mouse Leave Event
        project.addEventListener('mouseleave', (e) => {
            const overlay = project.querySelector('.project-overlay');
            const projectImage = project.querySelector('.project-image');
            const projectDetails = project.querySelector('.project-details');
            const techStack = project.querySelector('.tech-stack');

            // Reset overlay
            overlay.style.opacity = '0';
            
            // Reset project card
            project.style.transform = 'translateY(0)';
            project.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';

            // Reset project image
            if (projectImage) {
                projectImage.style.transform = 'scale(1)';
            }

            // Reset project details
            if (projectDetails) {
                projectDetails.style.transform = 'translateY(20px)';
                projectDetails.style.opacity = '0';
            }

            // Reset tech stack tags
            if (techStack) {
                const tags = techStack.querySelectorAll('.tech-tag');
                tags.forEach(tag => {
                    tag.style.transform = 'translateY(20px)';
                    tag.style.opacity = '0';
                    tag.style.transitionDelay = '0s';
                });
            }

            // Remove active class
            project.classList.remove('active');
        });

        // Click Event
        project.addEventListener('click', (e) => {
            // Create ripple effect
            const rect = project.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('active');

            // Remove ripple after animation
            setTimeout(() => {
                ripple.classList.remove('active');
            }, 500);

            // Handle project link if clicked on link elements
            if (!e.target.closest('a')) {
                const projectLink = project.dataset.projectUrl;
                if (projectLink) {
                    window.open(projectLink, '_blank');
                }
            }
        });

        // Touch Events for mobile
        project.addEventListener('touchstart', handleTouchStart, false);
        project.addEventListener('touchend', handleTouchEnd, false);
    });
}

// Touch Event Handlers
let touchTimeout;

function handleTouchStart(e) {
    const project = e.currentTarget;
    
    // Clear any existing timeout
    if (touchTimeout) {
        clearTimeout(touchTimeout);
    }

    // Add touch effect
    project.classList.add('touch-active');
}

function handleTouchEnd(e) {
    const project = e.currentTarget;
    
    // Remove touch effect with delay
    touchTimeout = setTimeout(() => {
        project.classList.remove('touch-active');
    }, 300);
}

// Add corresponding CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .project-card {
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        background: var(--card-bg);
        transition: all 0.3s ease;
    }

    .project-image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        transition: transform 0.5s ease;
    }

    .project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    .project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .project-details {
        padding: 20px;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .tech-stack {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 10px 20px;
    }

    .tech-tag {
        padding: 5px 10px;
        background: var(--tag-bg);
        border-radius: 15px;
        font-size: 0.8rem;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        pointer-events: none;
        width: 100px;
        height: 100px;
        margin: -50px;
    }

    .ripple-effect.active {
        animation: ripple 0.5s ease-out;
    }

    .project-card.touch-active {
        transform: scale(0.98);
    }

    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* Dark mode support */
    [data-theme="dark"] .project-card {
        background: var(--dark-card-bg);
    }

    [data-theme="dark"] .tech-tag {
        background: var(--dark-tag-bg);
        color: var(--dark-text);
    }
`;

document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjectCards);


// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Loading Screen
function initializeLoadingScreen() {
    const loader = document.querySelector('.loading');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});
// Parallax effect for header
document.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    header.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Initialize particles.js
if(typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

