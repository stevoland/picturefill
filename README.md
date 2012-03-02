# Picturefill

A crude polyfill for proposed behavior of the picture element, which does not yet exist, but should. :)

* Author: Scott Jehl (c) 2012
* License: MIT/GPLv2
* Notes: For active discussion of the picture element, see [http://www.w3.org/community/respimg/](http://www.w3.org/community/respimg/). While this code does work, it is intended to be used only for example purposes until either:

	A) A W3C Candidate Recommendation for <picture> is released

	B) A major browser implements <picture>

Demo URL: [http://scottjehl.github.com/picturefill/](http://scottjehl.github.com/picturefill/)

Note: The demo only polyfills picture support for browsers that support CSS3 media queries, but it includes the [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/) for media-query-supporting browsers that don't have matchMedia.

Enhanced 02/03/2012 - stevoland@gmail.com
    * Prevent default img src download Jake Archibald [stylee](http://24ways.org/2011/adaptive-images-for-responsive-designs-again)
    * Allow and respect height/width attributes to help with layout
    * Lazy load fist image only when in or above visible area