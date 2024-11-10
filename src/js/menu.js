const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');

    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('translate-x-full');
    });

    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
    });