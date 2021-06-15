// ==UserScript==
// @name         Overlay remover
// @namespace    https://kawamoto.no-ip.org/
// @version      1.0
// @description  Just removes/hides overlay elements by Crtl+Shift+X/Z.
// @author       Suguru Kawamoto
// @include      *
// @grant        none
// @updateURL    https://kawamoto.no-ip.org/misc/Overlay%20remover.user.js
// @downloadURL  https://kawamoto.no-ip.org/misc/Overlay%20remover.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let f = function(d, z, h){
        Array.prototype.forEach.call(d.children, function(c){
            f(c, z, h);
        });
        let s = getComputedStyle(d);
        if(s.display != "none" && s.visibility != "hidden" && s.zIndex > z){
            h(d);
        }
    };
    document.addEventListener("keydown", function(e){
        if(e.ctrlKey && e.shiftKey && e.code == "KeyX"){
            let p = document.elementFromPoint(0, 0);
            let z = parseInt(getComputedStyle(p).zIndex);
            if(z > 0 && p.parentNode){
                p.parentNode.removeChild(p);
            }
            f(document.body, z > 0 ? z : 0, function(d){
                if(d.parentNode){
                    d.parentNode.removeChild(d);
                }
            });
            e.preventDefault();
        }
        if(e.ctrlKey && e.shiftKey && e.code == "KeyZ"){
            let p = document.elementFromPoint(0, 0);
            let z = parseInt(getComputedStyle(p).zIndex);
            if(z > 0){
                p.style.display = "none";
            }
            f(document.body, z > 0 ? z : 0, function(d){
                d.style.display = "none";
            });
            e.preventDefault();
        }
    });
})();