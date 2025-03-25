document.addEventListener("DOMContentLoaded", () => {
    /*animations*/
    AOS.init();

    /*header script*/
    const header = document.querySelector("header");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const dropdowns = document.querySelectorAll(".custom-dropdown");
    const isTouch =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

    mobileMenuBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        header.classList.toggle("mobile-menu-open");
        document.body.classList.toggle("no-scroll");
    });

    dropdowns.forEach((dropdown) => {
        const button = dropdown.querySelector(".btn");
        button?.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isTouch && window.innerWidth >= 992) {
                dropdowns.forEach((other) => {
                    if (other !== dropdown) {
                        other.classList.remove("active");
                    }
                });
                dropdown.classList.toggle("active");
            }
            if (window.innerWidth < 992) {
                dropdowns.forEach((other) => {
                    if (other !== dropdown) {
                        other.classList.remove("active");
                    }
                });
                dropdown.classList.toggle("active");
            }
        });
    });

    document.addEventListener("click", (e) => {
        const clickedDropdown = e.target.closest(".custom-dropdown");
        if (clickedDropdown) {
            dropdowns.forEach((dropdown) => {
                if (dropdown !== clickedDropdown) {
                    dropdown.classList.remove("active");
                }
            });
            return;
        }

        if (!clickedDropdown) {
            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove("active");
            });
        }

        if (!header.contains(e.target)) {
            header.classList.remove("mobile-menu-open");
            document.body.classList.remove("no-scroll");
        }
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 992) {
                header.classList.remove("mobile-menu-open");
                document.body.classList.remove("no-scroll");
                if (!isTouch) {
                    dropdowns.forEach((dropdown) =>
                        dropdown.classList.remove("active")
                    );
                }
            }
        }, 250);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            header.classList.remove("mobile-menu-open");
            document.body.classList.remove("no-scroll");
            dropdowns.forEach((dropdown) =>
                dropdown.classList.remove("active")
            );
        }
    });

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

    /*footer script*/
    const footerDropdowns = document.querySelectorAll(".footer-dropdown");

    footerDropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector(".d-md-none .btn");
      const content = dropdown.querySelector("ul");

      if (button && content) {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          footerDropdowns.forEach((other) => {
            if (other !== dropdown) {
              other.classList.remove("active");
            }
          });

          dropdown.classList.toggle("active");
        });
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".footer-dropdown")) {
        footerDropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        footerDropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    });
});