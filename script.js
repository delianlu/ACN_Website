// =====================================
// PRIORITY 2: PAGE LOADER
// =====================================
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// =====================================
// PRIORITY 1: SCROLL PROGRESS BAR
// =====================================
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// =====================================
// PRIORITY 1: PARTICLE BACKGROUND
// =====================================
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let particlesContainer = hero.querySelector('.particles-container');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        hero.insertBefore(particlesContainer, hero.firstChild);
    }

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';

        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particlesContainer.appendChild(particle);
    }
}

// Call on load
createParticles();

// =====================================
// MOBILE MENU TOGGLE
// =====================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile menu toggle functionality
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // =====================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // =====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================
    // UPDATE ACTIVE NAV LINK ON SCROLL
    // =====================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // =====================================
    // ANIMATED COUNTER FOR STATISTICS
    // =====================================
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }

    // Intersection Observer for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                stats.forEach(stat => {
                    animateCounter(stat);
                });
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // =====================================
    // CONTACT FORM SUBMISSION
    // =====================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // =====================================
    // SCROLL ANIMATIONS
    // =====================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .capability-item, .testimonial-card, .cert-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // =====================================
    // PRIORITY 1: CLIP-PATH REVEAL ANIMATIONS
    // =====================================
    const clipRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.2 });

    // Add clip-reveal class to section titles
    document.querySelectorAll('.section-title, .section-heading').forEach(el => {
        el.classList.add('clip-reveal');
        clipRevealObserver.observe(el);
    });

    // =====================================
    // PRIORITY 1: 3D TILT EFFECT ON CARDS
    // =====================================
    const tiltCards = document.querySelectorAll('.service-card, .cert-card, .stat-card, .testimonial-card');

    tiltCards.forEach(card => {
        card.classList.add('tilt-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // =====================================
    // PRIORITY 1: MAGNETIC BUTTON EFFECT
    // =====================================
    const magneticButtons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');

    magneticButtons.forEach(button => {
        button.classList.add('magnetic-btn', 'btn-ripple');

        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.3;
            const moveY = y * 0.3;

            button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // =====================================
    // PRIORITY 1: ADD GRADIENT TEXT TO HEADINGS
    // =====================================
    // Add gradient effect to main hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.classList.contains('fade-in')) {
        heroTitle.classList.add('gradient-text');
    }

    // Add gradient to every other section title for visual variety
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        if (index % 2 === 0) { // Every other title gets gradient
            title.classList.add('gradient-text');
        }
    });

    // =====================================
    // PRIORITY 2: GRADIENT BORDERS ON CARDS
    // =====================================
    document.querySelectorAll('.service-card, .stat-card, .cert-card, .testimonial-card, .project-card').forEach(card => {
        card.classList.add('gradient-border');
    });

    // =====================================
    // PRIORITY 2: TEXT UNDERLINE DRAW ANIMATION
    // =====================================
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.add('draw-underline');
    });

    // =====================================
    // PRIORITY 2: STAGGERED GRID ANIMATIONS
    // =====================================
    // Apply to service cards
    document.querySelectorAll('.services-grid .service-card').forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Apply to stat cards
    document.querySelectorAll('.stats-section .stat-card').forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Apply to testimonial cards
    document.querySelectorAll('.testimonials-section .testimonial-card').forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Apply to certification cards
    document.querySelectorAll('.certifications-section .cert-card').forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Apply to project cards
    document.querySelectorAll('.projects-section .project-card').forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // =====================================
    // PRIORITY 3: PARALLAX SCROLLING
    // =====================================
    const parallaxElements = document.querySelectorAll('.parallax-image img, .parallax-bg');

    function updateParallax() {
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateParallax);
        });
    }

    // =====================================
    // PRIORITY 3: SPOTLIGHT MOUSE TRACKING
    // =====================================
    const spotlightContainers = document.querySelectorAll('.spotlight-container');

    spotlightContainers.forEach(container => {
        let overlay = container.querySelector('.spotlight-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'spotlight-overlay';
            container.appendChild(overlay);
        }

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            overlay.style.setProperty('--mouse-x', `${x}%`);
            overlay.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // =====================================
    // PRIORITY 3: SCROLL REVEAL ANIMATIONS
    // =====================================
    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
        scrollRevealObserver.observe(el);
    });

    // =====================================
    // PRIORITY 3: FLOATING ANIMATIONS
    // =====================================
    document.querySelectorAll('.service-icon, .stat-icon, .cert-icon').forEach(icon => {
        icon.classList.add('float-animation');
    });

    // =====================================
    // PRIORITY 3: MORPHING BACKGROUND
    // =====================================
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsSection.classList.add('morphing-bg');
    }

    // =====================================
    // PRIORITY 3: NEON GLOW TO HERO SUBTITLE
    // =====================================
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.classList.add('neon-glow');
    }

    // =====================================
    // BACK TO TOP BUTTON
    // =====================================
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =====================================
    // LIGHTBOX FOR PROJECT IMAGES
    // =====================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});

// =====================================
// CONTACT FORM HANDLER
// =====================================
function handleFormSubmit(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form
    if (!name || !email || !subject || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    console.log('Form Data:', {
        name,
        email,
        subject,
        message
    });

    // Show success message
    showMessage('Thank you for your message! We will get back to you soon.', 'success');

    // Clear form
    document.getElementById('contact-form').reset();

    // Scroll to message
    const messageDiv = document.getElementById('form-message');
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// =====================================
// EMAIL VALIDATION
// =====================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =====================================
// SHOW FORM MESSAGE
// =====================================
function showMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    if (!messageDiv) return;

    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';

    // Hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// =====================================
// ENHANCED NAVBAR ON SCROLL
// =====================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// =====================================
// PARALLAX EFFECT FOR HERO (OPTIONAL)
// =====================================
let ticking = false;

window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero && !ticking) {
        window.requestAnimationFrame(function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.backgroundPositionY = parallax + 'px';
            ticking = false;
        });
        ticking = true;
    }
});

// =====================================
// PERFORMANCE: LAZY LOADING OBSERVER
// =====================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger loading
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}
