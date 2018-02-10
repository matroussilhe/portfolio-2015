window.onload = function() {
    $('#fullpage').fullpage( {
        //Navigation
        menu: '#menu',
        anchors: ['home', 'work', 'about', 'contact'],

        //Scrolling
        css3: true,
        scrollingSpeed: 900,
        autoScrolling: true,
        fitToSection: true,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: false,
        continuousVertical: false,
        scrollOverflow: true,
        touchSensitivity: 5,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: false,

        //Design
        controlArrows: false,
        verticalCentered: true,
        resize: false,
        sectionsColor: [],
        paddingTop: '100px',
        paddingBottom: '0px',
        fixedElements: false,
        responsive: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',
    });

    // GOOGLE ANALYTICS
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-65086636-1', 'auto');
    ga('send', 'pageview');

    // TIMER TO MAKE SURE THE WORK_GRID IS LOADED
    setTimeout(function() {
        // WALL CREATION
        var resizeTimer;
        var wall = new freewall("#work_grid");
        wall.reset({
            selector: '.grid_item',
            animate: true,
            cache: true,
            gutterX: 0,
            gutterY: 0,
            cellW: 300,
            cellH: 300,
            fixSize: false,
            onResize: function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    wall.fitWidth();
                }, 300);
            }
        });
        $(window).trigger('resize');
        wall.fitWidth();

        // WALL FILTER
        var filter = ".grid_all";
        var readmore_wrap = "none";
        wall.filter(filter)
        $(".filter_label").click(function() {
            $(".filter_label").removeClass("active");
            filter = $(this).addClass('active').data('filter');
            if (filter) {
                wall.filter(filter);
                if (readmore_wrap != "none") {
                    $("#" + readmore_wrap).stop(true, true).slideUp(400, "swing");
                    readmore_wrap = "none";
                }
            } else {
                wall.unFilter();
            }
        });
        
        // READMORE OVERLAY
        $(".grid_min_wrap").mouseenter(function(event) {
            $(this).find(".grid_min_overlay").stop(true, true).fadeIn(300);
        });
        $(".grid_min_wrap").mouseleave(function(event) {
            $(this).find(".grid_min_overlay").stop(true, true).fadeOut(300);
        });

        // READMORE CONTENT
    	$(".readmore_link").bind({
    		click: function(event) {
                wall.filter("none");
                readmore_wrap = $(this).attr("id") + "_wrap";
                $("#" + readmore_wrap).stop(true, true).slideDown(400, "swing");
    			return (false);
    		}
    	});
        $(".readmore_close").bind({
            click: function(event) {
                $("#" + readmore_wrap).stop(true, true).slideUp(400, "swing");
                wall.filter(filter);
                return (false);
            }
        });
    }, 100);

    // LOADER
    $( "#loader_screen" ).fadeOut(400, function() {
        $("#loader_screen").remove();
    });
}