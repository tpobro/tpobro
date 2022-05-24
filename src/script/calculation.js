var interests = 0.000001;
var invoiceFee;
var debitorInterest = "9,95";
var startUpFee = 1;
var totalCreditCostPrMonth = 0;
var monthlyInterest = interests / 12;
var totalCreditCost = null;
var totalCreditCost = null;
var hovedStol = null;
var loanAmount = 50000;
var loanDurationInMonths;
var totalPaybackAmount;

function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
   

// if (isNaN(parseInt(loanAmount)) || isNaN(parseInt(loanDurationInMonths))) {
//         calculateLoanContent(50000, 72);
// } else {
//         calculateLoanContent(parseInt(loanAmount), parseInt(loanDurationInMonths));
// }

	

window.calculateLoanContent = function (loanAmount, loanDuration, getProductType) {

    console.log(loanAmount, loanDuration, getProductType)

    $('.durationText').html(loanDuration + ' mdr.');
   
   var hovedstol = loanAmount * startUpFee;

   if(getProductType == 0){
    interests = 0.000001;
    invoiceFee = 0;
    startUpFee = 1;
}else {
    if(loanAmount >= 48000){
        invoiceFee = 129;
    }else {
        invoiceFee = 99;
    }
    interests = 0.000001;
    startUpFee = 1.03;


}

    
    monthlyInterest = interests / 12;
    var tempInterest = interests / 12 * 100;
    tempInterest = Math.round(tempInterest * 100) / 100 + interests * 100;
    totalCreditCostPrMonth = hovedstol * monthlyInterest / (1 - (Math.pow((1 + monthlyInterest), -loanDuration))) + invoiceFee;
    totalCreditCost = Math.round(totalCreditCostPrMonth * loanDuration - loanAmount);
    totalPaybackAmount = addDot(parseInt(totalCreditCost) + parseInt(loanAmount));
    var yearlyCostRateClean = irr(loanAmount, totalCreditCostPrMonth, loanDuration);
    var yearlyCostRate = Number(yearlyCostRateClean * 100).toFixed(2);
    var totalCreditCostPrMonth = Math.round(totalCreditCostPrMonth);

   var loanAmountInput = loanAmount;
   var loanDurationInput = loanDuration;


    // console.log(' Løbetid               ', loanDuration);
    // console.log(' Lånebeløb             ', addDot(loanAmount));
    // console.log(' ÅOP                   ', yearlyCostRate.replace('.', ','));
    // console.log(' MDL ydelse            ', addDot(totalCreditCostPrMonth));
    // console.log(' ___________________________________ ');
    // console.log(' Tilbagebetalingsbeløb ', totalPaybackAmount);
    // console.log(' Saml. kreditomk       ', addDot(totalCreditCost));
    // console.log(' ___________________________________ ');


    var testOutput = 'Løbetid: '+ loanDuration+'<br>Lånebeløb: '+ addDot(loanAmount)+'<br>Månedsgebyr '+invoiceFee+' kr.<br>Nom. rente : '+interests/12*100+' %<br>Stift:'+Number((100*startUpFee)-100)+' %<br>===========================<br>ÅOP: '+ yearlyCostRate.replace('.', ',')+'<br>MDL ydelse: '+addDot(totalCreditCostPrMonth)+' kr.<br>Tilbagebetalingsbeløb: '+ totalPaybackAmount+' kr.<br>Saml. kreditomk: '+addDot(totalCreditCost)+' kr.';
   // $('body').append(testOutput);

    window.$('.totalMonthlyAmount').val(addDot(totalCreditCostPrMonth)+ ' kr.');
    window.$('.loanDuration').val(loanDuration+' mdr.');
    window.loanAmount = loanAmount;
    window.loanDuration = loanDuration;
    window.$('.loanAmount').val(addDot(totalCreditCostPrMonth)+' kr.');
    window.$('.productPrice').text(addDot(loanAmount)+' kr.');


    

    //window.$('.additionalLoanAmount').val(addDot(loanAmount));
    var setLoanInfoTab = "Mit lån på "+addDot(loanAmount)+" kr. i "+loanDuration+" mdr. ";
    window.$('.loanInfoTab').text(setLoanInfoTab);
    //$('.dynamicDisclaimer').html('Årlig variabel debitorrente ' + debitorInterest+'%. Samlet kreditbeløb ' + addDot(loanAmountInput) + ' kr. ÅOP ' + yearlyCostRate.replace('.', ',') + '%. Samlet beløb, der skal betales tilbage er ' + totalPaybackAmount + ' kr. Samlede kreditomkostninger ' + addDot(totalCreditCost) + ' kr.<br>Beregningen er vejledende og forudsætter, at lånet udbetales til en konto i et pengeinstitut og at tilbagebetaling foregår via BS. Den faktiske rentesats oplyses først, når ansøgningen er godkendt.');

    $('.interest').text(debitorInterest+'%');
    $('.yearlyInterest').text(yearlyCostRate.replace('.', ',')+'%');
    $('.totalPayback').text(totalPaybackAmount+' kr.');
    $('.totalCreditCost').text(addDot(totalCreditCost)+' kr.');
    $('.monthlyPayment').text(addDot(totalCreditCostPrMonth)+' kr.')

  //$('.dynamicDisclaimer').html('Årlig variabel debitorrente ' + debitorInterest+'%. Samlet kreditbeløb ' + addDot(loanAmountInput) + ' kr. ÅOP ' + yearlyCostRate.replace('.', ',') + '%. Samlet beløb, der skal betales tilbage er ' + totalPaybackAmount + ' kr. Samlede kreditomkostninger ' + addDot(totalCreditCost) + ' kr.<br>Beregningen er vejledende og forudsætter, at lånet udbetales til en konto i et pengeinstitut og at tilbagebetaling foregår via BS. Den faktiske rentesats oplyses først, når ansøgningen er godkendt.');

  
var calculationText = 'Ved et samlet kreditbeløb på '+addDot(loanAmount)+' kr. over '+loanDuration+' mdr.: Månedlig ydelse '+addDot(totalCreditCostPrMonth)+' kr. Samlede kreditomkostninger '+addDot(totalCreditCost)+' kr. Samlet tilbagebetaling '+totalPaybackAmount+'kr. Årlig fast debitorrente 0,00%. ÅOP '+yearlyCostRate.replace('.', ',')+'%.<br>Lånet kræver kreditgodkendelse. Der er fortrydelsesret. Forudsætter betaling via Mit Sparxpres.'
$('.dynamicDisclaimer').html(calculationText);
}


function replaceComma(nStr, addZero) {
    nStr = nStr.replace(".", ",");
    return nStr;
}

function irr(loanamountToIrr, amortization, periods) {
    var p = 1;
    var tmp = 1;
    var a = p;
    var b = 0;

    while (Math.abs(tmp) > 0.0001) {
        p = (a - b) / 2 + b;
        tmp = (loanamountToIrr / amortization) - (1 - Math.pow(1 + p, -periods)) / p;
        if (tmp > 0) {
            a = p;
        } else {
            b = p;
        }
    }
    var irr = Math.pow((1 + p), 12) - 1;
    return irr;
}

function addDot(nStr, addZero) {
    nStr += '';
    nStr = nStr.replace('.', ',')
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    var returnstring = x1 + x2;
    if (addZero) {
        if (returnstring.indexOf(",") == -1) {
            returnstring += ",00";
        }
    }
    return returnstring;
}
