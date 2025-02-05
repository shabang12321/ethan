document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('#mobile-nav');
    const mobileNavLinks = document.querySelectorAll('#mobile-nav .nav-link');
    const avatar = document.querySelector('.image.avatar');

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

    // Prevent context menu
    avatar.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Prevent force touch/long press
    avatar.addEventListener('touchstart', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Prevent force touch/long press on the image itself
    avatar.querySelector('img').addEventListener('touchstart', function(e) {
        e.preventDefault();
    }, { passive: false });
}); 