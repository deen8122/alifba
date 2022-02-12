/*
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);



function alert2(title, conf){
    $('#alert').attr('class','');
    $('#alert').addClass('layer');
//layer-theme-4
    if(conf != undefined){
          $('#alert').addClass('layer-theme-'+conf.theme);
    }else {
        
         $('#alert').addClass('layer-theme-4');
    } 
     ShowLayer('alert');
    $('#alert_text').html(title);
}


function Controller(){
    
    
    $('#layer-right').css('left',0);
}
 /*
  * Отправка сообщения в будущее
  * @returns {Boolean}
  */
function Send(){
   var message = $('#message').val();
   var date = $('#date').val();
   //alert(message);
  // console.log(message);
  // return false;
   if(message.length<2){ ShowLayer('empty_message');return false; }
   if(date===''){     ShowLayer('empty_date');return false;}
   var time = $('#time').val();
   console.log('-------');
   console.log(time);
   if(time == 'NaN' || time == '' || time == undefined){
    time ='00:01';
}
 console.log(time);
   //alert(date);
    var timestump = DateToTimestump(date,time);
console.log(timestump);
    $('.layer-succes1').css('right',0);
    $('.layer-succes2').css('bottom',0);
    $('.layer-succes3').css('left',0);
    $('.layer-succes4').css('top',0);
    
    
    setTimeout(function(){$('.layer-succes-message').fadeIn(200)},500); 
    //alert(timestump)
   db.insertData({text:message , flag:1,date:timestump} , function(data){console.log('ok')});
   $('#message').val('');  
   window.localStorage.setItem("is_updated", 0);
   SynStart();
  // SynStart();
}

function hideLeftBlock(id, val) {
    window.localStorage.setItem(id, val);
    $('#' + id).hide(50);
}
/*
 * Функция для синхронизации записей.
 * Не отправленные отправялет на сервер.
 * Если по каким либо причинам, непрочтенных записей  на телефоне меньше чем на сервере,  закачивает на телефон.
 */
function synStart(){
    
    
}
function DateToTimestump(date,time2){ 
    console.log(date);
    console.log(time2);
var myDate=date.split("-");

var time =time2.split(":");

//var newDate=myDate[1]+","+myDate[2]+","+myDate[0]+","+time[0]+","+time[1];
var newDate=myDate[0]+","+myDate[1]+","+myDate[2]+","+time[0]+","+time[1];
console.log(newDate);
//alert(newDate);
var y = parseInt(myDate[0]);
var m = parseInt(myDate[1])-1;
var d = parseInt(myDate[2]);
var h = parseInt(time[0]);
var min = parseInt(time[1]);
console.log(y);
console.log(m);
console.log(d);
return new Date(y,m,d,h,min).getTime();
   // return new Date(newDate).getTime();
}
function ShowLayer(cmd){
var l = $('#'+cmd);

if(l.data('pos') === 'right'){
    console.log(l.data('pos'));
    l.css('right',0); 
}else{
l.css('left',0);
}
}

function SucessHide(){
    $('.layer-succes-message').fadeOut(200);
     setTimeout(function(){
           $('.layer-succes1').css('right','100%');
    $('.layer-succes2').css('bottom','100%');
    $('.layer-succes3').css('left','100%');
    $('.layer-succes4').css('top','100%'); 
         
     },500);
 
    
}




//Проверяет есть ли записи на сегодня.
function CheckTodayMessage(){
     console.log('CheckTodayMessage');
    var timeStamp = Math.floor(Date.now());
    db.SQL("SELECT * FROM DATA WHERE future_time<="+timeStamp+" AND flag=1" , function(row){
         console.log(row);
         if(row.length>0){
             
             $('#inbox-col').html('('+row.length+')');
         }
    })
}
   
   
   
