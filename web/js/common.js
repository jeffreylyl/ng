function preBind() {
    initFontSize();
    initOverlay();
    $('.scrolling').jScrollPane({ showArrows: true });
    $("a[rel^='prettyPhoto']").prettyPhoto({ theme: 'light_square' });
    $(".btn-print>a").click(function() {
        window.print();
        return false;
    });
}

function initFontSize() {
    var maxFontSize = 16;
    var minFontSize = 10;

    var cookieFontSize = getCookie("New_Font_Size");
    var originalFontSize = $('.page-content').css('font-size');
    // console.log("cookie size "+ cookieFontSize+",   original size "+ originalFontSize);
    if (cookieFontSize != "") {
        if ((cookieFontSize + "px") != originalFontSize) {
            $('.page-content, .page-content p, .page-content h3, .page-content h4, .page-content h5, .page-content table').css('font-size', (cookieFontSize + "px"));
        }
    }

    $("#increaseFont").click(function() {
        var currentFontSize = $('.page-content').css('font-size');
        var currentFontSizeNum = parseFloat(currentFontSize, 10);
        var newFontSize = currentFontSizeNum + 2;
        if (newFontSize > maxFontSize) {
            newFontSize = maxFontSize;
        }
        setCookie("New_Font_Size", newFontSize, 2);
        // console.log("increse from "+currentFontSize+" to "+ newFontSize);
        $('.page-content, .page-content p, .page-content h3, .page-content h4, .page-content h5, .page-content table').css('font-size', newFontSize);
        return false;
    });

    $("#decreaseFont").click(function() {
        var currentFontSize = $('.page-content').css('font-size');
        var currentFontSizeNum = parseFloat(currentFontSize, 10);
        var newFontSize = currentFontSizeNum - 2;
        if (newFontSize < minFontSize) {
            newFontSize = minFontSize;
        }
        setCookie("New_Font_Size", newFontSize, 2);
        // console.log("decrease from "+currentFontSize+" to "+ newFontSize);
        $('.page-content, .page-content p, .page-content h3, .page-content h4, .page-content h5, .page-content table').css('font-size', newFontSize);
        return false;
    });

}

function initOverlay() {
    $('.overlay').each(function() {
        if ($(this).attr("rel") == "google-map") {
            $(this).attr("print", googleMapPrintUrlReplace($(this).attr("href")));
            $(this).attr("href", $(this).attr("href") + '&output=embed&iframe=true&width=600&height=400');
            $(this).prettyPhoto({ theme: 'light_square' });
        } else if ($(this).attr("rel") == "iframe") {
            $(this).attr("print", $(this).attr("href") + '?printed=true');
            $(this).attr("href", $(this).attr("href") + '&iframe=true&width=720&height=600');
            $(this).prettyPhoto({ theme: 'light_square' });
        } else if ($(this).attr("rel") == "video") {
            $(this).attr("print", $(this).attr("href") + '?printed=true');
            $(this).attr("href", $(this).attr("href") + '&iframe=true&width=500&height=375');
            $(this).prettyPhoto({ theme: 'light_square' });
        } else if ($(this).attr("rel") == "prettyPhoto[pp_gal]") {
            $(this).attr('id', 'no-print-btn');
            $(this).attr("print", $(this).attr("href"));
            $(this).prettyPhoto({ theme: 'light_square' });
        } else if ($(this).attr("rel") == "prettyPhoto[pp_gal_cr]") {
            $(this).attr('id', 'no-print-btn');
            $(this).attr("print", $(this).attr("href"));
            $(this).prettyPhoto({ theme: 'light_square' });
        } else if ($(this).attr("rel") == "prettyPhoto[pp_gal_sh]") {
            $(this).attr('id', 'no-print-btn');
            $(this).attr("print", $(this).attr("href"));
            $(this).prettyPhoto({ theme: 'light_square' });
        } else if ($(this).attr("rel") == "prettyPhoto[pp_gal_caption]") {
            $(this).attr('id', 'no-print-btn');
            $(this).attr("print", $(this).attr("href"));
            $(this).prettyPhoto({ theme: 'light_square' });
        } else {
            $(this).attr("print", $(this).attr("href"));
            $(this).prettyPhoto({ theme: 'light_square' });
        }
    });
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString()) + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function share(url, w, h) {
    window.open(url, "_blank", "width=" + (w || 615) + ",height=" + (h || 505));
}

$(function() {
    var timeout;

    function sns_show(stay) {
        clearTimeout(timeout);
        if (!stay) timeout = setTimeout(function() {
            $('.sns-share').hide(200)
        }, 500);
        $('.sns-share').show();
    }

    $(this).delegate(".sns-share, .sns-share img", "mousemove", function() {
        sns_show(true);
    });

    $(this).delegate(".sns-share, .sns-share img", "mouseout", function() {
        sns_show();
    });

    window.sns_show = sns_show;
});
