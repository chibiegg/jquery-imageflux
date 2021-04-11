/*!*
 * jQuery ImageFlux
 *
 * jQuery Plugin for ImageFlux of SAKURA internet Inc.
 * https://www.sakura.ad.jp/services/imageflux/
 */
(function( $, window, document ) {
    'use strict';

    // function name
    var namespace = 'imageflux';

    var aspectMap = {
        'scale': 0,
        'force-scale': 1,
        'crop': 2,
        'pad': 3,
    };

    var originMap = {
        'top-left': 1,
        'top-center': 2,
        'top-right': 3,
        'center-left': 4,
        'center': 5,
        'center-right': 6,
        'bottom-left': 7,
        'bottom-center': 8,
        'bottom-right': 9,
    };

    function params2string(params) {
        var args = [];

        // Size
        if (params.width) {
            args.push('w=' + params.width);
        }
        if (params.height) {
            args.push('h=' + params.height);
        }
        if (params.aspect) {
            if (aspectMap[params.aspect] === undefined) {
                console.warn('Unknown aspect mode "' + params.aspect + '"');
            }else{
                args.push('a=' + aspectMap[params.aspect]);
            }
        }
        if (params.backgroundColor) {
            args.push('b=' + params.backgroundColor);
        }
        if (params.origin) {
            if (originMap[params.origin] === undefined) {
                console.warn('Unknown origin mode "' + params.origin + '"');
            }else{
                args.push('g=' + originMap[params.origin]);
            }
        }
        if (params.allowUpscale === false) {
            args.push('u=0');
        } else if (params.allowUpscale === true) {
            args.push('u=1');
        }


        // Format
        if (params.format) {
            args.push('f=' + params.format);
        }
        if (params.quality) {
            args.push('q=' + params.quality);
        }
        if (params.optimizeHuhmanTable === false) {
            args.push('o=0');
        } else if (params.optimizeHuhmanTable === true) {
            args.push('o=1');
        }
        if (params.lossless === false) {
            args.push('lossless=0');
        } else if (params.lossless === true) {
            args.push('lossless=1');
        }
        if (params.removeExif === 'all') {
            args.push('s=1');
        }else if(params.removeExif === 'without-orientation') {
            args.push('s=2');
        }else{
            console.warn('Unknown removeExif mode "' + params.removeExif + '". Use "all" or "without-orientation"');
        }

        // through
        if (params.through) {
            args.push('through=' + params.through);
        }


        return args.join(',');
    }



    $.fn[namespace] = function(options) {
        if (!options.host) {
            console.warn('Missing host. Ex: "demo.imageflux.jp"');
            return this;
        }

        var settings = $.extend({}, $.fn[namespace].defaults, options);

        return this.each(function(index, element) {
            var $this = $(element);

            var src = $this.data('imgflx-src');
            if (!src) {
                console.warn('Missing data-imgflx-src');
                return;
            }

            var params = Object.assign({}, settings);


            // Parameters from data
            $.each($this.data(), function(k, v){
                if (!k.startsWith("imgflx") || k=="imgflxSrc") {
                    return;
                }
                k = k.charAt(6).toLowerCase() + k.slice(7);
                params[k] = v;
            });

            var url = "https://" + params.host + "/" + params2string(params) + src;
            $this.attr('src', url);
        });

    };

    // default options
    $.fn[namespace].defaults = {
        // URL
        host: null, // Ex. demo.imageflux.jp

        // Size
        width: null,
        height: null,
        aspect: 'force-scale',
        backgroundColor: 'ffffff',
        origin: 'center',
        allowUpscale: true,

        // Format
        format: 'auto',
        quality: 75,
        optimizeHuhmanTable: false,
        lossless: false,
        removeExif: 'all',

        through: null,
    };

}( jQuery, window, document ));
