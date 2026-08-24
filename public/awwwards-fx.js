/* ============================================================
   AWWWARDS FX — Premium animasyon motoru (vanilla, kütüphanesiz)
   ============================================================ */
(function(){
"use strict";
var azalt=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(azalt)return;

/* ---- FX READY ---- */
document.documentElement.classList.add("fx-ready");

/* ---- SECTION REVEAL ---- */
var io=new IntersectionObserver(function(entries){
 entries.forEach(function(en){
  if(en.isIntersecting){en.target.classList.add("rv-on");io.unobserve(en.target)}
 })
},{threshold:.06,rootMargin:"0px 0px -4% 0px"});

/* main direkt çocukları + tüm section'lar + .rv elemanları */
document.querySelectorAll("main > *, main > section > *, .rv").forEach(function(el,i){
 el.style.setProperty("--fx-d",(i%5*70)+"ms");
 io.observe(el);
});

/* ---- COUNT-UP ---- */
var sio=new IntersectionObserver(function(entries){
 entries.forEach(function(en){
  if(!en.isIntersecting)return;
  sio.unobserve(en.target);
  var el=en.target,hedef=parseFloat(el.dataset.count)||0,sfx=el.dataset.suf||"";
  var t0=null,sure=1400;
  function tick(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/sure);
   var deger=Math.round(hedef*(1-Math.pow(1-p,3)));
   el.textContent=deger.toLocaleString("tr-TR")+sfx;
   if(p<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
 })
},{threshold:.55});
document.querySelectorAll(".stat-num").forEach(function(s){sio.observe(s)});

/* ---- TIMELINE AKTIF SIRALI ---- */
var tio=new IntersectionObserver(function(entries){
 var i=0;
 entries.forEach(function(en){
  if(!en.isIntersecting)return;
  var el=en.target,idx=+(el.dataset.no||1);
  setTimeout(function(){el.classList.add("aktif")},idx*160);
  tio.unobserve(el);
 })
},{threshold:.35});
document.querySelectorAll(".tl-adim").forEach(function(a){tio.observe(a)});

/* ---- STAGGER TEXT ---- */
var gio=new IntersectionObserver(function(entries){
 entries.forEach(function(en){
  if(!en.isIntersecting)return;gio.unobserve(en.target);
  en.target.classList.add("stag-on")
 })
},{threshold:.2});
document.querySelectorAll(".stagger").forEach(function(s){gio.observe(s)});

/* ---- PARALLAX (hafif) ---- */
var pEls=document.querySelectorAll(".parallax-img,.hk-break img");
if(pEls.length){
 addEventListener("scroll",function(){
  requestAnimationFrame(function(){
   pEls.forEach(function(img){
    var r=img.getBoundingClientRect();
    if(r.bottom<0||r.top>innerHeight)return;
    var merkez=(r.top+r.height/2-innerHeight/2)/innerHeight;
    img.style.transform="translateY("+Math.round(merkez*-28)+"px) scale(1.04)";
   })
  })
 },{passive:true});
}

/* ---- HERO SLOW SCALE ---- */
var hi=document.querySelector(".corporate-hero img,.hk-hero-gorsel img");
if(hi&&!hi.dataset.fxScale){hi.dataset.fxScale="1";hi.style.transform="scale(1.08)";requestAnimationFrame(function(){requestAnimationFrame(function(){hi.style.transition="transform 3s cubic-bezier(.16,.84,.28,1),filter .6s";hi.style.transform="scale(1)"})})}

})();
