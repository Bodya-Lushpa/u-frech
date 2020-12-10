'use strict';

document.addEventListener("DOMContentLoaded", function () {
  var interestCarousel = new Swiper(".main-page__interest__carousel .swiper-container", {
    navigation: {
      nextEl: ".main-page__interest__heading .carousel-arrows .button-next",
      prevEl: ".main-page__interest__heading .carousel-arrows .button-prev"
    },
    slidesPerColumn: 1,
    slidesPerColumnFill: "row",
    slidesPerView: 1,
    spaceBetween: 14,
    breakpoints: {
      1170: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 14,
        allowTouchMove: false
      },
      1320: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 14
      }
    }
  });
  var specialCarousel = new Swiper(".main-page__special__carousel .swiper-container", {
    navigation: {
      nextEl: ".main-page__special__heading .carousel-arrows .button-next",
      prevEl: ".main-page__special__heading .carousel-arrows .button-prev"
    },
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 14,
    breakpoints: {
      1400: {
        slidesPerView: 6,
        slidesPerGroup: 6
      },
      1250: {
        slidesPerView: 5,
        slidesPerGroup: 5
      },
      1000: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        allowTouchMove: false
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3
      }
    }
  });
  var dietsCarousel = new Swiper(".main-page__diets .swiper-container", {
    navigation: {
      nextEl: ".main-page__diets__heading .carousel-arrows .button-next",
      prevEl: ".main-page__diets__heading .carousel-arrows .button-prev"
    },
    slidesPerColumn: 2,
    slidesPerColumnFill: "row",
    slidesPerView: 2,
    spaceBetween: 14,
    breakpoints: {
      1400: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 14,
        slidesPerColumn: 1
      },
      1000: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 14,
        allowTouchMove: false,
        slidesPerColumn: 1
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 14,
        slidesPerColumn: 1
      }
    }
  });
  var recipesCarousel = new Swiper(".main-page__recipes .swiper-container", {
    navigation: {
      nextEl: ".main-page__recipes__heading .carousel-arrows .button-next",
      prevEl: ".main-page__recipes__heading .carousel-arrows .button-prev"
    },
    slidesPerColumn: 2,
    slidesPerColumnFill: "row",
    slidesPerView: 1,
    spaceBetween: 14,
    breakpoints: {
      1400: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 14,
        slidesPerColumn: 1
      },
      1170: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        slidesPerColumn: 1,
        allowTouchMove: false
      }
    }
  });
  var seasonProducts = new Swiper(".main-page__season-offer__products .swiper-container", {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 14,
    navigation: {
      nextEl: ".main-page__season-offer__heading .carousel-arrows .button-next",
      prevEl: ".main-page__season-offer__heading .carousel-arrows .button-prev"
    },
    breakpoints: {
      500: {
        slidesPerView: 3,
        slidesPerGroup: 3
      },
      1170: {
        allowTouchMove: false,
        slidesPerView: 3,
        slidesPerGroup: 3
      }
    }
  });
});