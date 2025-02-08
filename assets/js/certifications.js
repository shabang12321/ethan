document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const certModal = document.getElementById('certification-modal');
    const modalContent = certModal.querySelector('.modal-content');
    const certTitle = document.getElementById('cert-title');
    const certDescription = document.getElementById('cert-description');
    const certLink = document.getElementById('cert-link');
    const closeBtn = certModal.querySelector('.close-modal');

    // Reset modal state
    function resetModal() {
        modalContent.scrollTop = 0;
        certDescription.scrollTop = 0;
        certTitle.innerHTML = '';
        certDescription.innerHTML = '';
        certLink.style.display = 'none';
    }

    // Close modal functionality
    function closeModal() {
        resetModal();
        certModal.classList.remove('show');
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
    certModal.addEventListener('wheel', e => e.preventDefault(), { passive: false });

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

    certModal.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

    // Certification data
    const certifications = {
        'deloitte': {
            title: 'Technology Consulting Virtual Experience Program',
            organization: 'Deloitte Australia',
            date: 'Aug 2023',
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
            date: 'Dec 2024',
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
            date: 'Dec 2024',
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
            title: 'Bachelor of Mechatronic Engineering (Honours)',
            organization: 'Macquarie University',
            date: '2021 - 2025',
            overview: 'A comprehensive engineering degree integrating software, electrical, and mechanical systems with emphasis on practical application and industry relevance.',
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
                'Control Systems',
                'Electronics',
                'Programming',
                'Project Management',
                'Systems Engineering',
                'CAD/CAM',
                'Mechanical Design'
            ],
            link: null
        }
    };

    // Add click event listeners to certification links
    document.querySelectorAll('.certification-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const cert = certifications[this.dataset.cert];
            
            resetModal();
            
            certTitle.innerHTML = `
                <h3>${cert.title}</h3>
                <h4>${cert.organization}</h4>
                <p class="cert-date">${cert.date}</p>
            `;
            
            certDescription.innerHTML = `
                <div class="cert-overview" style="margin-bottom: 2em;">
                    <h4><i class="fas fa-info-circle"></i> Overview</h4>
                    <p>${cert.overview}</p>
                </div>

                <div class="cert-skills" style="margin-bottom: 2em;">
                    <h4><i class="fas fa-tools"></i> Skills Developed</h4>
                    <div class="skills-grid">
                        ${cert.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>

                <div class="cert-tasks">
                    <h4><i class="fas fa-tasks"></i> Key Responsibilities & Achievements</h4>
                    <ul>
                        ${cert.tasks.map(task => `
                            <li>
                                <strong>${task.title}:</strong>
                                <span>${task.details}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
            
            if (cert.link) {
                certLink.href = cert.link;
                certLink.innerHTML = 'View Credential <i class="fas fa-external-link-alt"></i>';
                certLink.style.display = 'inline-block';
                certLink.target = '_blank';
                certLink.rel = 'noopener noreferrer';
            } else {
                certLink.style.display = 'none';
            }
            
            certModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // Event listeners for closing modal
    closeBtn.addEventListener('click', closeModal);
    certModal.addEventListener('click', e => e.target === certModal && closeModal());
    document.addEventListener('keydown', e => e.key === 'Escape' && certModal.classList.contains('show') && closeModal());
});