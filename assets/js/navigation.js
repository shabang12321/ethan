document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#heading-list .nav-link, #mobile-nav .nav-link');
    
    function updateActiveSection() {
        // Get scroll position and dimensions
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        
        // Check if we're at the top of the page
        if (scrollPos === 0) {
            setActiveSection('about');
            return;
        }
        
        // Check if we're at the bottom of the page
        if ((window.innerHeight + scrollPos) >= documentHeight - 2) {
            setActiveSection('contact');
            return;
        }
        
        // For middle sections, calculate which one is most visible
        let maxVisibleSection = null;
        let maxVisibleAmount = 0;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            
            if (visibleHeight > maxVisibleAmount) {
                maxVisibleAmount = visibleHeight;
                maxVisibleSection = section;
            }
            
            // If a section takes up most of the viewport, prioritize it
            if (visibleHeight > windowHeight * 0.7) {
                maxVisibleSection = section;
                return;
            }
        });
        
        if (maxVisibleSection) {
            setActiveSection(maxVisibleSection.id);
        }
    }
    
    function setActiveSection(sectionId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href').slice(1);
            if (href === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Handle clicks on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                setActiveSection(targetId);
            }
        });
    });
    
    // Optimized scroll handler
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Initial update
    updateActiveSection();
    
    // Update after all content is loaded
    window.addEventListener('load', updateActiveSection);
    
    // Handle dynamic content and resize
    const observer = new ResizeObserver(updateActiveSection);
    document.body.childNodes.forEach(node => {
        if (node.nodeType === 1) { // Check if it's an element node
            observer.observe(node);
        }
    });
    
    // Backup timeout for edge cases
    setTimeout(updateActiveSection, 1000);
}); 