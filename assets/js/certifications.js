document.addEventListener('DOMContentLoaded', function() {
    const certModal = document.getElementById('certification-modal');
    const certTitle = document.getElementById('cert-title');
    const certDate = document.getElementById('cert-date');
    const certId = document.getElementById('cert-id');
    const certSkills = document.getElementById('cert-skills');
    const certDescription = document.getElementById('cert-description');
    const certLink = document.getElementById('cert-link');
    const closeBtn = certModal.querySelector('.close-modal');
    const modalContent = certModal.querySelector('.modal-content');

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
    certModal.addEventListener('wheel', function(e) {
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
    certModal.addEventListener('touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false });

    // Certification data
    const certifications = {
        'degree': {
            title: 'Bachelor of Engineering (Honours) in Mechatronic Engineering',
            date: 'Expected December 2024',
            credentialId: 'UTS-2024-ME-HONS',
            skills: [
                'Robotics & Automation',
                'Mechanical Design',
                'Electronics',
                'Programming',
                'Project Management',
                'Systems Engineering'
            ],
            description: 'A comprehensive engineering degree focusing on the integration of mechanical, electrical, and software systems. The program emphasizes hands-on experience with modern robotics, automation systems, and industry-standard tools while developing strong problem-solving and analytical skills.',
            link: '#' // Add your credential link here
        },
        'ford': {
            title: 'Digital Advanced Program',
            date: 'September 2023',
            credentialId: 'FORD-DAP-2023-091',
            skills: [
                'Digital Innovation',
                'Automotive Technology',
                'Product Development',
                'Data Analytics',
                'Project Management'
            ],
            description: 'An intensive program focused on digital transformation in the automotive industry. Gained hands-on experience with Ford\'s digital tools and methodologies, working on real-world challenges in vehicle development and manufacturing processes.',
            link: 'https://www.theforage.com/virtual-internships/prototype/93Uc2AZhNQRRqhNDi/Ford-Motor-Company-Virtual-Experience-Program' // Update this link
        },
        'ycombinator': {
            title: 'Startup Work Experience Program',
            date: 'August 2023',
            credentialId: 'YC-SWE-2023-082',
            skills: [
                'Startup Operations',
                'Product Development',
                'Market Analysis',
                'Business Strategy',
                'Innovation'
            ],
            description: 'A comprehensive program providing hands-on experience in startup operations and development. Learned key aspects of building and scaling technology startups, including product development, market analysis, and business strategy through Y Combinator\'s proven methodology.',
            link: 'https://www.theforage.com/virtual-internships/prototype/oRMogWRHeewqHzA7u/Y-Combinator-Startup-Simulator' // Update this link
        },
        'deloitte': {
            title: 'Technology Consulting Virtual Experience Program',
            date: 'July 2023',
            credentialId: 'DEL-TCP-2023-071',
            skills: [
                'Technology Consulting',
                'Cloud Computing',
                'Digital Strategy',
                'Business Analysis',
                'Client Management'
            ],
            description: 'An immersive program focusing on technology consulting practices at Deloitte. Gained experience in cloud computing, digital transformation strategies, and business analysis while working on realistic client scenarios and technology implementation projects.',
            link: 'https://www.theforage.com/virtual-internships/prototype/YPWCiGNTkr6QxcpEu/Deloitte-STEM-Virtual-Experience-Program' // Update this link
        }
    };

    // Open modal with certification details
    document.querySelectorAll('.certification-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const certId = this.dataset.cert;
            const cert = certifications[certId];
            
            certTitle.textContent = cert.title;
            certDate.textContent = cert.date;
            certId.textContent = cert.credentialId;
            certDescription.textContent = cert.description;
            certLink.href = cert.link;
            
            // Clear and populate skills
            certSkills.innerHTML = '';
            cert.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                certSkills.appendChild(li);
            });
            
            certModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        certModal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    certModal.addEventListener('click', function(e) {
        if (e.target === certModal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certModal.classList.contains('show')) {
            closeModal();
        }
    });
});