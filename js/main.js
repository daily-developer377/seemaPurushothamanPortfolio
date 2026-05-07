/* -------------------------------------------

Name: 		Starbelly
Version:  1.0
Author:		Nazar Miller (millerDigitalDesign)
Portfolio:  https://themeforest.net/user/millerdigitaldesign/portfolio?ref=MillerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). mail: miller.themes@gmail.com

------------------------------------------- */

$(function () {
  "use strict";
  var owlCarouselCss =
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css";
  var owlCarouselJs =
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js";

  function loadStylesheetOnce(href) {
    if ($('link[href="' + href + '"]').length) {
      return;
    }

    $("<link>", {
      rel: "stylesheet",
      href: href,
    }).appendTo("head");
  }

  function loadScriptOnce(src) {
    var deferred = $.Deferred();
    var existingScript = $('script[src="' + src + '"]');

    if ($.fn.owlCarousel) {
      deferred.resolve();
    } else if (existingScript.length) {
      existingScript.on("load", function () {
        deferred.resolve();
      });
      existingScript.on("error", function () {
        deferred.reject();
      });
    } else {
      $.getScript(src).done(deferred.resolve).fail(deferred.reject);
    }

    return deferred.promise();
  }

  function whenImagesAreReady($container) {
    var deferred = $.Deferred();
    var $images = $container.find("img");
    var remaining = $images.length;

    if (!remaining) {
      deferred.resolve();
      return deferred.promise();
    }

    $images.each(function () {
      if (this.complete) {
        remaining--;
      } else {
        $(this).one("load error", function () {
          remaining--;
          if (!remaining) {
            deferred.resolve();
          }
        });
      }
    });

    if (!remaining) {
      deferred.resolve();
    }

    return deferred.promise();
  }

  function initBiographyImageSlider() {
    var $slider = $(".biography-image-slider");

    if (!$slider.length) {
      return;
    }

    loadStylesheetOnce(owlCarouselCss);
    loadScriptOnce(owlCarouselJs).done(function () {
      whenImagesAreReady($slider).done(function () {
        $slider.each(function () {
          var $this = $(this);

          if ($this.hasClass("owl-loaded")) {
            $this.trigger("refresh.owl.carousel");
            return;
          }

          $this.owlCarousel({
            items: 1,
            loop: true,
            margin: 16,
            nav: true,
            navText: [
              '<span aria-label="Previous slide"></span>',
              '<span aria-label="Next slide"></span>',
            ],
            dots: true,
            autoplay: true,
            autoplayTimeout: 3500,
            autoplayHoverPause: true,
            smartSpeed: 700,
            responsive: {
              0: {
                items: 1,
              },
              768: {
                items: 1,
              },
              1200: {
                items: 1,
              },
            },
          });

          setTimeout(function () {
            $this.trigger("refresh.owl.carousel");
          }, 100);
        });
      });
    });
  }
  /***************************

  preloader

  ***************************/
  $(document).ready(function () {
    $(".sb-loading").animate(
      {
        opacity: 1,
      },
      {
        duration: 500,
      }
    );
    setTimeout(function () {
      $(".sb-preloader-number").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 1000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
          }
        );
      });
      $(".sb-bar").animate(
        {
          height: "100%",
        },
        {
          duration: 1000,
          complete: function () {
            $(".sb-preloader").addClass("sb-hidden");
          },
        }
      );
    }, 400);
  });
  /***************************

  faq

  ***************************/
  $(".sb-faq li .sb-question").on("click", function () {
    $(this).find(".sb-plus-minus-toggle").toggleClass("sb-collapsed");
    $(this).parent().toggleClass("sb-active");
  });
  /***************************

  swup

  ***************************/
  const options = {
    containers: ["#sb-dynamic-content", "#sb-dynamic-menu"],
    animateHistoryBrowsing: true,
    linkSelector:
      'a[href]:not([href^="#"]):not([href^="mailto"]):not([target="_blank"]):not([href^="http"]):not([data-no-swup])',
    // linkSelector:
    //   ".sb-navigation a:not([data-no-swup]) , a:not([data-no-swup])",
  };
  const swup = new Swup(options);
  /***************************

  isotope

  ***************************/
  $(".sb-filter a").on("click", function () {
    $(".sb-filter .sb-active").removeClass("sb-active");
    $(this).addClass("sb-active");

    var selector = $(this).data("filter");
    $(".sb-masonry-grid").isotope({
      filter: selector,
    });
    return false;
  });
  $(document).ready(function () {
    $(".sb-masonry-grid").isotope({
      itemSelector: ".sb-grid-item",
      percentPosition: true,
      masonry: {
        columnWidth: ".sb-grid-sizer",
      },
    });
  });
  $(".sb-tabs").isotope({
    filter: ".sb-ingredients-tab",
  });
  /***************************

  fancybox

  ***************************/
  $('[data-fancybox="menu"]').fancybox({
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionDuration: 1200,
  });
  $('[data-fancybox="gallery"]').fancybox({
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionDuration: 1200,
  });
  $.fancybox.defaults.hash = false;
  initBiographyImageSlider();
  /***************************

  
  click effect

  ***************************/
  const cursor = document.querySelector(".sb-click-effect");
  document.addEventListener("mousemove", (e) => {
    cursor.setAttribute(
      "style",
      "top:" + (e.pageY - 15) + "px; left:" + (e.pageX - 15) + "px;"
    );
  });
  document.addEventListener("click", () => {
    cursor.classList.add("sb-click");
    setTimeout(() => {
      cursor.classList.remove("sb-click");
    }, 600);
  });
  /***************************

  add to cart

  ***************************/
  var counter = $(".sb-cart-number").text();

  $(".sb-atc").on("click", function () {
    counter++;
    $(".sb-cart-number").addClass("sb-added");
    $(this).addClass("sb-added");
    setTimeout(() => {
      $(".sb-cart-number").removeClass("sb-added");
    }, 600);
    setTimeout(() => {
      $(".sb-cart-number").text(counter);
    }, 300);
  });
  /***************************

  menu

  ***************************/
  $(".sb-menu-btn").on("click", function () {
    $(".sb-menu-btn , .sb-navigation").toggleClass("sb-active");
    $(".sb-info-btn , .sb-info-bar , .sb-minicart").removeClass("sb-active");
  });
  $(".sb-info-btn").on("click", function () {
    $(".sb-info-btn , .sb-info-bar").toggleClass("sb-active");
    $(".sb-menu-btn , .sb-navigation , .sb-minicart").removeClass("sb-active");
  });
  $(".sb-btn-cart").on("click", function () {
    $(".sb-minicart").toggleClass("sb-active");
    $(
      ".sb-info-btn , .sb-info-bar , .sb-navigation , .sb-menu-btn , .sb-info-btn"
    ).removeClass("sb-active");
  });
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $(".sb-top-bar-frame").addClass("sb-scroll");
    } else {
      $(".sb-top-bar-frame").removeClass("sb-scroll");
    }
    if (scroll >= 10) {
      $(".sb-info-bar , .sb-minicart").addClass("sb-scroll");
    } else {
      $(".sb-info-bar , .sb-minicart").removeClass("sb-scroll");
    }
  });
  $(document).on("click", function (e) {
    var el =
      ".sb-minicart , .sb-btn-cart , .sb-menu-btn , .sb-navigation , .sb-info-btn , .sb-info-bar";
    if (jQuery(e.target).closest(el).length) return;
    $(
      ".sb-minicart , .sb-btn-cart , .sb-menu-btn , .sb-navigation , .sb-info-btn , .sb-info-bar"
    ).removeClass("sb-active");
  });

  if ($(window).width() < 992) {
    $(".sb-has-children > a").attr("href", "#.");
  }
  $(window).resize(function () {
    if ($(window).width() < 992) {
      $(".sb-has-children > a").attr("href", "#.");
    }
  });
  /***************************

  quantity

  ***************************/
  $(".sb-add").on("click", function () {
    if ($(this).prev().val() < 10) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });
  $(".sb-sub").on("click", function () {
    if ($(this).next().val() > 1) {
      if ($(this).next().val() > 1)
        $(this)
          .next()
          .val(+$(this).next().val() - 1);
    }
  });
  /***************************

  sticky

  ***************************/
  var sticky = new Sticky(".sb-sticky");
  if ($(window).width() < 992) {
    sticky.destroy();
  }
  /***************************

  contact form

  ***************************/
  $("#form").submit(function () {
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: $(this).serialize(),
    }).done(function () {
      $(".sb-success-result").addClass("sb-active");
    });
    return false;
  });
  /***************************

  sliders

  ***************************/
  var swiper = new Swiper(".sb-short-menu-slider-3i", {
    slidesPerView: 3,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: ".sb-short-menu-prev",
      nextEl: ".sb-short-menu-next",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
    },
  });
  var swiper = new Swiper(".sb-short-menu-slider-2-3i", {
    slidesPerView: 3,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: ".sb-short-menu-prev-2",
      nextEl: ".sb-short-menu-next-2",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
    },
  });
  var swiper = new Swiper(".sb-short-menu-slider-4i", {
    slidesPerView: 4,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: ".sb-short-menu-prev",
      nextEl: ".sb-short-menu-next",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
    },
  });
  var swiper = new Swiper(".sb-short-menu-slider-2-4i", {
    slidesPerView: 4,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: ".sb-short-menu-prev-2",
      nextEl: ".sb-short-menu-next-2",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
    },
  });
  var swiper = new Swiper(".sb-reviews-slider", {
    slidesPerView: 2,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: ".sb-reviews-prev",
      nextEl: ".sb-reviews-next",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
    },
  });
  var swiper = new Swiper(".sb-blog-slider-2i", {
    slidesPerView: 2,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: ".sb-blog-prev",
      nextEl: ".sb-blog-next",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
    },
  });
  var swiper = new Swiper(".sb-blog-slider-3i", {
    slidesPerView: 3,
    spaceBetween: 30,
    parallax: true,
    speed: 1000,
    navigation: {
      prevEl: ".sb-blog-prev",
      nextEl: ".sb-blog-next",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
    },
  });
  /***************************

  map

  ***************************/
  if ($("div").is("#map")) {
    mapboxgl.accessToken =
      "";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/stoscar/ckk6qpt2h0yi517o77x3tw34f",
      center: [-79.3949, 43.643102],
      zoom: 15,
    });
    var marker = new mapboxgl.Marker()
      .setLngLat([-79.3949, 43.643102])
      .addTo(map);
  }
  $(".sb-lock").on("click", function () {
    $(".sb-map").toggleClass("sb-active");
    $(".sb-lock").toggleClass("sb-active");
    $(".sb-lock .fas").toggleClass("fa-unlock");
  });

  /***************************

  datepicker

  ***************************/
  $(".sb-datepicker").datepicker({
    minDate: new Date(),
  });

  /*----------------------------------------------------------
  ------------------------------------------------------------

  REINIT

  ------------------------------------------------------------
  ----------------------------------------------------------*/
  document.addEventListener("swup:contentReplaced", function () {
    $(
      ".sb-info-btn , .sb-info-bar , .sb-minicart , .sb-menu-btn , .sb-navigation"
    ).removeClass("sb-active");
    $(".sb-top-bar-frame").removeClass("sb-scroll");
    $("a").removeClass("sb-click");
    if ($("html").hasClass("is-rendering")) {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        {
          duration: 0,
          complete: function () {},
        }
      );
    }
    /***************************

    faq

    ***************************/
    $(".sb-faq li .sb-question").on("click", function () {
      $(this).find(".sb-plus-minus-toggle").toggleClass("sb-collapsed");
      $(this).parent().toggleClass("sb-active");
    });
    /***************************

    isotope

    ***************************/
    $(".sb-filter a").on("click", function () {
      $(".sb-filter .sb-active").removeClass("sb-active");
      $(this).addClass("sb-active");

      var selector = $(this).data("filter");
      $(".sb-masonry-grid").isotope({
        filter: selector,
      });
      return false;
    });
    $(document).ready(function () {
      $(".sb-masonry-grid").isotope({
        itemSelector: ".sb-grid-item",
        percentPosition: true,
        masonry: {
          columnWidth: ".sb-grid-sizer",
        },
      });
    });
    $(".sb-tabs").isotope({
      filter: ".sb-ingredients-tab",
    });
    /***************************

    fancybox

    ***************************/
    $('[data-fancybox="menu"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
    });
    $('[data-fancybox="gallery"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
    });
    $.fancybox.defaults.hash = false;
    initBiographyImageSlider();
    /***************************

    click effect

    ***************************/
    $('a[href]:not([href^="mailto\\:"], [href$="\\#"], [href$="\\#."])').on(
      "click",
      function () {
        $(this).addClass("sb-click");
      }
    );
    $(
      '.sb-breadcrumbs a[href]:not([href^="mailto\\:"], [href$="\\#"], [href$="\\#."])'
    ).on("click", function () {
      $(".sb-breadcrumbs").addClass("sb-click");
    });
    /***************************

    add to cart

    ***************************/
    $(".sb-atc").on("click", function () {
      counter++;
      $(".sb-cart-number").addClass("sb-added");
      $(this).addClass("sb-added");
      setTimeout(() => {
        $(".sb-cart-number").removeClass("sb-added");
      }, 600);
      setTimeout(() => {
        $(".sb-cart-number").text(counter);
      }, 300);
    });
    /***************************

    menu

    ***************************/
    $(document).on("click", function (e) {
      var el =
        ".sb-minicart , .sb-btn-cart , .sb-menu-btn , .sb-navigation , .sb-info-btn , .sb-info-bar";
      if (jQuery(e.target).closest(el).length) return;
      $(
        ".sb-minicart , .sb-btn-cart , .sb-menu-btn , .sb-navigation , .sb-info-btn , .sb-info-bar"
      ).removeClass("sb-active");
    });
    if ($(window).width() < 992) {
      $(".sb-has-children > a").attr("href", "#.");
    }
    $(window).resize(function () {
      if ($(window).width() < 992) {
        $(".sb-has-children > a").attr("href", "#.");
      }
    });
    /***************************

    quantity

    ***************************/
    $(".sb-add").on("click", function () {
      if ($(this).prev().val() < 10) {
        $(this)
          .prev()
          .val(+$(this).prev().val() + 1);
      }
    });
    $(".sb-sub").on("click", function () {
      if ($(this).next().val() > 1) {
        if ($(this).next().val() > 1)
          $(this)
            .next()
            .val(+$(this).next().val() - 1);
      }
    });
    /***************************

    sticky

    ***************************/
    var sticky = new Sticky(".sb-sticky");
    if ($(window).width() < 992) {
      sticky.destroy();
    }
    /***************************

    contact form

    ***************************/
    $("#form").submit(function () {
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: $(this).serialize(),
      }).done(function () {
        $(".sb-success-result").addClass("sb-active");
      });
      return false;
    });
    /***************************

    sliders

    ***************************/
    var swiper = new Swiper(".sb-short-menu-slider-3i", {
      slidesPerView: 3,
      spaceBetween: 30,
      parallax: true,
      speed: 1000,
      navigation: {
        prevEl: ".sb-short-menu-prev",
        nextEl: ".sb-short-menu-next",
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
      },
    });
    var swiper = new Swiper(".sb-short-menu-slider-2-3i", {
      slidesPerView: 3,
      spaceBetween: 30,
      parallax: true,
      speed: 1000,
      navigation: {
        prevEl: ".sb-short-menu-prev-2",
        nextEl: ".sb-short-menu-next-2",
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
      },
    });
    var swiper = new Swiper(".sb-short-menu-slider-4i", {
      slidesPerView: 4,
      spaceBetween: 30,
      parallax: true,
      speed: 1000,
      navigation: {
        prevEl: ".sb-short-menu-prev",
        nextEl: ".sb-short-menu-next",
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
      },
    });
    var swiper = new Swiper(".sb-short-menu-slider-2-4i", {
      slidesPerView: 4,
      spaceBetween: 30,
      parallax: true,
      speed: 1000,
      navigation: {
        prevEl: ".sb-short-menu-prev-2",
        nextEl: ".sb-short-menu-next-2",
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
      },
    });
    var swiper = new Swiper(".sb-reviews-slider", {
      slidesPerView: 2,
      spaceBetween: 30,
      parallax: true,
      speed: 1000,
      navigation: {
        prevEl: ".sb-reviews-prev",
        nextEl: ".sb-reviews-next",
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
      },
    });
    var swiper = new Swiper(".sb-blog-slider-2i", {
      slidesPerView: 2,
      spaceBetween: 30,
      parallax: true,
      speed: 1000,
      navigation: {
        prevEl: ".sb-blog-prev",
        nextEl: ".sb-blog-next",
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
      },
    });
    var swiper = new Swiper(".sb-blog-slider-3i", {
      slidesPerView: 3,
      spaceBetween: 30,
      parallax: true,
      speed: 1000,
      navigation: {
        prevEl: ".sb-blog-prev",
        nextEl: ".sb-blog-next",
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
      },
    });
    /***************************

    map

    ***************************/
    if ($("div").is("#map")) {
      mapboxgl.accessToken =
        "";
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/stoscar/ckk6qpt2h0yi517o77x3tw34f",
        center: [-79.3949, 43.643102],
        zoom: 15,
      });
      var marker = new mapboxgl.Marker()
        .setLngLat([-79.3949, 43.643102])
        .addTo(map);
    }
    $(".sb-lock").on("click", function () {
      $(".sb-map").toggleClass("sb-active");
      $(".sb-lock").toggleClass("sb-active");
      $(".sb-lock .fas").toggleClass("fa-unlock");
    });
    /***************************

    datepicker

    ***************************/
    $(".sb-datepicker").datepicker({
      minDate: new Date(),
    });
  });
});
