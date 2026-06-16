// Initialize Lenis smooth scroll
const lenis = new Lenis();

// Synchronize Lenis scroll with GSAP ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis to GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing for GSAP because smooth scroll handles it
gsap.ticker.lagSmoothing(0);

let aboutbg = gsap.timeline({
  scrollTrigger: {
    trigger: "#animation1",
    start: "-30% 90%",
    end: "bottom 0%",
    scrub: true,
    markers: false,
  },
});

aboutbg.to("#animation1", {
  clipPath: "circle(100%)",
});

let education = gsap.timeline({
  scrollTrigger: {
    trigger: "#animation2",
    start: "bottom 50%",
    end: "200% 50%",
    scrub: true,
    markers: false,
  },
});

education.to("#animation2", {
  y: "0%",
});

let about = gsap.timeline({
  scrollTrigger: {
    trigger: ".slideUp",
    start: "top 100%",
    end: "bottom 50%",
    scrub: false,
    markers: false,
    toggleActions: "play reverse play reverse",
  },
});

about.to(".slideUp", {
  y: "0%",
  opacity: "100%",
});
