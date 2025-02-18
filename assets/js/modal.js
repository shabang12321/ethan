document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const projectDate = document.getElementById('project-date');
    const projectFeatures = document.getElementById('project-features');
    const projectTechnologies = document.getElementById('project-technologies');
    const closeBtn = modal.querySelector('.close-modal');
    
    // Reset modal state
    function resetModal() {
        modalContent.scrollTop = 0;
        modalTitle.textContent = '';
        modalDescription.textContent = '';
        modalImage.src = '';
        projectDate.textContent = '';
        projectFeatures.innerHTML = '';
        projectTechnologies.innerHTML = '';
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
            date: 'July 2024 - June 2025',
            description: 'Thesis project focusing on edge computing as a solution for enhanced navigation & collision avoidance strategies for autonomous drone swarms. This innovative approach enables real-time decision making and improved swarm coordination through distributed computing architecture.',
            features: [
                'Real-time swarm coordination and navigation',
                'Distributed computing architecture',
                'Collision avoidance system',
                'Performance optimization algorithms',
                'Scalable drone network management'
            ],
            technologies: [
                'Python',
                'ROS',
                'Edge Computing',
                'Computer Vision',
                'Machine Learning',
                'Embedded Systems'
            ]
        },
        'drone-monitoring': {
            image: 'images/fulls/02.gif',
            title: 'Drone Monitoring System',
            date: 'Sep 2023 - Dec 2023',
            description: 'Developed a comprehensive wireless GUI for real-time sensor feedback, sensor-fusion and power supply monitoring. The system provides critical telemetry data and enables efficient drone fleet management through an intuitive interface.',
            features: [
                'Real-time telemetry data visualization',
                'Wireless sensor data collection',
                'Power supply monitoring',
                'Fleet management dashboard',
                'Automated alert system'
            ],
            technologies: [
                'C++',
                'ESP32',
                'Raspberry Pi',
                'Wireless Protocols',
                'Sensor Fusion',
                'Electronics',
                'Real-time Systems'
            ]
        },
        'ecommerce': {
            image: 'images/fulls/03.gif',
            title: 'E-Commerce Automation',
            date: 'Mar 2023 - Aug 2023',
            description: 'Built and managed four successful online brands with automated systems and marketing strategies. Implemented automated inventory management, order processing, and customer service systems to streamline operations and improve efficiency.',
            features: [
                'Automated inventory management',
                'Order processing system',
                'Customer service automation',
                'Marketing campaign automation',
                'Sales analytics dashboard'
            ],
            technologies: [
                'Python',
                'Shopify',
                'JavaScript',
                'HTML',
                'CSS',
                'AWS',
                'Search Engine Optimization',
                'TikTok Ads',
                'Facebook (Meta)Ads',
                'Data Analytics'
            ]
        },
        'business-transformation': {
            image: 'images/fulls/04.gif',
            title: 'Business Digital Transformation',
            date: 'Jan 2023 - Mar 2023',
            description: 'Implemented cloud-based systems for quote & invoice processes at E&E Building Services. Streamlined business operations through digital transformation, resulting in improved workflow efficiency and customer satisfaction.',
            features: [
                'Cloud-based quote system',
                'Automated invoice processing',
                'Digital document management',
                'Workflow optimization',
                'Customer portal integration'
            ],
            technologies: [
                'Cloud Computing',
                'Google Cloud Platform',
                'Web Development',
                'Database Design & Management',
                'API Integration',
                'Business Process Automation'
            ]
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
            projectDate.innerHTML = `<i class="fas fa-calendar"></i> ${project.date}`;
            modalDescription.textContent = project.description;
            
            // Populate features
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                projectFeatures.appendChild(li);
            });
            
            // Populate technologies
            project.technologies.forEach(tech => {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.textContent = tech;
                projectTechnologies.appendChild(span);
            });
            
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