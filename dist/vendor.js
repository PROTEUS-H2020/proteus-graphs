!function(t,e){"function"==typeof define&&define.amd?define(["d3"],e):"object"==typeof module&&module.exports?module.exports=function(t){return t.tip=e(t),t.tip}:t.d3.tip=e(t.d3)}(this,function(t){return function(){function e(t){T=d(t),b=T.createSVGPoint(),document.body.appendChild(w)}function n(){return"n"}function r(){return[0,0]}function o(){return" "}function f(){var t=h();return{top:t.n.y-w.offsetHeight,left:t.n.x-w.offsetWidth/2}}function i(){var t=h();return{top:t.s.y,left:t.s.x-w.offsetWidth/2}}function l(){var t=h();return{top:t.e.y-w.offsetHeight/2,left:t.e.x}}function u(){var t=h();return{top:t.w.y-w.offsetHeight/2,left:t.w.x-w.offsetWidth}}function s(){var t=h();return{top:t.nw.y-w.offsetHeight,left:t.nw.x-w.offsetWidth}}function a(){var t=h();return{top:t.ne.y-w.offsetHeight,left:t.ne.x}}function c(){var t=h();return{top:t.sw.y,left:t.sw.x-w.offsetWidth}}function p(){var t=h();return{top:t.se.y,left:t.e.x}}function y(){var e=t.select(document.createElement("div"));return e.style({position:"absolute",top:0,opacity:0,"pointer-events":"none","box-sizing":"border-box"}),e.node()}function d(t){return t=t.node(),"svg"===t.tagName.toLowerCase()?t:t.ownerSVGElement}function m(){return null===w&&(w=y(),document.body.appendChild(w)),t.select(w)}function h(){for(var e=C||t.event.target;"undefined"==typeof e.getScreenCTM&&"undefined"===e.parentNode;)e=e.parentNode;var n={},r=e.getScreenCTM(),o=e.getBBox(),f=o.width,i=o.height,l=o.x,u=o.y;return b.x=l,b.y=u,n.nw=b.matrixTransform(r),b.x+=f,n.ne=b.matrixTransform(r),b.y+=i,n.se=b.matrixTransform(r),b.x-=f,n.sw=b.matrixTransform(r),b.y-=i/2,n.w=b.matrixTransform(r),b.x+=f,n.e=b.matrixTransform(r),b.x-=f/2,b.y-=i/2,n.n=b.matrixTransform(r),b.y+=i,n.s=b.matrixTransform(r),n}var x=n,v=r,g=o,w=y(),T=null,b=null,C=null;e.show=function(){var t=Array.prototype.slice.call(arguments);t[t.length-1]instanceof SVGElement&&(C=t.pop());var n,r=g.apply(this,t),o=v.apply(this,t),f=x.apply(this,t),i=m(),l=H.length,u=document.documentElement.scrollTop||document.body.scrollTop,s=document.documentElement.scrollLeft||document.body.scrollLeft;for(i.html(r).style({opacity:1,"pointer-events":"all"});l--;)i.classed(H[l],!1);return n=E.get(f).apply(this),i.classed(f,!0).style({top:n.top+o[0]+u+"px",left:n.left+o[1]+s+"px"}),e},e.hide=function(){var t=m();return t.style({opacity:0,"pointer-events":"none"}),e},e.attr=function(n,r){if(arguments.length<2&&"string"==typeof n)return m().attr(n);var o=Array.prototype.slice.call(arguments);return t.selection.prototype.attr.apply(m(),o),e},e.style=function(n,r){if(arguments.length<2&&"string"==typeof n)return m().style(n);var o=Array.prototype.slice.call(arguments);return t.selection.prototype.style.apply(m(),o),e},e.direction=function(n){return arguments.length?(x=null==n?n:t.functor(n),e):x},e.offset=function(n){return arguments.length?(v=null==n?n:t.functor(n),e):v},e.html=function(n){return arguments.length?(g=null==n?n:t.functor(n),e):g},e.destroy=function(){return w&&(m().remove(),w=null),e};var E=t.map({n:f,s:i,e:l,w:u,nw:s,ne:a,sw:c,se:p}),H=E.keys();return e}});