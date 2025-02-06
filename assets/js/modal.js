document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close-modal');
    
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