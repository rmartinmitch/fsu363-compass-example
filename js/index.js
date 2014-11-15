/* global document, navigator, compass, setInterval */
(function() {
    'use strict';

    function successHeading(heading) {
        compass.setHeading(heading.magneticHeading);
    }

    function errorHeading() {
        compass.setHeading(-999);
    }

    function initCompass() {
        navigator.compass.watchHeading(successHeading, errorHeading, {
            frequency: 3000
        });
    }

    function mockCompass() {
        var heading = 0;
        setInterval(function() {
            successHeading({
                magneticHeading: heading
            });
            heading = (heading + 5) % 360;
        }, 1000);
    }

    if (/ios|iphone|ipod|ipad|android/i.test(navigator.userAgent)) {
        document.addEventListener('deviceready', initCompass, false);
    } else {
        mockCompass();
    }

})();

