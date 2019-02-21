 
   $(document).ready(function(){
            var nav=$("#navtop"); //得到导航对象
            var win=$(window); //得到窗口对象
            var sc=$(document);//得到document文档对象。
            var navHeight = nav.offset().top;      
				
    var martop = $('#navtop').outerHeight();
            win.scroll(function(){                            
              if(sc.scrollTop() >= navHeight){                                    
                    nav.addClass("nav_fix_pos");
					 
					 $("#content").css({ "margin-top": martop });
					
              }else{
                    nav.removeClass("nav_fix_pos");    
 $("#content").css({ "margin-top": 0 });
			
              };
            });
        });

 