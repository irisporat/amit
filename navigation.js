/**
 * Navigation Component for "החברים של עמית"
 * This script injects the shared Header and Side Menu into the pages.
 */

function initNavigation(pageTitle, options = {}) {
    const defaultOptions = {
        hideHamburger: false
    };
    const settings = { ...defaultOptions, ...options };

    const navRoot = document.getElementById('navigation-root');
    if (!navRoot) {
        console.error('Navigation root element (#navigation-root) not found.');
        return;
    }

    // HTML Template for Navigation
    const navHTML = `
    <!-- Top Navigation Bar -->
    <header class="top-bar">
        <div class="top-bar-right">
            ${settings.hideHamburger ? 
                `<!-- Hamburger hidden for this page -->` : 
                `<button class="hamburger-btn-top" onclick="toggleMenu()">
                    <i data-lucide="menu" stroke-width="2.5" width="28" height="28"></i>
                </button>`
            }
            <h1 class="page-title">${pageTitle}</h1>
        </div>
        <div class="top-bar-left">
            <img src="images/לוגו עגלה לבן.png" alt="לוגו עגלה">
        </div>
    </header>

    <!-- Side Menu & Overlay -->
    <div class="side-menu-overlay" onclick="toggleMenu()"></div>
    <div class="side-menu">
        <button class="close-menu-btn" onclick="toggleMenu()">
            <i data-lucide="x"></i>
        </button>
        <nav class="menu-nav">
            <a href="index.html">
                <i data-lucide="home"></i>
            </a>
            <a href="remember.html">
                <i data-lucide="info"></i> הסיפור של עמית
            </a>
            <a href="coffee.html">
                <i data-lucide="coffee"></i> קפה "החברים של עמית"
            </a>
            <a href="events.html">
                <i data-lucide="calendar"></i> אירועי הנצחה
            </a>
            <a href="news.html">
                <i data-lucide="newspaper"></i> כתבות בעיתונות
            </a>
            <a href="contact.html">
                <i data-lucide="mail"></i> יצירת קשר
            </a>
            <a href="location.html">
                <i data-lucide="map-pin"></i> מיקום העגלה
            </a>
        </nav>
    </div>
    `;

    navRoot.innerHTML = navHTML;

    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Toggles the side menu visibility
 */
function toggleMenu() {
    const sideMenu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.side-menu-overlay');
    if (sideMenu && overlay) {
        sideMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}
