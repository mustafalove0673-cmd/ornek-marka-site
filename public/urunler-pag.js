(function(){
var cards=[].slice.call(document.querySelectorAll(".product-catalog .product-card"));
if(!cards.length)return;
var SART=6,sayfa=1,toplam=Math.ceil(cards.length/SART);
function goster(){
 cards.forEach(function(c,i){var gor=(i>=(sayfa-1)*SART)&&(i<(sayfa*SART));c.classList.toggle("urun-gizli",!gor)});
 var bar=document.getElementById("urunSayfaBar");if(!bar)return;
 bar.innerHTML="";
 var once=document.createElement("button");once.className="urun-sayfa-btn";once.textContent="<";
 once.addEventListener("click",function(){if(sayfa>1){sayfa--;goster();window.scrollTo({top:0,behavior:"smooth"})}});
 bar.appendChild(once);
 for(var p=1;p<=toplam;p++){(function(p){var b=document.createElement("button");b.className="urun-sayfa-btn"+(p===sayfa?" aktif":"");b.textContent=p;b.addEventListener("click",function(){sayfa=p;goster();window.scrollTo({top:0,behavior:"smooth"})});bar.appendChild(b)})(p)}
 var sonraki=document.createElement("button");sonraki.className="urun-sayfa-btn";sonraki.textContent=">";
 sonraki.addEventListener("click",function(){if(sayfa<toplam){sayfa++;goster();window.scrollTo({top:0,behavior:"smooth"})}});
 bar.appendChild(sonraki);
}
var grid=document.querySelector(".product-catalog");
if(grid){var bar=document.createElement("div");bar.id="urunSayfaBar";bar.className="urun-sayfa-bar";grid.parentNode.insertBefore(bar,grid.nextSibling)}
goster();
})();
