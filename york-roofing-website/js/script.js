// York Roofing Inc - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        }
    });

    // Parallax Scrolling Effect for Hero Background
    const heroParallax = document.querySelector('.hero-bg-parallax');
    if (heroParallax) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroParallax.style.transform = `translateY(${rate}px)`;
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate statistics numbers
                if (entry.target.classList.contains('hero-stats')) {
                    animateNumbers();
                }
                
                // Stagger animation for grid items
                if (entry.target.querySelector('.services-grid') || 
                    entry.target.querySelector('.gallery-grid') || 
                    entry.target.querySelector('.testimonials-grid') || 
                    entry.target.querySelector('.blog-grid')) {
                    staggerGridAnimation(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animate Statistics Numbers
    function animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const finalNumber = parseInt(number.textContent);
            const increment = finalNumber / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    number.textContent = number.textContent.includes('+') ? `${finalNumber}+` : 
                                       number.textContent.includes('%') ? `${finalNumber}%` : finalNumber;
                    clearInterval(timer);
                } else {
                    number.textContent = Math.floor(current);
                }
            }, 20);
        });
    }

    // Stagger Grid Item Animations
    function staggerGridAnimation(section) {
        const gridItems = section.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .blog-card');
        gridItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // Initialize grid items as hidden for stagger effect
    document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .blog-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });

    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Simulate form submission with loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Button Click Animations
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Gallery Image Modal (Optional Enhancement)
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.gallery-overlay h4').textContent;
            const description = this.querySelector('.gallery-overlay p').textContent;
            showModal(title, description);
        });
    });

    // CTA Button Handlers
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.includes('Free Quote') || button.textContent.includes('Get Your Free Quote')) {
            button.addEventListener('click', function() {
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    // Phone number buttons
    document.querySelectorAll('.btn').forEach(button => {
        if (button.textContent.includes('Call Now')) {
            button.addEventListener('click', function() {
                window.location.href = 'tel:+15551234567';
            });
        }
    });

    // Utility Functions
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    function showModal(title, description) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Performance Optimization: Debounce scroll events
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

    // Apply debouncing to scroll-heavy functions
    const debouncedScrollHandler = debounce(() => {
        // Any heavy scroll calculations can go here
    }, 16); // ~60fps

    window.addEventListener('scroll', debouncedScrollHandler);

    // Loading Animation (Optional)
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="logo-3d">
                <span class="logo-text">YORK</span>
                <span class="logo-subtext">ROOFING INC</span>
            </div>
            <div class="loading-spinner"></div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });

    // Add CSS for dynamic elements
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--white);
            box-shadow: var(--shadow);
            border-radius: 10px;
            padding: 1rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid #28a745;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--neutral-gray);
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: var(--white);
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            position: relative;
            animation: scaleIn 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 2rem;
            cursor: pointer;
            color: var(--neutral-gray);
        }
        
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-green) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            transition: opacity 0.5s ease;
        }
        
        .loading-content {
            text-align: center;
            color: var(--white);
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid var(--white);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 2rem auto 0;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes scaleIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(dynamicStyles);
});
