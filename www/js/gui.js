var $btnPrev = null;
var $btnNext = null;
$(document).on("pageshow", "#main", function (event) {
    
    
    
});

function BtnPrevNextVisible(f) {
    if (f) {
        $btnPrev.fadeIn(500);
        $btnNext.fadeIn(500);
    } else {
        $btnPrev.fadeOut(500);
        $btnNext.fadeOut(500);
    }

}

function BtnPrev_setOnclick() {

}