function AllMessagesNoReadedDatail(){
    var timeStamp = Math.floor(Date.now());
    db.SQL("SELECT future_time FROM DATA WHERE future_time>"+timeStamp+"  AND future_time!='NaN' ORDER BY future_time ASC" , function(row){
        console.log(row);
        if(row.length>0){
            var obj = row.item(0);
          var text='<p>Следующее письмо придет:<br/> <b> '+getNormalDate(obj.future_time)+'</b></p>';
              obj = row.item( row.length - 1);
              text+='<p>Последнее письмо придет: <br/><b>'+getNormalDate(obj.future_time)+'</b></p>';
             // text+='<p>В этом месяце писем: </p>';
          alert2(text,{theme:'white small-text'});
    }
    })
    
     
}
 //Проверяет есть ли записи на сегодня.
function CheckAllMessagesNoReaded(){
     ///console.log('CheckAllMessagesNoReaded...');
      $('#inbox_content_cols').html('');
    var timeStamp = Math.floor(Date.now());
    db.SQL("SELECT * FROM DATA WHERE future_time>"+timeStamp+"" , function(row){
        if(row.length>0){
        $('#inbox_content_cols').html('<a class="noreaded" onclick="AllMessagesNoReadedDatail()">Недоставленных писем: <b>'+row.length+'</b> <span>подробнее</span></a>');
    }else {
         $('#inbox_content_cols').html('');
    }
    })
}

function setFutureTime(){
    var timeMonth = $('#futuretime').val();
    
    if(timeMonth == 'tomorrow'){
          var today = new Date();
         var month = dateAdd(today,'day', 1);
        $('#date').val(month.toISOString().substr(0, 10)); 
    }
    else if(timeMonth == 'week1'){
          var today = new Date();
         var month = dateAdd(today,'day', 7);
        $('#date').val(month.toISOString().substr(0, 10)); 
    }else{
        var today = new Date();
        console.log(timeMonth);
         var month = dateAdd(today,'month', parseInt(timeMonth));
         console.log(month);
        $('#date').val(month.toISOString().substr(0, 10)); 
    }
}

function dateAdd(date, interval, units) {
  var ret = new Date(date); //don't change original date
  var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
  switch(interval.toLowerCase()) {
    case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
    case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
    case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
    case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
    case 'day'    :  ret.setDate(ret.getDate() + units);  break;
    case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
    case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
    case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
    default       :  ret = undefined;  break;
  }
  return ret;
}

