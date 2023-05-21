const carouselWrapper = document.querySelector('.embed-figure-carousel-wrapper');
const carousel = document.querySelector('.embed-figure-carousel');
const prevButton = document.querySelector('.embed-figure-carousel-wrapper .nav-prev');
const nextButton = document.querySelector('.embed-figure-carousel-wrapper .nav-next');
const pagination = document.querySelector('.embed-figure-carousel-wrapper .pagination');


const totalPages = carousel.children.length;

for (let i = 0; i < totalPages; i++) {
    const button = document.createElement('button');
    // button.textContent = i + 1;
    button.addEventListener('click', () => {
        carousel.scrollTo({left: carousel.clientWidth * i, behavior: 'smooth'});
    });
    pagination.appendChild(button);
}

function updatePagination() {
    const activeIndex = Math.round(carousel.scrollLeft / carousel.clientWidth);
    const buttons = pagination.querySelectorAll('button');
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index === activeIndex);
    });
}

function updateNavButtons() {
    const scrollLeft = carousel.scrollLeft;
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;

    prevButton.style.opacity = scrollLeft <= 0 ? 0 : 1;
    /** the + 10 is a quick patch fix **/
    nextButton.style.opacity = scrollLeft + 10 >= scrollWidth - clientWidth ? 0 : 1;
}

updateNavButtons();
updatePagination();


// ---
carousel.addEventListener('scroll', () => {
    updatePagination();
    updateNavButtons();
});
carousel.addEventListener('mousedown', handleSwipeStart, false);
carousel.addEventListener('mousemove', handleSwipeMove, false);
carousel.addEventListener('mouseup', () => {
    xDown = null;
}, false);
carousel.addEventListener('touchstart', handleSwipeStart, false);
carousel.addEventListener('touchmove', handleSwipeMove, false);
carousel.addEventListener('touchend', () => {
    xDown = null;
}, false);

let xDown = null;

function handleSwipeStart(e) {
    if (e.type === 'mousedown') {
        e.preventDefault();
    }
    xDown = e.touches ? e.touches[0].clientX : e.clientX;

    //const page = Math.floor(xDown / carousel.clientWidth);


}

function handleSwipeMove(e) {
    if (!xDown) {
        return;
    }

    let xUp = e.touches ? e.touches[0].clientX : e.clientX;
    let xDiff = xDown - xUp;

    if (Math.abs(xDiff) > 50) {
        if (xDiff > 0) {
            carousel.scrollBy({left: carousel.clientWidth, behavior: 'smooth'});
        } else {
            carousel.scrollBy({left: -carousel.clientWidth, behavior: 'smooth'});
        }
        xDown = null;
    }
};

prevButton.addEventListener('click', () => {
    carousel.scrollBy({left: -carousel.clientWidth, behavior: 'smooth'});
});

nextButton.addEventListener('click', () => {
    carousel.scrollBy({left: carousel.clientWidth, behavior: 'smooth'});
});