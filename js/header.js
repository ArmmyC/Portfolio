window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const headerbg = document.querySelector("#header-bg");
  header.classList.toggle("sticky", window.scrollY > 50);
  headerbg.classList.toggle("sticky", window.scrollY > 50);
});

