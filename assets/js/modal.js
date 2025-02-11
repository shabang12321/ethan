document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = modal.querySelector('.close-modal');
    
    // Reset modal state
    function resetModal() {
        modalContent.scrollTop = 0;
        modalTitle.textContent = '';
        modalDescription.textContent = '';
        modalImage.src = '';
    }

    // Close modal functionality
    function closeModal() {
        resetModal();
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Handle scrolling within modal content
    function handleScroll(e, element) {
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const height = element.clientHeight;
        const delta = e.deltaY;
        const isScrollingUp = delta < 0;
        const isScrollingDown = delta > 0;
        const isAtTop = scrollTop === 0;
        const isAtBottom = Math.abs(scrollTop + height - scrollHeight) < 1;

        e.preventDefault();
        e.stopPropagation();

        if (!(isAtTop && isScrollingUp) && !(isAtBottom && isScrollingDown)) {
            element.scrollTop += delta;
        }
    }

    modalContent.addEventListener('wheel', e => handleScroll(e, modalContent), { passive: false });
    modal.addEventListener('wheel', e => e.preventDefault(), { passive: false });

    // Touch event handling for mobile
    let touchStart = 0;
    modalContent.addEventListener('touchstart', e => touchStart = e.touches[0].clientY, { passive: true });

    modalContent.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const isScrollingUp = touchY > touchStart;
        const isScrollingDown = touchY < touchStart;
        const isAtTop = this.scrollTop === 0;
        const isAtBottom = Math.abs(this.scrollTop + this.clientHeight - this.scrollHeight) < 1;

        e.stopPropagation();
        if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
            e.preventDefault();
        }
    }, { passive: false });

    modal.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    
    // Project data
    const projects = {
        'edge-computing': {
            image: 'images/fulls/01.gif',
            title: 'Edge Computing for Autonomous Swarm Robotics',
            description: 'Thesis project focusing on edge computing as a solution for enhanced navigation & collision avoidance strategies for autonomous drone swarms. This innovative approach enables real-time decision making and improved swarm coordination through distributed computing architecture.'
        },
        'drone-monitoring': {
            image: 'images/fulls/02.jpg',
            title: 'Drone Monitoring System',
            description: 'Developed a comprehensive wireless GUI for real-time sensor feedback, sensor-fusion and power supply monitoring. The system provides critical telemetry data and enables efficient drone fleet management through an intuitive interface.'
        },
        'ecommerce': {
            image: 'images/fulls/03.jpg',
            title: 'E-Commerce Automation',
            description: 'Built and managed four successful online brands with automated systems and marketing strategies. Implemented automated inventory management, order processing, and customer service systems to streamline operations and improve efficiency.'
        },
        'business-transformation': {
            image: 'images/fulls/04.jpg',
            title: 'Business Digital Transformation',
            description: 'Implemented cloud-based systems for quote & invoice processes at E&E Building Services. Streamlined business operations through digital transformation, resulting in improved workflow efficiency and customer satisfaction.'
        }
    };
    
    // Open modal
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const projectId = this.dataset.project;
            const project = projects[projectId];
            
            resetModal();
            
            modalImage.src = project.image;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Prevent URL change
            return false;
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => e.target === modal && closeModal());
    document.addEventListener('keydown', e => e.key === 'Escape' && modal.classList.contains('show') && closeModal());
}); 