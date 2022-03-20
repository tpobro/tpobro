import 'popper.js';
import 'bootstrap';
import '../script/calculation.js';
import '../script/rangeslider.js';
import '../scss/rangeslider.css';


var $ = require('jquery');
window.jQuery = $;
window.$ = $;


var productType = $('#productSelector .radioBtns.active .productValue').val();
$('#productSelector .radioBtns').click(function () {
    setTimeout(function () {

        productType = $('#productSelector .radioBtns.active .productValue').val();
        if (productType == 0) {
            trimDuration(10, 60, 10);
        }

        if (productType == 1) {
            trimDuration(36, 72, 12);
        }
   
        calculateLoanContent(prodcuctPrice, $('.durationSlider').val(), productType);
    }, 50);
})


var prodcuctPrice = $('#productAmountSelector .radioBtns.active .productValue').val();

    var productName = $("#productAmountSelector .radioBtns.active .productValue").attr("name");
$('.loanAmountWrapper .productNameText').html('Samlet pris for '+ productName);

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





