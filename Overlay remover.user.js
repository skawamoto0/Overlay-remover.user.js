// ==UserScript==
// @name         Overlay remover
// @namespace    https://kawamoto.no-ip.org/
// @version      1.1
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
    let f = function(d){
        while(d != document.body && getComputedStyle(d).zIndex == "auto" && d.parentNode){
            d = d.parentNode;
        }
        return d;
    };
    let g = function(d, z, c){
        Array.prototype.forEach.call(d.children, function(e){
            let s = getComputedStyle(e);
            if(s.zIndex == "auto"){
                g(e, z, c);
            }
            if(s.display != "none" && s.visibility != "hidden" && s.position != "relative" && s.zIndex >= z){
                c(e);
            }
        });
    };
    let h = function(c){
        let p = f(document.elementFromPoint(0, 0));
        let z = parseInt(getComputedStyle(p).zIndex);
        g(f(p != document.body ? p.parentNode : p), z >= 0 ? z : 0, c);
    };
    document.addEventListener("keydown", function(e){
        if(e.ctrlKey && e.shiftKey && e.code == "KeyX"){
            h(function(d){
                if(d.parentNode){
                    d.parentNode.removeChild(d);
                }
            });
            e.preventDefault();
        }
        if(e.ctrlKey && e.shiftKey && e.code == "KeyZ"){
            h(function(d){
                d.style.display = "none";
            });
            e.preventDefault();
        }
    });
})();