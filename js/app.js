// cookie message

$(".turn-it-off").click(function () {
    $(".cookie-message").fadeOut("slow");
})
$(".cookie-button").click(function () {
    $(".cookie-message").fadeOut("slow");
})

function setCookie(cookie-name, cookie-value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cookie-name + "=" + cookievalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cookie - name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
