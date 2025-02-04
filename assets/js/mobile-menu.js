document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('#mobile-nav');
    const mobileNavLinks = document.querySelectorAll('#mobile-nav .nav-link');

    // Toggle menu
    menuButton.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuButton.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuButton.contains(e.target) && !mobileNav.contains(e.target)) {
            menuButton.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
}); 