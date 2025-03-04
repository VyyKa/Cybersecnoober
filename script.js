document.addEventListener('DOMContentLoaded', function() {
    // Menu Modal
    const menuBtn = document.querySelector('.menu-btn');
    const menuModal = document.getElementById('menu-modal');
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.getElementById('login-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');

    // Tab Functionality
    const tabs = document.querySelectorAll('.tabs .tab');
    const contentSections = document.querySelectorAll('.content-section');

    // Initialize upload area
    initializeUploadArea();

    function showSection(sectionId) {
        // Hide all modals
        hideAllModals();

        // Show upload area if file section is selected
        if (sectionId === 'file') {
            initializeUploadArea();
        }

        // Remove active class from all tabs and sections
        tabs.forEach(tab => tab.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));

        // Add active class to selected tab and section
        const selectedTab = document.querySelector(`.tab[data-section="${sectionId}"]`);
        const selectedSection = document.getElementById(`${sectionId}-section`);

        if (selectedTab && selectedSection) {
            selectedTab.classList.add('active');
            selectedSection.classList.add('active');
        }
    }

    // Menu functionality
    if (menuBtn && menuModal) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hideAllModals();
            menuModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Handle modal transitions (forgot password, sign up, etc.)
    document.querySelectorAll('[data-modal]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const modalId = link.getAttribute('data-modal');
            const currentModal = link.closest('.modal');
            const targetModal = document.getElementById(modalId);
            
            if (currentModal && targetModal) {
                switchModal(currentModal, targetModal);
            } else if (targetModal) {
                showModal(targetModal);
            }
        });
    });

    // Initialize modal transitions and handlers
    modals.forEach(modal => {
        // Set up transitions
        modal.style.transition = 'opacity 0.2s ease-out';
        modal.style.opacity = '0';
        
        // Handle close button clicks
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                hideModal(modal);
            });
        }

        // Handle background clicks
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });

    // Helper function to show modal with transition
    function showModal(modal) {
        modal.style.opacity = '0';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Force reflow
        modal.offsetHeight;
        modal.style.opacity = '1';
    }

    // Helper function to hide modal with transition
    function hideModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 200);
    }

    // Helper function to switch between modals
    function switchModal(fromModal, toModal) {
        fromModal.style.opacity = '0';
        setTimeout(() => {
            fromModal.classList.remove('active');
            showModal(toModal);
        }, 200);
    }

    // Update hideAllModals to handle transitions
    function hideAllModals(withTransition = false) {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                if (withTransition) {
                    hideModal(modal);
                } else {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // Login functionality
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hideAllModals();
            loginModal.classList.add('active');
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
            } else if (href && href.startsWith('#')) {
                // For team section link
                if (href === '#team') {
                    e.preventDefault();
                    hideAllModals(); // Hide the menu modal
                    const teamSection = document.getElementById('team');
                    if (teamSection) {
                        window.location.hash = 'team';
                    }
                }
            }
        });
    });

    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = tab.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    // Modal close buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const modal = button.closest('.modal');
            if (modal) {
                hideModal(modal);
            }
        });
    });

    function initializeUploadArea() {
        const dropZone = document.getElementById('dropZone');
        if (!dropZone) return;

        const chooseFileBtn = dropZone.querySelector('.choose-file');
        if (!chooseFileBtn) return;

        // Remove existing event listeners
        const newDropZone = dropZone.cloneNode(true);
        dropZone.parentNode.replaceChild(newDropZone, dropZone);

        // Add new event listeners
        newDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            newDropZone.classList.add('dragover');
        });

        newDropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            newDropZone.classList.remove('dragover');
        });

        newDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            newDropZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        const newChooseFileBtn = newDropZone.querySelector('.choose-file');
        newChooseFileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.addEventListener('change', (e) => {
                handleFiles(e.target.files);
            });
            input.click();
        });
    }

    function handleFiles(files) {
        // Handle file upload logic here
        console.log('Files to upload:', files);
    }

    // Initialize with default section
    showSection('file');

    // Handle keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close all modals when ESC is pressed
            hideAllModals(true);
            // Remove hash if team section is open
            if (window.location.hash === '#team') {
                window.location.hash = '';
            }
        }
    });

    // Handle team section close button
    const closeTeamBtn = document.querySelector('.close-team');
    if (closeTeamBtn) {
        closeTeamBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = '';
        });
    }

    // Handle overlay clicks for team section
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (window.location.hash === '#team') {
                window.location.hash = '';
            }
        });
    }

    // Prevent clicks inside modal content from closing the modal
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});
