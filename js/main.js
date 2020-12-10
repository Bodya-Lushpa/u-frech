function getScrollbarWidth() {
    var documentWidth = parseInt(document.documentElement.clientWidth),
        windowWidth = parseInt(window.innerWidth),
        scrollbarWidth = windowWidth - documentWidth;
    return scrollbarWidth;
}

function closeModal() {
    $('.modal').fadeOut();
    $('.modal-overlay').fadeOut();
    turnOnScroll();
}

function turnOffScroll() {
    $('body').css({'padding-right': getScrollbarWidth() + 'px'});
    $('body').addClass('scroll-off');
}

function turnOnScroll() {
    $('body').css({'padding-right': 0});
    $('body').removeClass('scroll-off'); 
}

document.addEventListener("DOMContentLoaded", function() {
    
    $('[data-open]').click(function() {
        var target = this.dataset.open;
        $(target).fadeIn();
        $('.modal-overlay').fadeIn();  
        turnOffScroll();
    });
    
    $('.modal-overlay, .modal-close').click(function() {
        closeModal();
    });
    
    $('[data-to]').click(function(e){
        if(e.target.nodeName !== 'A') {
            var targetLevelId = this.dataset.to,
                currentLevel = this.closest('.catalog-nav__level'),
                targetLevel = document.querySelector('[data-level="' + targetLevelId + '"]');

                console.log(targetLevelId, currentLevel, targetLevel)
            currentLevel.classList.remove('active');
            targetLevel.classList.add('active');
        }
        return true;
    });
    
    $('.header__menu-catalog, .open-catalog').click(function(e) {
        e.preventDefault();
        var $catalogNav = $('.catalog-nav');
        if($catalogNav.hasClass('active')) {
            closeCatalogMenu();
        } else {
            openCatalogMenu();
        }
    });
    
    function openCatalogMenu() {
        $('.catalog-nav').addClass('active');
        $('.catalog-nav__bg').addClass('active');
        turnOffScroll();
    }
    
    function closeCatalogMenu() {
        $('.catalog-nav').removeClass('active');
        $('.catalog-nav__bg').removeClass('active');
        turnOnScroll();
    }
    
    $('.catalog-nav__bg').click(function(e) {
        closeCatalogMenu();
    });

  $('.header__menu-search').on('click', function() {
    $('#searchRow').css('display', 'flex')
    return false
  })

  $('#close-search').on('click', function() {
    $('#searchRow').css('display', 'none')
    return false
  })

  var body = document.querySelector("body");
  var allModals = document.querySelectorAll(".date-pick, .choose-city, .choose-city_popup, .delivery-info");

  var bodyAddDisabled = function bodyAddDisabled () {
    body.classList.add("disabled");
  };

  var bodyRemoveDisabled = function bodyRemoveDisabled () {
    body.classList.remove("disabled");
  };

  // if (window.innerWidth < 768) {
  //   document.querySelectorAll("input").forEach(function(input) {
  //     input.addEventListener("focus", function() {
  //       document.querySelector(".header").style.marginTop = "-500px";
  //     });
  //     input.addEventListener("blur", function() {
  //       document.querySelector(".header").style.marginTop = "0";
  //     });
  //   });
  // }

  document.addEventListener("keydown", function(e) {
    if (e.keyCode === 27) {
      allModals.forEach(function(modal) {
        modal.classList.remove("show");
      });
      bodyRemoveDisabled();
      closeCatalogMenu();
      closeModal();
    }
  }); // Hamburger menu settings

  $(".choose-city_popup-body-desctop").jScrollPane({
    verticalDragMinHeight: 63,
    verticalDragMaxHeight: 63,
  });

  var timeOut = undefined

  $('[name="choose-city"]').on('input', function() {
    var filterName = $(this).val()
    if (timeOut) {
      clearTimeout(timeOut)
    }
    timeOut = setTimeout(function() {
      $.get('/local/ajax/search_city.php?nameCity=' + filterName).then(function(responsive) {
        $('.choose-city_popup-search-items').html($(responsive).find('.choose-city_popup-search-items').children())
        $(".choose-city_popup-body-desctop").jScrollPane({
          verticalDragMinHeight: 63,
          verticalDragMaxHeight: 63,
        });
      })
    }, 500)
  });

  {
    var button = document.querySelector(".menu-btn");
    var menu = document.getElementById("mob-menu");
    var header = document.querySelector(".header");
    button.addEventListener("click", function(e) {
      e.preventDefault();
      button.classList.toggle("menu-btn-active");
      body.classList.toggle("disabled");
      menu.classList.toggle("show");
    }); // set new styles if scrolling down 
  } // Show search row in header

  {
    var _button2 = document.getElementById("nearDelivery");

    var modal = document.querySelector(".delivery-info");
    var closeBtn = document.querySelector(".delivery-info-close");

    _button2.addEventListener("click", function() {
      modal.classList.add("show");
      bodyAddDisabled();
    });

    modal.addEventListener("click", function(e) {
      if (e.target === modal) {
        modal.classList.remove("show");
        bodyRemoveDisabled();
      }
    });
    closeBtn.addEventListener("click", function(e) {
      modal.classList.remove("show");
      bodyRemoveDisabled();
    });
  }

  // {
  //   var closeButton = document.getElementById("close-search");
  //   var searchRow = document.getElementById("searchRow");
  //   searchRow.addEventListener("keyup", function() {
  //     searchRow.value === "" ? closeButton.classList.remove("show") : closeButton.classList.add("show");
  //   });

  //   closeButton.addEventListener("click", function() { 
  //     searchRow.value = "";
  //     closeButton.classList.remove("show");
  //   });
  // } // Notification window

  {
    var close = document.querySelectorAll(".closePopup");

    var _window = document.querySelector(".notification-popup");

    close.forEach(function(el) {
      el.addEventListener("click", function(e) {
        e.preventDefault();
        _window.style.display = "none";
      });
    });
  } // Set nearest delivery time !!

  {
    var cityBtn = document.getElementById("usersCity");
    var _modal = document.querySelector(".choose-city");
    var _submit = document.getElementById("citySubmit");
    var popup = document.querySelector(".choose-city_popup");
    var openPopupBtn = document.getElementById("chooseCity");
    var popupDesk = document.querySelector(".choose-city_popup-desk");
    var popupMob = document.querySelector(".choose-city_popup-mob");
    var closeButtons = document.querySelectorAll(".choose-city_popup-desk .close, .choose-city_popup-mob .close ");
    cityBtn.addEventListener("click", function() {
      _modal.classList.toggle("show");

      setPosition(cityBtn);
    });

    var setPosition = function setPosition (elem) {
      var position = elem.getBoundingClientRect(); // get position of elem

      _modal.style.top = position.top + 35 + "px";
      _modal.style.left = position.left + "px";
    };

    _submit.addEventListener("click", function() {
      _modal.classList.remove("show");
    });

    openPopupBtn.addEventListener("click", function(e) {
      e.preventDefault();

      _modal.classList.remove("show");

      popup.classList.add("show");
      bodyAddDisabled();
    });

    popup.addEventListener("click", function(e) {
      if (e.target == popup) {
        popup.classList.remove("show");
        bodyRemoveDisabled();
      }
    });

    closeButtons.forEach(function(el) {
      el.addEventListener("click", function() {
        el.parentElement.parentElement.classList.remove("show");
        bodyRemoveDisabled();
      });
    });

    body.addEventListener("click", function(e) {
      var target = e.target;

      if (!_modal.contains(target) && target !== cityBtn) {
        _modal.classList.remove("show");
      }
    });
  } // fixed checkout top line
});