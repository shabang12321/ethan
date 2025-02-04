document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#heading-list .nav-link, #mobile-nav .nav-link');
    
    // Update active state on scroll
    function updateActiveSection() {
        const scrollPosition = window.scrollY + (window.innerHeight / 2);
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if we're at the very top
        if (scrollTop < 100) {
            setActiveSection('one');
            return;
        }
        
        // Check if we're at the bottom
        if (scrollTop + windowHeight >= documentHeight - 100) {
            setActiveSection('three');
            return;
        }

        // Find the closest section
        let closestSection = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionMiddle = sectionTop + (section.offsetHeight / 2);
            const distance = Math.abs(scrollPosition - sectionMiddle);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });

        if (closestSection) {
            setActiveSection(closestSection.id);
        }
    }

    // Helper function to set active section
    function setActiveSection(sectionId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href').slice(1);
            link.classList.remove('active');
            if (href === sectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active state on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            
            // Update active state immediately
            setActiveSection(targetId);
            
            // Smooth scroll to target without changing URL
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    updateActiveSection();
    
    // Update on page load
    window.addEventListener('load', updateActiveSection);
}); 