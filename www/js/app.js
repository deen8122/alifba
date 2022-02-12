$(document).on("pageshow", "#main", function (event) {
 

});


function play(){
    
    var audio = new Audio('a.mp3');
    audio.play();
}

(function ($, window) {
    $(InitApp);
}(jQuery, window));

//------------- ИНИЙИАЛИЗАЦИЯ -------------------
function InitApp() {
    console.log('InitApp()');
    db = new DB();
    db.SQL('CREATE TABLE IF NOT EXISTS DATA (id  INTEGER PRIMARY KEY,flag INT,  text TEXT,   img TEXT,created_time DATETIME DEFAULT CURRENT_TIMESTAMP,future_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',function(){});
    FastClick.attach(document.body);
    $.mobile.autoInitializePage = false;
    $.mobile.defaultPageTransition = 'none';
    $.mobile.touchOverflowEnabled = false;

    //

   //Bukvi_show();
   $('#content').css('min-height',$(window).height())
   $('.content').css('min-height',$(window).height())

  // $('.draggable').draggable();
   $btnPrev = $('#btn_prev');
    $btnNext = $('#btn_next');
    var audio = new Audio('audio/gui/pak.mp3');
    BtnPrevNextVisible(false);
    $btnPrev.click(function () {
       // audio.play();
    })
    $btnNext.click(function () {
        //audio.play();

    })
    $('.btn-click-rotate').click(function () {
        audio.play();

    })
    $('.btn-click-rotate').rotate({bind: {
            click: function () {
                $(this).rotate({
                    angle: 0,
                    animateTo: 360                  
                })
            }
        }
    }); 
}











// Cordova is loaded and it is now safe to make calls Cordova methods
function onDeviceReady() {
    //initPushwoosh();
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    navigator.splashscreen.hide();
    db = new DB();
  InitApp();
  
}

//--------------------------------------------------
$(document).on("pageshow", "#inbox", function (event) {
    db = new DB();
    CheckTodayMessage();
    UpdateMessageList();
    
});



//--------------------------------------------------
var a=0;var b=0;
$(document).on("pageshow", "#about", function (event) {
     set_ab();
    
});
function set_ab(){
     a =  parseInt(Math.random() * (10 - 1) + 1);
     b =  parseInt(Math.random() * (10 - 1) + 1);
     $('#a').html(a);
     $('#b').html(b);
}

function help(){
    var c = $('#c-value').val();
    if(c==''){
        $('#c-value').focus();
        alert('Яуап дөрөҫ түгел шул....');
        return;
    }
    c = parseInt(c);
    if( (a+b) != c){
         alert('Яуап дөрөҫ түгел шул....');
         return;        
    }
    $('#c-value').val('');
    set_ab();
    window.open("http://l2f.mybloknote.ru/pay.php?app=alifba", "_system");
}