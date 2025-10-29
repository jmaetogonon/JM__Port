// Skills Carousel Functionality
function updateCarousel(slideIndex) {
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.skills-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (container) {
        container.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    // Update slide animations
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);

        // Add entrance animation for newly active slide
        if (index === slideIndex) {
            slide.style.animation = 'none';
            setTimeout(() => {
                slide.style.animation = 'fadeInScale 0.5s ease-out';
            }, 10);
        }
    });

    // Update indicators with animation
    indicators.forEach((indicator, index) => {
        const wasActive = indicator.classList.contains('active');
        indicator.classList.toggle('active', index === slideIndex);

        // Add animation for indicator change
        if (!wasActive && index === slideIndex) {
            indicator.style.transform = 'scale(0.8)';
            setTimeout(() => {
                indicator.style.transform = 'scale(1.2)';
            }, 50);
        }
    });

    // Animate progress circles
    if (slides[slideIndex]) {
        animateProgressCircles(slides[slideIndex]);
    }
}

function animateProgressCircles(slide) {
    const progressCircles = slide.querySelectorAll('.circle-progress');

    progressCircles.forEach((circle, index) => {
        const percent = parseInt(circle.getAttribute('data-percent'));
        const circleElement = circle.querySelector('.progress-ring-circle');
        const radius = 54;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        if (circleElement) {
            // Reset animation
            circleElement.style.strokeDasharray = `${circumference} ${circumference}`;
            circleElement.style.strokeDashoffset = circumference;

            // Force reflow
            void circleElement.offsetWidth;

            // Staggered animation with delay
            setTimeout(() => {
                circleElement.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                circleElement.style.strokeDashoffset = offset;
            }, index * 200); // 200ms delay between each circle
        }
    });
}

function initializeSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeSlide = document.querySelector('.skills-slide.active');
                if (activeSlide) {
                    setTimeout(() => {
                        animateProgressCircles(activeSlide);
                    }, 300);
                }

                // Add animation to carousel controls when section is visible
                const prevBtn = document.querySelector('.carousel-prev');
                const nextBtn = document.querySelector('.carousel-next');
                if (prevBtn && nextBtn) {
                    prevBtn.style.animation = 'slideInLeft 0.6s ease-out';
                    nextBtn.style.animation = 'slideInRight 0.6s ease-out';
                }
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
}

// Gradient definition
function addGradientDefinition() {
    if (document.getElementById('skills-gradient')) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const defs = document.createElementNS(svgNS, "svg");
    defs.style.position = "absolute";
    defs.style.width = "0";
    defs.style.height = "0";

    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.setAttribute("id", "skills-gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#667eea");

    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#764ba2");

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);

    const defsElement = document.createElementNS(svgNS, "defs");
    defsElement.appendChild(gradient);
    defs.appendChild(defsElement);
    document.body.appendChild(defs);

    const progressCircles = document.querySelectorAll('.progress-ring-circle');
    progressCircles.forEach(circle => {
        circle.style.stroke = 'url(#skills-gradient)';
    });
}

// Add CSS animations dynamically
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0.5;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50%) translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50%) translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(50%) translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function () {
    addGradientDefinition();
    addCustomAnimations();
    initializeSkillsAnimation();
});

window.updateCarousel = updateCarousel;
window.initializeSkillsAnimation = initializeSkillsAnimation;
window.addGradientDefinition = addGradientDefinition;