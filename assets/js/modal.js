document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Project data
    const projects = {
        'edge-computing': {
            image: 'images/fulls/01.jpg',
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
        },
        // Add other projects here
    };
    
    // Handle scrolling within modal content
    modalContent.addEventListener('wheel', function(e) {
        const scrollTop = this.scrollTop;
        const scrollHeight = this.scrollHeight;
        const height = this.clientHeight;
        const delta = e.deltaY;
        const isScrollingUp = delta < 0;
        const isScrollingDown = delta > 0;
        const isAtTop = scrollTop === 0;
        const isAtBottom = Math.abs(scrollTop + height - scrollHeight) < 1;

        // Always prevent default and stop propagation
        e.preventDefault();
        e.stopPropagation();

        // Only update scroll if we're not at the boundaries or scrolling in the available direction
        if (!(isAtTop && isScrollingUp) && !(isAtBottom && isScrollingDown)) {
            this.scrollTop += delta;
        }
    }, { passive: false });

    // Prevent any scrolling on the modal backdrop
    modal.addEventListener('wheel', function(e) {
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false });

    // Touch event handling for mobile
    let touchStart = 0;
    modalContent.addEventListener('touchstart', function(e) {
        touchStart = e.touches[0].clientY;
    }, { passive: true });

    modalContent.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const scrollTop = this.scrollTop;
        const scrollHeight = this.scrollHeight;
        const height = this.clientHeight;
        const isScrollingUp = touchY > touchStart;
        const isScrollingDown = touchY < touchStart;
        const isAtTop = scrollTop === 0;
        const isAtBottom = Math.abs(scrollTop + height - scrollHeight) < 1;

        // Always stop propagation
        e.stopPropagation();

        // Prevent scrolling at boundaries
        if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
            e.preventDefault();
        }
    }, { passive: false });

    // Prevent any touch scrolling on modal backdrop
    modal.addEventListener('touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false });
    
    // Open modal
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.dataset.project;
            const project = projects[projectId];
            
            modalImage.src = project.image;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}); 