document.addEventListener('DOMContentLoaded', () => {
    const logoHeader = document.getElementById('logo-header');
    const logoFooter = document.getElementById('logo-footer');
    const yearsOfExperienceCounter = document.getElementById('years-of-experience-counter');

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const addHoverEffect = (element) => {
        if (element) {
            element.addEventListener('mouseenter', () => element.style.transform = 'scale(1.05) rotate(2deg)');
            element.addEventListener('mouseleave', () => element.style.transform = 'scale(1) rotate(0deg)');
            element.style.transition = 'transform 0.3s ease';
        }
    };

    addHoverEffect(logoHeader);
    addHoverEffect(logoFooter);

    const newsletterButton = document.getElementById('newsletter-button');
    const newsletterInput = document.getElementById('newsletter-input');
    const newsletterStatus = document.getElementById('newsletter-status');

    if (newsletterButton) {
        newsletterButton.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value;
            if (email && email.includes('@') && email.includes('.')) {
                newsletterStatus.textContent = 'Assinado! Em breve, novidades no seu email.';
                newsletterInput.value = '';
                newsletterStatus.classList.remove('text-red-400');
                newsletterStatus.classList.add('text-green-400');
            } else {
                newsletterStatus.textContent = 'Por favor, insira um email válido.';
                newsletterStatus.classList.remove('text-green-400');
                newsletterStatus.classList.add('text-red-400');
            }
        });
    }

    const animateCounter = (element, targetValue, duration) => {
        let currentValue = 0;
        const increment = targetValue / (duration / 10);
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                element.textContent = targetValue;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue);
            }
        }, 10);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay * 1000);
                
                if (entry.target.contains(yearsOfExperienceCounter) && yearsOfExperienceCounter.textContent === '0') {
                     setTimeout(() => {
                         animateCounter(yearsOfExperienceCounter, 3, 1500); 
                     }, 1500); 
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
});