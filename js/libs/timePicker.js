(function(document){
    function cache(key, value){
        if (typeof value == 'undefined') {
            return cache[key];
        }
        cache[key] = value;
    }

    function initDatePicker() {
        var today = new Date(),
            tomorrow = new Date(today),
            currentHour = today.getHours(),
            currentMinutes = today.getMinutes(),
            allowedTime = '18:30',
            allowedTimeArray = allowedTime.split(':'),
            allowedTimeSeconds = allowedTimeArray[0] * 3600 + allowedTimeArray[1] * 60,
            currentTimeSeconds = currentHour * 3600 + currentMinutes * 60;

        tomorrow.setDate(today.getDate() + 1);
        var minDate = currentTimeSeconds > allowedTimeSeconds ? tomorrow : today;
        var element = document.querySelector(".date-pick-body .date-pick-calendar"); // body in popup window 
        // calendar
        $('#select_date').flatpickr({
            enableTime: false,
            dateFormat: 'd.m.Y',
            minDate: minDate,
            allowInput: true,
            position: 'above',
            disableMobile: true,
            appendTo: element,
            shorthandCurrentMonth: true,
            locale:  {
                'firstDayOfWeek': 1,
                
            },
            "locale": "ru",
        });
        // cut off from function.min.js
        // o("#select_date").flatpickr({enableTime:!1,dateFormat:"d.m.Y",minDate:"today",allowInput:!0,position:"above",disableMobile:!0,locale:{firstDayOfWeek:1}})
    }

    _c_qs = function(selector) {
        if (!cache(selector)) { 
            cache(selector, document.querySelector(selector));
        }
        return cache(selector);
    }

    _c_qsa = function(selector) {
        if (!cache(selector)) { 
            cache(selector, document.querySelectorAll(selector));
        }
        return cache(selector);
    }

    document.addEventListener('DOMContentLoaded', function(){    
        initDatePicker();
        function markHours() {
            var avaliableHours = [9,10,11,12,13,14,15,16,17,18,19,20,21],
                hourOffset = 3,
                date = new Date(),
                nowHour = date.getHours(),
                optionsArray = document.querySelectorAll('.pickTime__item');
                
            if (_c_qs('#select_date').value) {
                var datePVal = _c_qs('#select_date').value,
                    datePDay = parseInt(datePVal.slice(0,2)),
                    datePMonth = parseInt(datePVal.slice(3,5)) - 1, // неизвестно почему, но в дату ставится следующий месяц
                    datePYear = parseInt(datePVal.slice(6,10)),
                    datePDate = new Date(datePYear, datePMonth, datePDay);
                if(date.getDay() != datePDate.getDay() || date.getMonth() != datePDate.getMonth()) {
                    nowHour = datePDate.getHours();
                }
            }

            avaliableHours.forEach(function(elem, index) {
                if(elem <= (nowHour + hourOffset)) {
                    optionsArray[index].classList.add('disabled');
                } else {
                    optionsArray[index].classList.remove('disabled');
                }
            });
        }

        markHours();

        var timeInput = _c_qs('.pickTime__input');
        timeInput.addEventListener('click', function(){
            var optionsWrapper = this.nextElementSibling;
            markHours();
            optionsWrapper.classList.add('active');
        });

        var timeOptions = _c_qsa('.pickTime__item');
        timeOptions.forEach(function(elem){
            elem.addEventListener('click', function(){
                if(!this.classList.contains('disabled')) {
                    var wrapper = this.closest('.pickTime__options'),
                        input = wrapper.previousElementSibling;
                    input.value = this.innerText;
                    wrapper.classList.remove('active');
                }
            });
        });

        document.addEventListener('click', function(e) {
            if(!e.target.classList.contains('pickTime__input') && !e.target.classList.contains('pickTime__options')) {
                _c_qsa('.pickTime__options').forEach(function(elem){
                    elem.classList.remove('active');
                });
            }
        });
    });
})(document);