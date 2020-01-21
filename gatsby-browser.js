/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

exports.onRouteUpdate = () => {
    const $ = require('jquery');
    $(document).ready(function () {
        if ($('.sidebar').length) {
            /* Anchor Scroll */
            $('.sidebar a[href*=\\#]').click(function (e) {
                e.preventDefault();
                setActive($(this));
                var anchor = $(this).attr('href');
                if ($(anchor).length > 0) {
                    $('html, body').animate(
                        {
                            scrollTop: $(anchor).offset().top - 140
                        },
                        400
                    );
                }
            });

            /* Set the sidebar item in view as active */
            function setActive(elm) {
                $('a[href*=\\#]').removeClass('active');
                $(elm).addClass('active');
            }

            /* Detect if element is on the screen */
            $.fn.isInViewport = function () {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();

                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                return elementBottom > viewportTop && elementTop < viewportBottom;
            };

            $(window).on('scroll', function () {
                /* Auto trigger the sidebar active UX */
                $('.docs h1, .docs h2, .docs h3, .docs h4, .docs h5, .docs h6').each(function () {
                    if ($(this).isInViewport()) {
                        var id = $(this).attr('id');

                        // Click functionality already works, so let's reuse it
                        setActive($('.sidebar a[href*=\\#' + id + ']'));
                    }
                });

                /* Auto trigger any navigation in view on page load */
            }).scroll();
        }
    });
}