/* ===============================
   MATRIX LOADER
================================ */

const loader = document.getElementById("matrix-loader");
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

function resizeMatrix(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeMatrix();
window.addEventListener("resize", resizeMatrix);

const letters = ["0","1"];
const fontSize = 18;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix(){
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#22ff88";
  ctx.font = fontSize + "px JetBrains Mono";

  for(let i=0;i<drops.length;i++){
    const text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text, i*fontSize, drops[i]*fontSize);

    if(drops[i]*fontSize > canvas.height && Math.random() > 0.975){
      drops[i] = 0;
    }

    drops[i]++;
  }
}

const matrixInterval = setInterval(drawMatrix, 33);


/* ===============================
   START SITE AFTER LOADER
================================ */

setTimeout(() => {
  clearInterval(matrixInterval);
  loader.classList.add("hide");

  setTimeout(() => {
    loader.remove();
    startSite();
  }, 1200);

}, 2600);



/* ===============================
   YOUR ORIGINAL SITE LOGIC
================================ */

function startSite(){

  // reveal animation
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
  });


  // side navigation active state
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + id
          );
        });
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach(sec => navObserver.observe(sec));


  // profile hide on scroll + show on hover zone
  const profile = document.getElementById("profile");
  const zone = document.querySelector(".profile-zone");

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;

    if (current > lastScroll && current > 80) {
      profile.style.opacity = "0";
      profile.style.pointerEvents = "none";
      profile.style.transform = "translateX(-20px)";
    }

    lastScroll = current;
  });

  zone.addEventListener("mouseenter", () => {
    profile.style.opacity = "1";
    profile.style.pointerEvents = "auto";
    profile.style.transform = "translateX(0)";
  });


  // hero glow follow mouse
  const hero = document.querySelector("#home");
  const glow = hero.querySelector(".hero-glow");

  hero.addEventListener("mousemove", e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    glow.style.background =
      `radial-gradient(circle at ${x}% ${y}%, rgba(34,255,136,.12), transparent 60%)`;
  });


  // footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  document.querySelectorAll(".social-card").forEach(card=>{
    card.style.cursor="pointer";
    card.addEventListener("click",()=>{
      const page = card.getAttribute("data-page");
      const url = card.getAttribute("data-url");
  
      if(page){
        // open matrix page in new window
        window.open(page,"_blank","width=900,height=700");
      } else if(url){
        window.open(url,"_blank","noopener");
      }
    });
  });
  
  
}
