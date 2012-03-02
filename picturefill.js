/*
    Enhanced 02/03/2012 - stevoland@gmail.com
        - Prevent default img src download http://24ways.org/2011/adaptive-images-for-responsive-designs-again
        - Allow and respect height/width attributes
        - Lazy load images only when in visible

    Picturefill - a crude polyfill for proposed behavior of the picture element, which does not yet exist, but should. :)
    * Author: Scott Jehl, 2012
    * License: MIT/GPLv2
    * Notes:
      * For active discussion of the picture element, see http://www.w3.org/community/respimg/
      * While this code does work, it is intended to be used only for example purposes until either:
        A) A W3C Candidate Recommendation for <picture> is released
        B) A major browser implements <picture>

*/
(function( w ){
    var document = w.document;

    // Test if `<picture>` is supported natively. Store the boolean result for
    // later use.
    var hasNativePicture = !!(
        document.createElement('picture') && w.HTMLPictureElement
    );

    var matchMedia = w.matchMedia;

    var getOffsetTop = function (elem) {
        // TODO - fix where getBoundingClientRect not available
        return elem.getBoundingClientRect().top;
    }

    // Exit early if `<picture>` is natively supported.
    // If neither `<picture>` **or** `window.matchMedia is supported, exit
    // as well -- we need `matchMedia` to be able to properly polyfill this
    // feature. **Note**: there is a polyfill available for `matchMedia`:
    // <https://github.com/paulirish/matchMedia.js/>
    if ( hasNativePicture || !matchMedia || !matchMedia('only all') ) return;

    w.picturefill = function(){
        var ps = document.getElementsByTagName( "picture" );

        // Loop the pictures
        for( var i = 0, il = ps.length; i < il; i++ ){
            var sources = ps[ i ].getElementsByTagName( "source" ),
                img = ps[ i ].getElementsByTagName( "img" )[ 0 ] || (ps[ i ].appendChild(new Image())),
                matches = [];

            // See if which sources match
            for( var j = 0, jl = sources.length; j < jl; j++ ){
                var media = sources[ j ].getAttribute( "media" );
                if( !media || matchMedia( media ).matches ){
                    matches.push( sources[ j ] );
                }
            }

            // Set fallback img element src from that of last matching source element
            if( matches.length ){
                var match = matches.pop();
                var newSrc = match.getAttribute( "src" );
                var ratio = 1;

                if (img.src !== newSrc) {
                    if (img.src || getOffsetTop(img) < w.innerHeight) {
                        img.src = newSrc;
                    }
                }

                if (match.getAttribute( "width" )) {
                    if (match.getAttribute( "width" ) * 1 > ps[i].parentNode.offsetWidth) {
                        img.width = ps[i].parentNode.offsetWidth;
                        ratio = ps[i].parentNode.offsetWidth / match.getAttribute( "width" );
                    } else {
                        img.width = match.getAttribute( "width" );
                    }
                } else {
                    img.removeAttribute('width');
                }
                if (match.getAttribute( "height" )) {
                    img.height = match.getAttribute( "height" ) * ratio;
                } else {
                    img.removeAttribute('height');
                }
                var css = (img.getAttribute( "height" )) ?
                    'height:' + img.getAttribute( "height" ) + 'px;' : '';
                    css += (img.getAttribute( "width" )) ?
                    'width:' + img.getAttribute( "width" ) + 'px;' : '';

                ps[i].style.cssText = css;
            }
        }
    };

    // Run on resize
    if( w.addEventListener ){
        w.addEventListener( "resize", picturefill, false );
        w.addEventListener( "scroll", picturefill, false );
    }

    // Run when DOM is ready
    picturefill();

})( this );