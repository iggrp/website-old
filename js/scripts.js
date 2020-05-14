/* ===================================================  
1. Loader
2. Youtube Background
3. Backstretch Background
4. Kenburned Background
5. Polygon Background
6. Countdown
7. Subscription Form Submit
 =================================================== */

$(function() {
    "use strict";
    
    /* =================================================== */
    /*      1. Loader
	/* =================================================== */

    $(window).load(function() {
        $(".loader").fadeOut("slow");
    }); 
    
    /* =================================================== */
    /*      2. Youtube Background
	/* =================================================== */
     
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    if(isMobile.any()) {       
       $("#background3").backstretch("images/image-background3.jpg");  
    } else {
       if($('#video-background').length){
            $('#video-background').YTPlayer({
                 fitToBackground: true,
                 videoId: 'jKCyFB5LmPo'
             }); 
       }   
    }      
    
    /* =================================================== */
    /*      3. Backstretch Background
	/* =================================================== */
    
    $("#background1").backstretch("images/image-background.jpg");
    $("#background2").backstretch("images/image-background2.jpg");      
    
    $("#slides").backstretch([
        "images/background1.jpg",
        "images/background2.jpg", 
        "images/background3.jpg"        
    ],  {duration: 3000, fade: 1200});
    
    /* =================================================== */
    /*      4. Kenburned Background
	/* =================================================== */
    
    if($('#kenburned-background').length){
        var $canvas = $('#kenburned-background');

        $canvas.attr('width', $(window).width());
        $canvas.attr('height', $(window).height());

        var kb = $canvas.kenburned({
                images : [
                    "images/kenburned-background1.jpg",
                    "images/kenburned-background2.jpg", 
                    "images/kenburned-background3.jpg"    
                ]
        });
    }  
    
    /* =================================================== */
    /*      5. Polygon Background
	/* =================================================== */
    
    if($('#polygons').length){
        $('#polygons').particleground({
            dotColor: 'rgba(255,255,255,.4)',
            lineColor: 'rgba(255,255,255,.4)',
            density: 8000       
        });
    }    
    
    /* =================================================== */
    /*      6. Countdown
	/* =================================================== */
    
    $('body').countdown('2019/12/31', function(event) {
        var offset = event.offset;
        $('.cday').text(offset.totalDays);
        $('.chours').text(''.concat(offset.hours < 10 ? '0' : '', offset.hours));
        $('.cminutes').text(''.concat(offset.minutes < 10 ? '0' : '', offset.minutes));
        $('.cseconds').text(''.concat(offset.seconds < 10 ? '0' : '', offset.seconds));
    });
    
    /* =================================================== */
    /*      7. Subscription Form Submit
	/* =================================================== */
     
    $('#newsletter-form').validate({
        rules: {
            newsletter_email: {
                required: true,
                email: true
            }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('form-error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('form-error');
        },
        errorPlacement: function(error, element) {

        },
        submitHandler: function(form) {
            $("#newsletter-form .alert-message").html('<i class="fa fa-refresh fa-spin"></i> Please wait');
            $.post("subscription.php", $("#newsletter-form").serialize(),
                function(data) {
                    var obj = jQuery.parseJSON(data);
                    $("#newsletter-form .alert-message").html("<span class='" + obj.error + "'>" + obj.flash + "</span>");
                    setTimeout(function(){
                        $("#newsletter-form .alert-message").fadeOut("slow", function(){
                            $("#newsletter-form .alert-message").html('').show();                           
                        });                       
                    }, 2000);
                });
            return false;
        }
    });      
});    