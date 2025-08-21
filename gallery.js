// Gallery Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;

    const modalImg = modal.querySelector('img');
    const modalClose = modal.querySelector('.modal-close');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            modalImg.src = item.querySelector('img').src;
            modal.style.display = 'flex';
        });
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modalPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        modalImg.src = galleryItems[currentImageIndex].querySelector('img').src;
    });

    modalNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        modalImg.src = galleryItems[currentImageIndex].querySelector('img').src;
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});