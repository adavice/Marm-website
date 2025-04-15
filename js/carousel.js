document.addEventListener("DOMContentLoaded", () => {
    /*carousel script*/
    let currentSlide = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const totalSlides = slides.length;
    const dots = document.querySelectorAll(".dot");
    const prevArrow = document.querySelector(".prev");
    const nextArrow = document.querySelector(".next");

    function changeSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        const carousel = document.querySelector(".carousel");
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot) => {
            dot.classList.remove("active");
            dot.style.width = "10px";
        });

        const activeDot = dots[currentSlide];
        activeDot.classList.add("active");
        activeDot.style.width = "40px";
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        const carousel = document.querySelector(".carousel");
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        changeSlide();
    }

    setInterval(changeSlide, 20000);

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            const carousel = document.querySelector(".carousel");
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        });
    });

    prevArrow.addEventListener("click", prevSlide);
    nextArrow.addEventListener("click", nextSlide);

    updateDots();
});