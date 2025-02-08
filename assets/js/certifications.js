document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const certModal = document.getElementById('certification-modal');
    const certTitle = document.getElementById('cert-title');
    const certDate = document.getElementById('cert-date');
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
        'deloitte': {
            title: 'Technology Consulting Virtual Experience Program',
            organization: 'Deloitte Australia',
            period: 'July 2023 - August 2023',
            date: 'Certificate issued: August 1, 2023',
            overview: 'An intensive technology consulting program focusing on practical implementation of business solutions, data analysis, and cyber security measures.',
            tasks: [
                {
                    title: 'Software Development',
                    details: 'Developed practical coding solutions for real-world business scenarios.'
                },
                {
                    title: 'Data Analysis',
                    details: 'Analyzed complex datasets and utilized insights to inform development decisions.'
                },
                {
                    title: 'System Implementation',
                    details: 'Implemented software solutions addressing specific business requirements.'
                },
                {
                    title: 'Cyber Security',
                    details: 'Applied fundamental cyber security measures to protect system integrity.'
                },
                {
                    title: 'Forensic Technology',
                    details: 'Gained hands-on experience with digital forensic techniques and tools.'
                }
            ],
            skills: [
                'Technological Innovation',
                'Software Development',
                'Forensic Technology',
                'Data Analysis',
                'Business Analysis',
                'System Security',
                'Client Management'
            ],
            link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Deloitte%20Australia/YPWCiGNTkr6QxcpEu_Deloitte%20Australia_RxreKoYBeNaWc6vkE_1690865187948_completion_certificate.pdf'
        },
        'ycombinator': {
            title: 'Working at a Startup Program',
            organization: 'Y Combinator',
            period: 'August 2023',
            date: 'Certificate issued: August 2023',
            overview: 'An immersive full-stack program mirroring the dynamic environment of a fast-growing startup, focusing on iterative feature development and data-driven analysis.',
            tasks: [
                {
                    title: 'Frontend Development',
                    details: 'Developed a Kanban board feature with drag-and-drop functionality using React and Dragula.'
                },
                {
                    title: 'Backend Integration',
                    details: 'Implemented NodeJS backend functions for persistent data storage and real-time updates.'
                },
                {
                    title: 'Analytics Implementation',
                    details: 'Conducted data analysis on user engagement metrics and created actionable insights.'
                },
                {
                    title: 'Feature Development',
                    details: 'Built and integrated full-stack features with focus on user experience and performance.'
                }
            ],
            skills: [
                'Full-Stack Development',
                'NodeJS',
                'React',
                'SQL Analytics',
                'API Development',
                'User Experience Design',
                'Data Analysis',
                'Agile Methodologies'
            ],
            link: null
        },
        'ford': {
            title: 'Digital Advanced Program',
            organization: 'Ford Motor Company',
            period: 'September 2023',
            date: 'Certificate issued: September 2023',
            overview: 'A comprehensive technical program focused on modern software development practices and system architecture in the automotive industry.',
            tasks: [
                {
                    title: 'Development Environment Setup',
                    details: 'Configured and optimized local development environments for enterprise-scale applications.'
                },
                {
                    title: 'Server Architecture',
                    details: 'Designed and implemented scalable server frameworks using industry best practices.'
                },
                {
                    title: 'Container Implementation',
                    details: 'Developed containerized applications using Docker for consistent deployment.'
                },
                {
                    title: 'API Development',
                    details: 'Created and integrated additional endpoints for enhanced system functionality.'
                }
            ],
            skills: [
                'Server Architecture',
                'Docker Containerization',
                'Redis',
                'Flask',
                'PyCharm',
                'API Design',
                'System Integration',
                'DevOps Practices'
            ],
            link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/RwKkimvLMkHbEHKAA/NijmH479TnRZ73dLB_RwKkimvLMkHbEHKAA_RxreKoYBeNaWc6vkE_1735573520207_completion_certificate.pdf'
        },
        'degree': {
            title: 'Bachelor of Engineering (Honours) in Mechatronic Engineering',
            organization: 'University of Technology Sydney',
            period: '2021 - Present',
            date: 'Expected completion: December 2024',
            overview: 'A comprehensive engineering degree integrating mechanical, electrical, and software systems with emphasis on practical application and industry relevance.',
            tasks: [
                {
                    title: 'Technical Foundation',
                    details: 'Developed strong foundation in engineering principles and modern technological applications.'
                },
                {
                    title: 'Project Work',
                    details: 'Led and contributed to multiple team projects involving robotics and automation systems.'
                },
                {
                    title: 'Research & Development',
                    details: 'Conducted research and development in emerging technologies and engineering solutions.'
                },
                {
                    title: 'Industry Integration',
                    details: 'Applied theoretical knowledge to practical industry scenarios and real-world problems.'
                }
            ],
            skills: [
                'Robotics & Automation',
                'Mechanical Design',
                'Electronics',
                'Programming',
                'Project Management',
                'Systems Engineering',
                'CAD/CAM',
                'Control Systems'
            ],
            link: null
        }
    };

    // Add click event listeners to certification links
    const certLinks = document.querySelectorAll('.certification-link');

    certLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const certId = this.dataset.cert;
            const cert = certifications[certId];
            
            // Update modal content with enhanced structure
            certTitle.innerHTML = `
                <h3>${cert.title}</h3>
                <h4>${cert.organization}</h4>
            `;
            
            // Create detailed content
            const content = `
                <div class="cert-header">
                    <div class="cert-period">
                        <strong>Period:</strong> ${cert.period}
                    </div>
                    <div class="cert-issue-date">
                        <strong>Status:</strong> ${cert.date}
                    </div>
                </div>

                <div class="cert-overview">
                    <h4>Overview</h4>
                    <p>${cert.overview}</p>
                </div>

                <div class="cert-tasks">
                    <h4>Key Responsibilities & Achievements</h4>
                    <ul>
                        ${cert.tasks.map(task => `
                            <li>
                                <strong>${task.title}:</strong>
                                <span>${task.details}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="cert-skills">
                    <h4>Skills Developed</h4>
                    <div class="skills-grid">
                        ${cert.skills.map(skill => `
                            <span class="skill-tag">${skill}</span>
                        `).join('')}
                    </div>
                </div>
            `;
            
            certDescription.innerHTML = content;
            
            // Handle credential button
            if (cert.link) {
                certLink.href = cert.link;
                certLink.style.display = 'inline-block';
            } else {
                certLink.style.display = 'none';
            }
            
            // Show modal
            certModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functionality
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

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certModal.classList.contains('show')) {
            closeModal();
        }
    });
});