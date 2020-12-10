(function(){
  function throttle(func, ms) {

    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) { 
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments); 

      isThrottled = true;

      setTimeout(function() {
        isThrottled = false; 
        if (savedArgs){
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

  function suggestKeyup() {
    var $this = $(this),
      query = $this.val(),
      suggestData = { // creating query object
        query: query,
        locations: [
          {region: 'москва'},
          {region: 'московская'},
        ],
        fias_level: 8,
      };
      suggestData = JSON.stringify(suggestData);
    $.ajax({
      url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      type: 'POST',
      contentType: 'application/json',
      data: suggestData,
      headers: {
        'Authorization': 'Token e6a0c28515d821dfd8e7af017ab582e228c1b4d5'
      },
    }).done(fillSuggestions);
  }

  function fillSuggestions(data) {
    console.log(data.suggestions);
    data.suggestions.forEach(suggest => {
      console.log(suggest);
    });
    var $suggestWrapper = $('.address_suggest');
    $suggestWrapper.fadeOut(150);
    $suggestWrapper.empty(); // clearing suggests
    if(data.suggestions.length) {
      data.suggestions.forEach(function(elem) { // filling 'em with new elements
        $suggestWrapper.append(`<div class="address_suggest-item" data-level="${elem.data.fias_level}"> `+ elem.value +'</div>');
      });
    } else {
      $suggestWrapper.append('<div class="address_suggest-item">Адрес не найден</div>');
    }

    $suggestWrapper.fadeIn(150);
  }

  $(document).ready(function() {
    var throttledKeyup = throttle(suggestKeyup, 600);

    $('.address-suggest-input').keyup(throttledKeyup); 

    $('.address_suggest').on('click', '.address_suggest-item', function() {
      $('.address-suggest-input').val(this.innerText);
      // Set FIAS_LEVEL to Input 
      $('.address-suggest-input').attr('data-level', `${$(this).attr('data-level')}`);
      $('.address_suggest').fadeOut(150);


      // show error if fias_level isn't equals 8
      if($('.address-suggest-input').attr('data-level') !== "8") {
        $('#checkHome').css("display", "block");
        $('.address-suggest-input').parent("label").addClass("error");
      } else if ($('.address-suggest-input').attr('data-level') === "8") {
        $('#checkHome').css("display", "none");
        $('.address-suggest-input').parent("label").removeClass("error");
  
      }
    });

    $(document).click(function(e){
      if(!e.target.classList.contains('address_suggest') || !e.target.classList.contains('address-suggest-input')) {
        $('.address_suggest').fadeOut(150);
      }
    });
  });
})();