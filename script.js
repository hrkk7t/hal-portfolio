document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('is-loaded');
    }
    if (document.querySelector('.window')) {
        checkVisibility();
    }
});
const windows = document.querySelectorAll('.window');
const checkVisibility = () => {
    windows.forEach(windowElement => {
        const rect = windowElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (rect.top < viewportHeight * 0.9 && rect.bottom > 0) {
            windowElement.classList.add('is-visible');
        } else {
            windowElement.classList.remove('is-visible');
        }
    });
};
if (windows.length > 0) {
    window.addEventListener('scroll', checkVisibility);
}
const hamburgerButton = document.getElementById('js-hamburger');
const nav = document.getElementById('js-nav');
if (hamburgerButton && nav) {
    hamburgerButton.addEventListener('click', () => {
        hamburgerButton.classList.toggle('is-active');
        nav.classList.toggle('is-active');
    });
}
const filterTabs = document.querySelector('.filter-tabs');
if (filterTabs) {
    const filterBtns = filterTabs.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const filterValue = btn.dataset.filter;
            workItems.forEach(item => {
                item.classList.remove('is-hidden');
                if (filterValue !== 'all' && item.dataset.category !== filterValue) {
                    item.classList.add('is-hidden');
                }
            });
        });
    });
}
const worksGrid = document.querySelector('.works-grid');
if (worksGrid) {
    const modal = document.getElementById('modal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        const modalTitleBar = document.getElementById('modal-title-bar');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalLink = document.getElementById('modal-link');
        const closeModalBtn = document.getElementById('modal-close-btn');
        const modalOverlay = modal.querySelector('.modal-overlay');

        const openModal = (workItem) => {
            if (!workItem.dataset.image) return;

            const imageSrc = workItem.dataset.image;
            const title = workItem.dataset.title;
            const description = workItem.dataset.description;
            const linkUrl = workItem.dataset.link;

            if (description) {
                modalContent.classList.remove('is-image-only');
            } else {
                modalContent.classList.add('is-image-only');
            }

            modalTitleBar.textContent = title;
            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            if (linkUrl) {
                modalLink.href = linkUrl;
                modalLink.style.display = 'inline-block';
            } else {
                modalLink.style.display = 'none';
            }
            modal.classList.add('is-visible');
        };

        const closeModal = () => {
            modal.classList.remove('is-visible');
        };

        worksGrid.addEventListener('click', (e) => {
            const workItem = e.target.closest('.work-item');
            if (workItem) {
                e.preventDefault();
                openModal(workItem);
            }
        });
        
        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
}