import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';
class global {
    constructor() {
        this.events();
        this.stickyHeader();
        this.hamburger();
        this.offcavas();
        this.scrollspy();
        this.searchClear();
        this.selectOption();
    }

    // Hamburger Menu
    hamburger() {
        // Hamburger Menu
        var forEach = function (t, o, r) {
            if ('[object Object]' === Object.prototype.toString.call(t))
                for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
            else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t);
        };

        var hamburgers = document.querySelectorAll('.hamburger');

        if (hamburgers.length > 0) {
            forEach(hamburgers, function (hamburger) {
                hamburger.addEventListener(
                    'click',
                    function () {
                        this.classList.toggle('is-active');
                    },
                    false
                );
            });
        }

        $('.hamburger').on('click', function () {
            $('.theme-header').toggleClass('theme-header--is-open');
            $('body').toggleClass('pushy-open-right prevent-scrolling');
            // $(".theme-header").toggleClass("dropdown-open");
        });
    }

    // Offcanvas
    offcavas() {
        // Offcanvas Menus
        // if ($("li.mega-menu-has-children")) {
        //     $("li.mega-menu-has-children > a").append('<i class="icon-right ml-2 text-primary"></i>');
        // }

        $('li.mega-menu-has-children > a').click(function () {
            $('.menu-off-canvas-children').addClass('active');
        });

        $(".go-back > a").click(function () {
            $(".menu-off-canvas-children").removeClass("active");
        });
    }

    stickyHeader() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('.theme-header').addClass('header-small');
            } else {
                $('.theme-header').removeClass('header-small');
            }
        });
    }

    scrollspy(){
        $(document).on('click', 'a[href^="#"]', function (e) {            
            var id = $(this).attr('href');            
            var $id = $(id);            
            if ($id.length === 0) {                
                return;            
            }            
            e.preventDefault();            
            var header_height = $('.theme-header').height() + 100;            
            var target = $(this).attr('href');            
            setTimeout(function () {                
                $('html, body').animate({                    
                    scrollTop: ($(target).offset().top - header_height)                
                }, 100);            
            },0);        
        });
    }
    
    searchClear(){
        $('.has-clear input[type="text"]').on('change keyup', function(){
            var $this = $(this);
            var visible = Boolean($this.val());
            $this.siblings('.input-group-btn').children('.close-btn').toggleClass('d-none', !visible);
            $this.siblings('.input-group-btn').children('.search-btn').toggleClass('d-none', !!visible);
        });
    
        $('.input-group-btn').on('click' , function() {
            $(this).siblings('input[type="text"]').val('');
            $(this).siblings('input[type="text"]').trigger("focus");
               $('.search-btn').removeClass('d-none');
               $('.close-btn').addClass('d-none');
        });
    }

    selectOption(){
        $('select').each(function(){
            var $this = $(this), 
            numberOfOptions = $(this).children('option').length;
          
            $this.addClass('select-hidden'); 
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');
        
            var $styledSelect = $this.next('div.select-styled');
            $styledSelect.text($this.children('option').eq(0).text());
          
            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);
          
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }
          
            var $listItems = $list.children('li');
          
            $styledSelect.on('click', function(e) {
                e.stopPropagation();
                $('div.select-styled.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.select-options').hide();
                });
                $(this).toggleClass('active').next('ul.select-options').toggle();
            });
          
            $listItems.on('click', function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
                $list.hide();
            });
          
            $(document).on('click' ,function() {
                $styledSelect.removeClass('active');
                $list.hide();
            });
        
        });
    }
    events() {}
}

export default global;
new global();
