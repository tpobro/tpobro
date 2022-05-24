import 'popper.js';
import 'bootstrap';
import '../script/calculation.js';
import '../script/rangeslider.js';
import '../scss/rangeslider.css';


var $ = require('jquery');
window.jQuery = $;
window.$ = $;

 $('.radioBtns').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>');

 $('.submitBtn').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>');


 var productType = $('#productSelector .radioBtns.active .productValue').val();
$('#productSelector .radioBtns').click(function () {
    setTimeout(function () {
        productType = $('#productSelector .radioBtns.active .productValue').val();
        if (productType == 0) {
            trimDuration(10, 50, 10);
        }

        if (productType == 1) {
            trimDuration(36, 72, 12);
        }
   
        calculateLoanContent(prodcuctPrice, $('.durationSlider').val(), productType);
    }, 50);
})


var prodcuctPrice = $('#productAmountSelector .radioBtns.active .productValue').val();

    var productName = $("#productAmountSelector .radioBtns.active .productValue").attr("name");

$('#productAmountSelector .radioBtns').click(function () {
    setTimeout(function () {
        var productName = $("#productAmountSelector .radioBtns.active .productValue").attr("name");

       // productName = $('#productAmountSelector .radioBtns.active .productValue');
        console.log('prodcuctType ::: ', productName);
        $('.loanAmountWrapper .productNameText').html('Samlet pris for '+ productName);
        prodcuctPrice = $('#productAmountSelector .radioBtns.active .productValue').val();
        calculateLoanContent(prodcuctPrice, $('.durationSlider').val(), productType);
    }, 50);
})



setTimeout(function () {


    $('.durationSlider').rangeslider({

        polyfill: false,


        // Callback function
        onInit: function (position, value) {

            calculateLoanContent(prodcuctPrice, $('.durationSlider').val(), productType);
            $('.durationSelector').val(value);

        },

        // Callback function
        onSlide: function (position, value) {
            calculateLoanContent(prodcuctPrice, $('.durationSlider').val(), productType);
        },

        // Callback function
        onSlideEnd: function (position, value) {
            $('.durationSelector').val(value);
            //    if ($('.loanAmountSlider').val() >= 0 && $('.loanAmountSlider').val() < 100000) {
            //       trimDuration(96);
            //   } else if ($('.loanAmountSlider').val() >= 100000 && $('.loanAmountSlider').val() < 150000) {
            //       trimDuration(120);
            //   } else if ($('.loanAmountSlider').val() >= 150000) {
            //       trimDuration(144);

            //   } 
        }
    });

}, 100);

var $r = $('.durationSlider');

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}

if (isMobile.any()) {
    $(".sliderLoanInfoMobile").insertBefore(".calculationSlider");
    $(".loanInfoMobile").insertBefore(".calculationSlider");


}

// Calculation 

function trimDuration(mixRange, maxRange, interval) {

    var getCurrentDuration = $('.durationSlider').val();

    if (getCurrentDuration > maxRange) {
        getCurrentDuration = maxRange;
    } else {
        getCurrentDuration = $('.durationSlider').val();
    }

    $('.durationSlider', function (e) {
        var value = getCurrentDuration;
        var attributes = {
            min: mixRange,
            max: maxRange,
            step: interval
        };

        $r.attr(attributes);
        $r.val(value).change();
        $r.rangeslider('update', true);
    });
    $('.loanDurationTextLeft').html(mixRange + ' mdr.');
    $('.loanDurationTextRight').html(maxRange + ' mdr.');
}





