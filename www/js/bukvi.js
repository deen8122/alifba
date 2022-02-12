$(document).on("pageshow", "#bukvi", function (event) {
Bukvi_show();

});


function btn_next(){
    BUKVA_CURRENT++;
    if(BUKVA_CURRENT >= BUKVA1.length)BUKVA_CURRENT = BUKVA1.length-1;
    Bukva_page_show();
}
function btn_prev(){
    
    BUKVA_CURRENT--;
    if(BUKVA_CURRENT < 0)BUKVA_CURRENT = 0;
    Bukva_page_show();
}

function Bukvi_show(){
     BtnPrevNextVisible(false);
    var text = '';
     text+='<div class="bukva-list">';
     //42
     var k = 0;

    for(var i = 0; i < BUKVA1.length; i++){
        k++;
        text+='<a onclick="Bukva_open('+i+')" class="btn-click-rotate bukva_list bgc-'+i+'" style="opacity:0">\n\
                      <img class="layer1" src="images/'+BUKVA1[i][0][0]+'">\n\
                </a>';
        if(k==5){
            k = 0;
            text+='<div style="clear:both"></div>';
        }
    }
   text+='</div>';
    $('#content').html(text);
    var delay = 0;
    $('.bukva_list').each(function(){
        $(this).css('opacity',0);
        var _this = $(this);
        delay+=20;
        setTimeout(function(){
            $(_this).animate({
    opacity: 1,
  }, 500, function() {
   $(this)
  })
        },delay);
    });
   //  $('.draggable').draggable();
}

function Bukva_open(i){
    BUKVA_CURRENT = i;
    BtnPrevNextVisible(true);
        var delay = 0;
$('#content').animate({opacity: 0,}, 500, function() {
    Bukva_page_show();
}) 
    

    

}

var BUKVA_CURRENT = 0;
function Bukva_page_show(){
    var bukva = BUKVA1[BUKVA_CURRENT];
    $('#content').html('<img src="images/'+bukva[0][0]+'" class="animate-hidden-left bukva-detail-img-bukva pic1">');
    $('#content').append('<img src="images/'+bukva[1][0]+'" class="animate-hidden-right pic2">');
    //$('#content').append('<img src="images/'+bukva[2][0]+'" class="animate-hidden-left pic3">');
    $('#content').animate({opacity: 1,}, 100, function() {
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        
        var img1Widht = $('.bukva-detail-img-bukva').width();
        var img1Height = $('.bukva-detail-img-bukva').height();
        var correctW = 0;
        if(img1Widht > screenWidth/2){
            correctW = img1Widht - screenWidth/2;
        }
        $('.bukva-detail-img-bukva').css('top',screenHeight/2-img1Height - 50);
        $('.bukva-detail-img-bukva').css('left',screenWidth/2-correctW - 60);
       
        
         var audio = new Audio('audio/bukvi/'+bukva[0][1]+'');
    audio.play();


      setTimeout(function(){  
          var audio2 = new Audio('audio/bukvi-slova/'+bukva[1][1]+'');
   // audio2.play(); 
},1000);
        setTimeout(function(){
        var img1Widht = $('.pic2').width();
        $('.pic2').css('top',screenHeight/2);
        var correctW = 0;
        if(img1Widht > screenWidth/2){
            correctW = img1Widht - screenWidth/2;
        }
            $('.pic2').css('right',screenWidth/2-img1Widht/2);
        },1000);
        /*
        setTimeout(function(){
                 var img1Widht = $('.pic3').width();
        var correctW = 0;
        if(img1Widht > screenWidth/2){
            correctW = img1Widht - screenWidth/2;
        }
            $('.pic3').css('left',screenWidth/2-correctW-60);
        },1000);
        */
    }) 
}


function bukva_list_hide(){
    
}


