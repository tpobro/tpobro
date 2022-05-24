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

 $('.productHeadline').append('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/></svg>');

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