//Возращает читаемый вид даты из timestamp
function getNormalDate(date){
     var ret = new Date(date);
     var month = ['января'  ,'февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
     // сколонение месяцев.
     var day = ret.getDate();
     var hour = ret.getHours();
     if(hour < 10)hour ='0'+hour;
      var min = ret.getMinutes();
     if(min < 10)min ='0'+min;
    // if(day <)
     return day +' '+month[ret.getMonth()]+' '+ret.getFullYear()+ ' в '+hour+':'+min;
}



function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

function ExitApp() {
    if (typeof cordova !== 'undefined') {
        if (navigator.app) {
            navigator.app.exitApp();
        } else if (navigator.device) {
            navigator.device.exitApp();
        }
    } else {
        window.close();
        
    }
}



function testInternet(win,fail){
    $.get("https://www.google.com/blank.html").done(win).fail(fail);
}

function GetTimeStamp() {
    var now = new Date();
    var day = now.getDate();
    if (day < 10)
        day = "0" + day;

    var hours = now.getHours();
    if (hours < 10)
        hours = "0" + hours;

    var Month = (now.getMonth() + 1);
    if (Month < 10)
        Month = "0" + Month;
    var date =
            now.getFullYear()
            + '-' + Month
            + '-' + day + ' '
            + hours
            + ':' + (now.getMinutes())
            + ':' + (now.getSeconds());
    //   console.log(date);
    return date;
}


 function check_email(email,_this){
     if(email != '') {
            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if(pattern.test(email)){
                $(_this).css({'border' : '1px solid #569b44'});
               // alert('Верно');
               return true;
            } else {
                $(_this).css({'border' : '1px solid #ff0000'});
                alert2('Мне кажется что email не корректный. (@_@)');
                return false;
            }
        } else {
            $(_this).css({'border' : '1px solid #ff0000'});
            alert2('Поле email не должно быть пустым');
            return false;
        }
        return true;
 }  
 
 function ClearData(){
     console.log('ClearData');
     db.SQL('DELETE  FROM DATA',function(){console.log('DELETED ALL DATA FROM DATA');});
 }
 
 function Buy_CheckFullVersion(){
     var full_version = window.localStorage.getItem("full_version");
    if(full_version == 1){
        //hide_in_full_version
         $('.hide_in_full_version').hide();
         $('.show_in_full_version').show();
    }else {
         $('.hide_in_full_version').show();
         $('.show_in_full_version').hide();
    }
 }
 
 
 
 // VERSION: 2.3 LAST UPDATE: 11.07.2013
/*
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
 * Website: http://jqueryrotate.com
 */

(function($) {
    var supportedCSS,supportedCSSOrigin, styles=document.getElementsByTagName("head")[0].style,toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
    for (var a = 0; a < toCheck.length; a++) if (styles[toCheck[a]] !== undefined) { supportedCSS = toCheck[a]; }
    if (supportedCSS) {
      supportedCSSOrigin = supportedCSS.replace(/[tT]ransform/,"TransformOrigin");
      if (supportedCSSOrigin[0] == "T") supportedCSSOrigin[0] = "t";
    }

    // Bad eval to preven google closure to remove it from code o_O
    eval('IE = "v"=="\v"');

    jQuery.fn.extend({
        rotate:function(parameters)
        {
          if (this.length===0||typeof parameters=="undefined") return;
          if (typeof parameters=="number") parameters={angle:parameters};
          var returned=[];
          for (var i=0,i0=this.length;i<i0;i++)
          {
            var element=this.get(i);
            if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {

              var paramClone = $.extend(true, {}, parameters);
              var newRotObject = new Wilq32.PhotoEffect(element,paramClone)._rootObj;

              returned.push($(newRotObject));
            }
            else {
              element.Wilq32.PhotoEffect._handleRotation(parameters);
            }
          }
          return returned;
        },
        getRotateAngle: function(){
          var ret = [0];
          for (var i=0,i0=this.length;i<i0;i++)
          {
            var element=this.get(i);
            if (element.Wilq32 && element.Wilq32.PhotoEffect) {
              ret[i] = element.Wilq32.PhotoEffect._angle;
            }
          }
          return ret;
        },
        stopRotate: function(){
          for (var i=0,i0=this.length;i<i0;i++)
          {
            var element=this.get(i);
            if (element.Wilq32 && element.Wilq32.PhotoEffect) {
              clearTimeout(element.Wilq32.PhotoEffect._timer);
            }
          }
        }
    });

    // Library agnostic interface

    Wilq32=window.Wilq32||{};
    Wilq32.PhotoEffect=(function(){

      if (supportedCSS) {
        return function(img,parameters){
          img.Wilq32 = {
            PhotoEffect: this
          };

          this._img = this._rootObj = this._eventObj = img;
          this._handleRotation(parameters);
        }
      } else {
        return function(img,parameters) {
          this._img = img;
          this._onLoadDelegate = [parameters];

          this._rootObj=document.createElement('span');
          this._rootObj.style.display="inline-block";
          this._rootObj.Wilq32 =
            {
              PhotoEffect: this
            };
          img.parentNode.insertBefore(this._rootObj,img);

          if (img.complete) {
            this._Loader();
          } else {
            var self=this;
            // TODO: Remove jQuery dependency
            jQuery(this._img).bind("load", function(){ self._Loader(); });
          }
        }
      }
    })();

    Wilq32.PhotoEffect.prototype = {
      _setupParameters : function (parameters){
        this._parameters = this._parameters || {};
        if (typeof this._angle !== "number") { this._angle = 0 ; }
        if (typeof parameters.angle==="number") { this._angle = parameters.angle; }
        this._parameters.animateTo = (typeof parameters.animateTo === "number") ? (parameters.animateTo) : (this._angle);

        this._parameters.step = parameters.step || this._parameters.step || null;
        this._parameters.easing = parameters.easing || this._parameters.easing || this._defaultEasing;
        this._parameters.duration = 'duration' in parameters ? parameters.duration : parameters.duration || this._parameters.duration || 1000;
        this._parameters.callback = parameters.callback || this._parameters.callback || this._emptyFunction;
        this._parameters.center = parameters.center || this._parameters.center || ["50%","50%"];
        if (typeof this._parameters.center[0] == "string") {
          this._rotationCenterX = (parseInt(this._parameters.center[0],10) / 100) * this._imgWidth * this._aspectW;
        } else {
          this._rotationCenterX = this._parameters.center[0];
        }
        if (typeof this._parameters.center[1] == "string") {
          this._rotationCenterY = (parseInt(this._parameters.center[1],10) / 100) * this._imgHeight * this._aspectH;
        } else {
          this._rotationCenterY = this._parameters.center[1];
        }

        if (parameters.bind && parameters.bind != this._parameters.bind) { this._BindEvents(parameters.bind); }
      },
      _emptyFunction: function(){},
      _defaultEasing: function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b },
      _handleRotation : function(parameters, dontcheck){
        if (!supportedCSS && !this._img.complete && !dontcheck) {
          this._onLoadDelegate.push(parameters);
          return;
        }
        this._setupParameters(parameters);
        if (this._angle==this._parameters.animateTo) {
          this._rotate(this._angle);
        }
        else {
          this._animateStart();
        }
      },

      _BindEvents:function(events){
        if (events && this._eventObj)
        {
          // Unbinding previous Events
          if (this._parameters.bind){
            var oldEvents = this._parameters.bind;
            for (var a in oldEvents) if (oldEvents.hasOwnProperty(a))
              // TODO: Remove jQuery dependency
              jQuery(this._eventObj).unbind(a,oldEvents[a]);
          }

        this._parameters.bind = events;
        for (var a in events) if (events.hasOwnProperty(a))
          // TODO: Remove jQuery dependency
          jQuery(this._eventObj).bind(a,events[a]);
        }
      },

      _Loader:(function()
      {
        if (IE)
          return function() {
            var width=this._img.width;
            var height=this._img.height;
            this._imgWidth = width;
            this._imgHeight = height;
            this._img.parentNode.removeChild(this._img);

            this._vimage = this.createVMLNode('image');
            this._vimage.src=this._img.src;
            this._vimage.style.height=height+"px";
            this._vimage.style.width=width+"px";
            this._vimage.style.position="absolute"; // FIXES IE PROBLEM - its only rendered if its on absolute position!
            this._vimage.style.top = "0px";
            this._vimage.style.left = "0px";
            this._aspectW = this._aspectH = 1;

            /* Group minifying a small 1px precision problem when rotating object */
            this._container = this.createVMLNode('group');
            this._container.style.width=width;
            this._container.style.height=height;
            this._container.style.position="absolute";
            this._container.style.top="0px";
            this._container.style.left="0px";
            this._container.setAttribute('coordsize',width-1+','+(height-1)); // This -1, -1 trying to fix ugly problem with small displacement on IE
            this._container.appendChild(this._vimage);

            this._rootObj.appendChild(this._container);
            this._rootObj.style.position="relative"; // FIXES IE PROBLEM
            this._rootObj.style.width=width+"px";
            this._rootObj.style.height=height+"px";
            this._rootObj.setAttribute('id',this._img.getAttribute('id'));
            this._rootObj.className=this._img.className;
            this._eventObj = this._rootObj;
            var parameters;
            while (parameters = this._onLoadDelegate.shift()) {
              this._handleRotation(parameters, true);
            }
          }
          else return function () {
            this._rootObj.setAttribute('id',this._img.getAttribute('id'));
            this._rootObj.className=this._img.className;

            this._imgWidth=this._img.naturalWidth;
            this._imgHeight=this._img.naturalHeight;
            var _widthMax=Math.sqrt((this._imgHeight)*(this._imgHeight) + (this._imgWidth) * (this._imgWidth));
            this._width = _widthMax * 3;
            this._height = _widthMax * 3;

            this._aspectW = this._img.offsetWidth/this._img.naturalWidth;
            this._aspectH = this._img.offsetHeight/this._img.naturalHeight;

            this._img.parentNode.removeChild(this._img);


            this._canvas=document.createElement('canvas');
            this._canvas.setAttribute('width',this._width);
            this._canvas.style.position="relative";
            this._canvas.style.left = -this._img.height * this._aspectW + "px";
            this._canvas.style.top = -this._img.width * this._aspectH + "px";
            this._canvas.Wilq32 = this._rootObj.Wilq32;

            this._rootObj.appendChild(this._canvas);
            this._rootObj.style.width=this._img.width*this._aspectW+"px";
            this._rootObj.style.height=this._img.height*this._aspectH+"px";
            this._eventObj = this._canvas;

            this._cnv=this._canvas.getContext('2d');
            var parameters;
            while (parameters = this._onLoadDelegate.shift()) {
              this._handleRotation(parameters, true);
            }
          }
      })(),

      _animateStart:function()
      {
        if (this._timer) {
          clearTimeout(this._timer);
        }
        this._animateStartTime = +new Date;
        this._animateStartAngle = this._angle;
        this._animate();
      },
      _animate:function()
      {
        var actualTime = +new Date;
        var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;

        // TODO: Bug for animatedGif for static rotation ? (to test)
        if (checkEnd && !this._parameters.animatedGif)
        {
          clearTimeout(this._timer);
        }
        else
        {
          if (this._canvas||this._vimage||this._img) {
            var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
            this._rotate((~~(angle*10))/10);
          }
          if (this._parameters.step) {
            this._parameters.step(this._angle);
          }
          var self = this;
          this._timer = setTimeout(function()
          {
            self._animate.call(self);
          }, 10);
        }

      // To fix Bug that prevents using recursive function in callback I moved this function to back
      if (this._parameters.callback && checkEnd){
        this._angle = this._parameters.animateTo;
        this._rotate(this._angle);
        this._parameters.callback.call(this._rootObj);
      }
      },

      _rotate : (function()
      {
        var rad = Math.PI/180;
        if (IE)
          return function(angle)
        {
          this._angle = angle;
          this._container.style.rotation=(angle%360)+"deg";
          this._vimage.style.top = -(this._rotationCenterY - this._imgHeight/2) + "px";
          this._vimage.style.left = -(this._rotationCenterX - this._imgWidth/2) + "px";
          this._container.style.top = this._rotationCenterY - this._imgHeight/2 + "px";
          this._container.style.left = this._rotationCenterX - this._imgWidth/2 + "px";

        }
          else if (supportedCSS)
          return function(angle){
            this._angle = angle;
            this._img.style[supportedCSS]="rotate("+(angle%360)+"deg)";
            this._img.style[supportedCSSOrigin]=this._parameters.center.join(" ");
          }
          else
            return function(angle)
          {
            this._angle = angle;
            angle=(angle%360)* rad;
            // clear canvas
            this._canvas.width = this._width;//+this._widthAdd;
            this._canvas.height = this._height;//+this._heightAdd;

            // REMEMBER: all drawings are read from backwards.. so first function is translate, then rotate, then translate, translate..
            this._cnv.translate(this._imgWidth*this._aspectW,this._imgHeight*this._aspectH);	// at least center image on screen
            this._cnv.translate(this._rotationCenterX,this._rotationCenterY);			// we move image back to its orginal
            this._cnv.rotate(angle);										// rotate image
            this._cnv.translate(-this._rotationCenterX,-this._rotationCenterY);		// move image to its center, so we can rotate around its center
            this._cnv.scale(this._aspectW,this._aspectH); // SCALE - if needed ;)
            this._cnv.drawImage(this._img, 0, 0);							// First - we draw image
          }

      })()
      }

      if (IE)
      {
        Wilq32.PhotoEffect.prototype.createVMLNode=(function(){
          document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
          try {
            !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            return function (tagName) {
              return document.createElement('<rvml:' + tagName + ' class="rvml">');
            };
          } catch (e) {
            return function (tagName) {
              return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
          }
        })();
      }

})(jQuery);