document.addEventListener('DOMContentLoaded', function() {
    // Menu Modal
    const menuBtn = document.querySelector('.menu-btn');
    const menuModal = document.getElementById('menu-modal');
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.getElementById('login-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    const teamSection = document.getElementById('team');
    const overlay = document.querySelector('.overlay');
    const tabs = document.querySelectorAll('.tabs .tab');
    const contentSections = document.querySelectorAll('.content-section');

    // Helper function to hide all modals - define this first
    window.hideAllModals = function() {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    };

    // Menu functionality
    if (menuBtn && menuModal) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllModals();
            menuModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Menu item click handlers
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const sectionId = item.getAttribute('data-section');
            const modalId = item.getAttribute('data-modal');
            const href = item.getAttribute('href');

            if (sectionId) {
                e.preventDefault();
                showSection(sectionId);
                hideAllModals();
            } else if (modalId) {
                e.preventDefault();
                hideAllModals();
                const targetModal = document.getElementById(modalId);
                if (targetModal) {
                    targetModal.classList.add('active');
                }
            }
        });
    });

    // Modal close buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = button.closest('.modal');
            if (modal) {
                hideAllModals();
            }
        });
    });

    // Team section functionality
    function hideTeam() {
        if (teamSection) {
            window.location.hash = '';
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Add click event listener to team link in menu
    const teamLink = document.getElementById('team-link');
    if (teamLink) {
        teamLink.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllModals();
            window.location.hash = 'team';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Handle team section close button
    const closeTeamBtn = document.querySelector('.close-team');
    if (closeTeamBtn) {
        closeTeamBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hideTeam();
        });
    }

    // Handle overlay clicks
    if (overlay) {
        overlay.addEventListener('click', () => {
            hideAllModals();
            if (window.location.hash === '#team') {
                hideTeam();
            }
        });
    }

    // Handle keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAllModals();
            if (window.location.hash === '#team') {
                hideTeam();
            }
        }
    });

    // Handle hash change for team section
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#team') {
            hideAllModals();
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });

    // Section functionality
    function showSection(sectionId) {
        hideAllModals();
        tabs.forEach(tab => tab.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        const selectedTab = document.querySelector(`.tab[data-section="${sectionId}"]`);
        const selectedSection = document.getElementById(`${sectionId}-section`);
        
        if (selectedTab && selectedSection) {
            selectedTab.classList.add('active');
            selectedSection.classList.add('active');
        }
    }

    // Initialize with default section
    showSection('file');
});
