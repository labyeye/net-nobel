$(function() {
  // LOCOMOTIVE
  gsap.registerPlugin(ScrollTrigger);
   const pageContainer = document.querySelector("[data-scroll-container]");
 
   const locoscroll = new LocomotiveScroll({
     el: pageContainer,
     smooth: true,
     class: 'is-inview'
   });
 
   locoscroll.on(pageContainer, ScrollTrigger.update);
 
   ScrollTrigger.scrollerProxy(pageContainer, {
     scrollTop(value) {
       return arguments.length ? locoscroll.scrollTo(value, 0, 0) : locoscroll.scroll.instance.scroll.y;
     },
     getBoundingClientRect() {
       return {
         top: 0,
         left: 0,
         width: window.innerWidth,
         height: window.innerHeight
       };
     }
   });


/////////////////////////////////////////////////////
 // Image Reveal Animation
 let img_anim_reveal = document.querySelectorAll(".img_anim_reveal");

 img_anim_reveal.forEach((img_reveal) => {
   let image = img_reveal.querySelector("img");
   let tl = gsap.timeline({
     scrollTrigger: {
       trigger: img_reveal,
       start: "top 50%",
     }
   });

   tl.set(img_reveal, { autoAlpha: 1 });
   tl.from(img_reveal, 1.5, {
     xPercent: -100,
     ease: Power2.out
   });
   tl.from(image, 1.5, {
     xPercent: 100,
     scale: 1.3,
     delay: -1.5,
     ease: Power2.out
   });
 });
let text_animation = gsap.utils.toArray(".has_text_move_anim");
text_animation.forEach((t) => {
 var a = 0.5;
 t.getAttribute("data-delay") && (a = t.getAttribute("data-delay"));
 const e = gsap.timeline({
     scrollTrigger: {
       trigger: t,
        scroller: "[data-scroll-container]",
       start: "top 85%",
       duration: 1.5,
       scrub: !1,
       markers: !1,
       toggleActions: "play none none none",
     },
   }),
   r = new SplitText(t, { type: "lines" });
 gsap.set(t, { perspective: 400 }),
   r.split({ type: "lines" }),
   e.from(r.lines, {
     duration: 1,
     delay: a,
     opacity: 0,
     rotationX: -80,
     force3D: !0,
     transformOrigin: "top center -50",
     stagger: 0.1,
   });
});
var animation_char_come_items = document.querySelectorAll(".has_char_anim");
animation_char_come_items.forEach((t) => {
 var a = 0.05,
   e = 20,
   r = !1,
   o = 1,
   i = 0.5,
   s = "power2.out";
 if (
   (t.getAttribute("data-stagger") && (a = t.getAttribute("data-stagger")),
   t.getAttribute("data-translateX") &&
     (e = t.getAttribute("data-translateX")),
   t.getAttribute("data-translateY") &&
     (r = t.getAttribute("data-translateY")),
   t.getAttribute("data-on-scroll") && (o = t.getAttribute("data-on-scroll")),
   t.getAttribute("data-delay") && (i = t.getAttribute("data-delay")),
   t.getAttribute("data-ease") && (s = t.getAttribute("data-ease")),
   1 == o)
 ) {
   if (e > 0 && !r) {
     let r = new SplitText(t, { type: "chars, words" });
     gsap.from(r.chars, {
       duration: 1,
       delay: i,
       x: e,
       autoAlpha: 0,
       stagger: a,
       ease: s,
       scrollTrigger: { trigger: t, start: "top 85%",  scroller: "[data-scroll-container]", },
     });
   }
   if (r > 0 && !e) {
     let e = new SplitText(t, { type: "chars, words" });
     gsap.from(e.chars, {
       duration: 1,
       delay: i,
       y: r,
       autoAlpha: 0,
       ease: s,
       stagger: a,
       scrollTrigger: { trigger: t, start: "top 85%" },
     });
   }
   if (e && r) {
     let o = new SplitText(t, { type: "chars, words" });
     gsap.from(o.chars, {
       duration: 3,
       delay: i,
       y: r,
       x: e,
       autoAlpha: 0,
       ease: s,
       stagger: a,
       scrollTrigger: { trigger: t, start: "top 85%" },
     });
   }
   if (!e && !r) {
     let e = new SplitText(t, { type: "chars, words" });
     gsap.from(e.chars, {
       duration: 1,
       delay: i,
       x: 50,
       autoAlpha: 0,
       stagger: a,
       ease: s,
       scrollTrigger: { trigger: t, start: "top 85%" },
     });
   }
 } else {
   if (e > 0 && !r) {
     let r = new SplitText(t, { type: "chars, words" });
     gsap.from(r.chars, {
       duration: 1,
       delay: i,
       x: e,
       ease: s,
       autoAlpha: 0,
       stagger: a,
     });
   }
   if (r > 0 && !e) {
     let e = new SplitText(t, { type: "chars, words" });
     gsap.from(e.chars, {
       duration: 1,
       delay: i,
       y: r,
       autoAlpha: 0,
       ease: s,
       stagger: a,
     });
   }
   if (e && r) {
     let o = new SplitText(t, { type: "chars, words" });
     gsap.from(o.chars, {
       duration: 1,
       delay: i,
       y: r,
       x: e,
       ease: s,
       autoAlpha: 0,
       stagger: a,
     });
   }
   if (!e && !r) {
     let e = new SplitText(t, { type: "chars, words" });
     gsap.from(e.chars, {
       duration: 1,
       delay: i,
       ease: s,
       x: 50,
       autoAlpha: 0,
       stagger: a,
     });
   }
 }
});
let animation_word_anim_items = document.querySelectorAll(".has_word_anim");
animation_word_anim_items.forEach((t) => {
 var a = 0.05,
   e = !1,
   r = !1,
   o = 1,
   i = 0.5;
 if (
   (t.getAttribute("data-stagger") && (a = t.getAttribute("data-stagger")),
   t.getAttribute("data-translateX") &&
     (e = t.getAttribute("data-translateX")),
   t.getAttribute("data-translateY") &&
     (r = t.getAttribute("data-translateY")),
   t.getAttribute("data-on-scroll") && (o = t.getAttribute("data-on-scroll")),
   t.getAttribute("data-delay") && (i = t.getAttribute("data-delay")),
   1 == o)
 ) {
   if (e && !r) {
     let r = new SplitText(t, { type: "chars, words" });
     gsap.from(r.words, {
       duration: 1,
       x: e,
       autoAlpha: 0,
       stagger: a,
       delay: i,
       scrollTrigger: { trigger: t, start: "top 90%" },
     });
   }
   if (r && !e) {
     let e = new SplitText(t, { type: "chars, words" });
     gsap.from(e.words, {
       duration: 1,
       delay: i,
       y: r,
       autoAlpha: 0,
       stagger: a,
       scrollTrigger: { trigger: t, start: "top 90%" },
     });
   }
   if (r && e) {
     let o = new SplitText(t, { type: "chars, words" });
     gsap.from(o.words, {
       duration: 1,
       delay: i,
       x: e,
       y: r,
       autoAlpha: 0,
       stagger: a,
       scrollTrigger: { trigger: t, start: "top 90%" },
     });
   }
   if (!e && !r) {
     let e = new SplitText(t, { type: "chars, words" });
     gsap.from(e.words, {
       duration: 1,
       delay: i,
       x: 20,
       autoAlpha: 0,
       stagger: a,
       scrollTrigger: { trigger: t, start: "top 85%" },
     });
   }
 } else {
   if (e > 0 && !r) {
     let r = new SplitText(t, { type: "chars, words" });
     gsap.from(r.words, {
       duration: 1,
       delay: i,
       x: e,
       autoAlpha: 0,
       stagger: a,
     });
   }
   if (r > 0 && !e) {
     let e = new SplitText(t, { type: "chars, words" });
     gsap.from(e.words, {
       duration: 1,
       delay: i,
       y: r,
       autoAlpha: 0,
       stagger: a,
     });
   }
   if (r > 0 && e > 0) {
     let o = new SplitText(t, { type: "chars, words" });
     gsap.from(o.words, {
       duration: 1,
       delay: i,
       x: e,
       y: r,
       autoAlpha: 0,
       stagger: a,
     });
   }
   if (!e && !r) {
     let e = new SplitText(t, { type: "chars, words" });
     gsap.from(e.words, {
       duration: 1,
       delay: i,
       x: 20,
       autoAlpha: 0,
       stagger: a,
     });
   }
 }
});
const fadeArray = gsap.utils.toArray(".has_fade_anim");
fadeArray.forEach((t, a) => {
 var e = "bottom",
   r = 1,
   o = 1.5,
   i = 50,
   s = 0.5,
   g = "power2.out";
 t.getAttribute("data-fade-offset") &&
   (i = t.getAttribute("data-fade-offset")),
   t.getAttribute("data-duration") && (o = t.getAttribute("data-duration")),
   t.getAttribute("data-fade-from") && (e = t.getAttribute("data-fade-from")),
   t.getAttribute("data-on-scroll") && (r = t.getAttribute("data-on-scroll")),
   t.getAttribute("data-delay") && (s = t.getAttribute("data-delay")),
   t.getAttribute("data-ease") && (g = t.getAttribute("data-ease")),
   1 == r
     ? ("top" == e &&
         gsap.from(t, {
           y: -i,
           opacity: 0,
           ease: g,
           duration: o,
           delay: s,
           scrollTrigger: { trigger: t, start: "top 85%", scroller:"[data-scroll-container]" },
         }),
       "left" == e &&
         gsap.from(t, {
           x: -i,
           opacity: 0,
           ease: g,
           duration: o,
           delay: s,
           scrollTrigger: { trigger: t, start: "top 85%",scroller:"[data-scroll-container]" },
         }),
       "bottom" == e &&
         gsap.from(t, {
           y: i,
           opacity: 0,
           ease: g,
           duration: o,
           delay: s,
           scrollTrigger: { trigger: t, start: "top 85%",scroller:"[data-scroll-container]" },
         }),
       "right" == e &&
         gsap.from(t, {
           x: i,
           opacity: 0,
           ease: g,
           duration: o,
           delay: s,
           scrollTrigger: { trigger: t, start: "top 85%",scroller:"[data-scroll-container]" },
         }),
       "in" == e &&
         gsap.from(t, {
           opacity: 0,
           ease: g,
           duration: o,
           delay: s,
           scrollTrigger: { trigger: t, start: "top 85%",scroller:"[data-scroll-container]" },
         }))
     : ("top" == e &&
         gsap.from(t, { y: -i, opacity: 0, ease: g, duration: o, delay: s }),
       "left" == e &&
         gsap.from(t, { x: -i, opacity: 0, ease: g, duration: o, delay: s }),
       "bottom" == e &&
         gsap.from(t, { y: i, opacity: 0, ease: g, duration: o, delay: s }),
       "right" == e &&
         gsap.from(t, { x: i, opacity: 0, ease: g, duration: o, delay: s }),
       "in" == e &&
         gsap.from(t, { opacity: 0, ease: g, duration: o, delay: s }));
});
const anim_reveal = document.querySelectorAll(".has_text_reveal_anim");
anim_reveal.forEach((t) => {
 var a = 1.5,
   e = 1,
   r = 0.02,
   o = 0.05;
 t.getAttribute("data-duration") && (a = t.getAttribute("data-duration")),
   t.getAttribute("data-on-scroll") && (e = t.getAttribute("data-on-scroll")),
   t.getAttribute("data-stagger") && (r = t.getAttribute("data-stagger")),
   t.getAttribute("data-delay") && (o = t.getAttribute("data-delay")),
   (t.split = new SplitText(t, {
     type: "lines,words,chars",
     linesClass: "anim-reveal-line",
   })),
   (t.anim =
     1 == e
       ? gsap.from(t.split.chars, {
           scrollTrigger: { trigger: t, start: "top 85%",scroller: "[data-scroll-container]" },
           duration: a,
           delay: o,
           ease: "circ.out",
           y: 80,
           stagger: r,
           opacity: 0,
         })
       : gsap.from(t.split.chars, {
           duration: a,
           delay: o,
           ease: "circ.out",
           y: 80,
           stagger: r,
           opacity: 0,
         }));
});
var has_image_zoom = document.querySelectorAll(".has_image_zoom img");
has_image_zoom.forEach((t) => {
 gsap.to(t, {
   scrollTrigger: { trigger: t, start: "top top", scrub: !0 },
   scale: 1.15,
 });
});


/* anims end */

window.addEventListener("load", function(event) {
   ScrollTrigger.refresh();
 });


 ScrollTrigger.addEventListener("refresh", () => locoscroll.update());
 ScrollTrigger.refresh();




});
