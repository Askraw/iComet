(function($) {

  $.fn.menumaker = function(options) {
      
      var cssmenu = $(this), settings = $.extend({
        title: "Menu",
        format: "dropdown",
        sticky: false
      }, options);

      return this.each(function() {
        cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
        $(this).find("#menu-button").on('click', function(){
          $(this).toggleClass('menu-opened');
          var mainmenu = $(this).next('ul');
          if (mainmenu.hasClass('open')) { 
            mainmenu.hide().removeClass('open');
          }
          else {
            mainmenu.show().addClass('open');
            if (settings.format === "dropdown") {
              mainmenu.find('ul').show();
            }
          }
        });

        cssmenu.find('li ul').parent().addClass('has-sub');

        multiTg = function() {
          cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
          cssmenu.find('.submenu-button').on('click', function() {
            $(this).toggleClass('submenu-opened');
            if ($(this).siblings('ul').hasClass('open')) {
              $(this).siblings('ul').removeClass('open').hide();
            }
            else {
              $(this).siblings('ul').addClass('open').show();
            }
          });
        };

        if (settings.format === 'multitoggle') multiTg();
        else cssmenu.addClass('dropdown');

        if (settings.sticky === true) cssmenu.css('position', 'fixed');

        resizeFix = function() {
          if ($( window.innerWidth ).width() > 1300) {
            cssmenu.find('ul').show();
          }

          if ($(window.innerWidth).width() <= 1300) {
            cssmenu.find('ul').hide().removeClass('open');
          }
        };
        resizeFix();
        return $(window.innerWidth).on('resize', resizeFix);

      });
  };
})(jQuery);

(function($){
$(document).ready(function(){

$(document).ready(function() {
  $("#cssmenu").menumaker({
    title: "Menu",
    format: "multitoggle"
  });

  $("#cssmenu").prepend("<div id='menu-line'></div>");

var foundActive = false, activeElement, linePosition = 0, menuLine = $("#cssmenu #menu-line"), lineWidth, defaultPosition, defaultWidth;

$("#cssmenu > ul > li").each(function() {
  if ($(this).hasClass('active')) {
    activeElement = $(this);
    foundActive = true;
  }
});

if (foundActive === false) {
  activeElement = $("#cssmenu > ul > li").first();
}

//defaultWidth = lineWidth = activeElement.width();

//defaultPosition = linePosition = activeElement.position().left;

//menuLine.css("width", lineWidth);
//menuLine.css("left", linePosition);

//$("#cssmenu > ul > li").hover(function() {
//  activeElement = $(this);
//  lineWidth = activeElement.width();
//  linePosition = activeElement.position().left;
//  menuLine.css("width", lineWidth);
//  menuLine.css("left", linePosition);
//}, 
//function() {
//  menuLine.css("left", defaultPosition);
//  menuLine.css("width", defaultWidth);
//});

});


});

		$(document).ready(function(){
            var nav=$("#cssmenu"); //得到导航对象
			
            var win=$(window); //得到窗口对象
            var sc=$(document);//得到document文档对象。
            var navHeight = $('#banner').outerHeight();      
				
    var martop = 52;
    $(window).resize(function(){
    navHeight = $('#banner').outerHeight(); 
    //martop = $('#cssmenu').outerHeight();
});

            win.scroll(function(){                            
              if(sc.scrollTop() >= navHeight){                                    
                    // nav.addClass("nav_fix_pos");
					
					nav.css({"position":"fixed","top":0,"width":"100%","text-align":"center","background-color":"#F5F5F5"});
					 
					 $("#content").css({ "margin-top": martop });
					
              }else{
                   // nav.removeClass("nav_fix_pos"); 
nav.css({"position":"static"});				   
					
 $("#content").css({ "margin-top": 0 });
			
              };
            });
        });
})(jQuery);
