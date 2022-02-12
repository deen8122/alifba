var colors;
var COLORS = [
    //кояш
    [ 'yellow','others/sun.png'],//+
    [ 'red','foods/вишня.png'],//+
    [ 'blue','color/синие сапоги.png'],
    
    [ 'green','foods/зеленое яблоко.png'],//+
    [ 'orange','color/апельсин.png'],    
    [ 'violet','color/фиолетовые цветы.png'],//Violet – Фиолетовый
    
     [ 'black','animals/cat.png'],//
     [ 'gray','color/серый волк.png'],//+
     [ 'pink','color/pink-dress.png'],//+
     
      [ 'cyan','color/чашка.png'],//
     [ 'brown','animals/медведь.png'],//
     [ 'green-dark','color/елка.png'],//

    
];

$(document).on("pageshow", "#colors", function (event) {
    colors = new Colors;
    colors.ShowAllColors();

});

function Colors() {

}

Colors.prototype.init = function () {}

Colors.prototype.btn_next = function () {
    BUKVA_CURRENT++;
    if (BUKVA_CURRENT >= BUKVA1.length)
        BUKVA_CURRENT = BUKVA1.length - 1;
    Bukva_page_show();
}

Colors.prototype.btn_prev = function () {
    BUKVA_CURRENT--;
    if (BUKVA_CURRENT < 0)
        BUKVA_CURRENT = 0;
    Bukva_page_show();
}


Colors.prototype.ShowAllColors = function () {
    BtnPrevNextVisible(false);
    var text = '';
    var style='';
    text += '<div class="colors-list">';
    for (var i = 0; i < COLORS.length; i++) {
        style =' opacity:0;transform:scale(0);';
        text += '<img titlle="' + COLORS[i][0] + '" class="colors-list-img" onclick="colors.ShowDetail(' + i + ',this)"  style="' + style + '" src="images/color/' + COLORS[i][0] + '.png">';
    }
    text += '<div style="clear:both"></div></div>';
    $('#content-color').html(text);
    var delay = 0;
    $('.colors-list img').each(function () {
        $(this).css('opacity', 0);
        var _this = $(this);
        delay += 20;
        setTimeout(function () {
            $(_this).css('transform','scale(1)');
            $(_this).animate({
                opacity: 1,
            }, 500, function () {
                $(this)
            })
        }, delay);
        
        
    });
   $('.colors-list-img').rotate({bind: {
            click: function () {
                $(this).rotate({
                    angle: 0,
                    animateTo: 360                  
                })
            }
        }
});

}


Colors.prototype.ShowDetail = function(i,elem) {
    var color = COLORS[i];
    $('.color-overlay').html('<img src="images/' + color[1] + '" class="color-img">').css('left','0');
    
      var audio = new Audio('audio/color/'+color[0]+'.mp3');
    audio.play();
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        var img1Height = $('.color-img').height();
        //console.log(img1Height);
       // $('.color-img').css('margin-top', screenHeight / 2 - img1Height);
}
Colors.prototype.closeDetail = function() {
    $('.color-overlay').css('left','100%');

}




