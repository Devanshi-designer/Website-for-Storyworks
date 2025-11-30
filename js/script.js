/* main.js
 - Mobile nav toggle
 - Carousel with auto, manual, swipe
 - Read more toggle
 - Smooth scrolling for in-page anchors
 - Form validation (contact forms across pages)
 - Simple reveal animations for elements with .section-reveal
*/

/* Helpers */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* Year */
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  ['#year','#year2','#year3'].forEach(id=>{
    const el = document.querySelector(id);
    if(el) el.textContent = y;
  });

  // Reveal on load
  setTimeout(()=> {
    document.querySelectorAll('.section-reveal').forEach(s => s.classList.add('reveal'));
    observeReveals();
  }, 80);
});

/* Mobile nav */
(function(){
  const toggle = $('#navToggle');
  const mobile = $('#mobileNav');
  if(!toggle || !mobile) return;
  toggle.addEventListener('click', ()=>{
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    mobile.hidden = open;
  });
  // close when link clicked
  mobile.addEventListener('click', (e)=> {
    if(e.target.tagName === 'A') mobile.hidden = true;
  });
})();

/* Smooth scroll for in-page anchors */
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a');
  if(!a) return;
  if(a.pathname === location.pathname && a.hash) {
    const target = document.querySelector(a.hash);
    if(target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null, '', a.hash);
    }
  }
});

/* Read more */
(function(){
  const btn = document.getElementById('readToggle');
  if (!btn) return;
  const long = document.getElementById('longText');
  btn.addEventListener('click', ()=>{
    const collapsed = long.classList.toggle('collapsed');
    btn.textContent = collapsed ? 'Read more' : 'Read less';
  });
})();

/* Carousel (supports swipe) */
(function(){
  const carousel = document.getElementById('heroCarousel');
  if(!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prev = carousel.querySelector('.carousel-btn.prev');
  const next = carousel.querySelector('.carousel-btn.next');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  let idx = 0;
  const total = slides.length;
  let width = carousel.clientWidth;

  // build dots
  for(let i=0;i<total;i++){
    const btn = document.createElement('button');
    if(i===0) btn.classList.add('active');
    dotsContainer.appendChild(btn);
    btn.addEventListener('click', ()=> show(i));
  }

  function resize(){ width = carousel.clientWidth; show(idx); }
  window.addEventListener('resize', resize);

  function show(i){
    idx = (i + total) % total;
    track.style.transform = `translateX(-${idx * 100}%)`;
    Array.from(dotsContainer.children).forEach((b,bi)=> b.classList.toggle('active', bi===idx));
  }

  prev.addEventListener('click', ()=> show(idx-1));
  next.addEventListener('click', ()=> show(idx+1));

  // auto rotate
  let auto = setInterval(()=> show(idx+1), 4500);
  carousel.addEventListener('mouseenter', ()=> clearInterval(auto));
  carousel.addEventListener('mouseleave', ()=> auto = setInterval(()=> show(idx+1), 4500));

  // touch swipe
  let startX = 0, deltaX = 0;
  carousel.addEventListener('touchstart', e=> startX = e.touches[0].clientX);
  carousel.addEventListener('touchmove', e=> deltaX = e.touches[0].clientX - startX);
  carousel.addEventListener('touchend', ()=>{
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) show(idx+1); else show(idx-1);
    }
    startX = deltaX = 0;
  });

})();

/* Simple form validation (works for the contactForm on contact.html) */
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const message = form.querySelector('#message');
  const errName = form.querySelector('#err-name');
  const errEmail = form.querySelector('#err-email');
  const errMessage = form.querySelector('#err-message');
  const notice = form.querySelector('#formNotice');

  function isEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
  }

  function clearError(el){
    if(!el) return;
    el.textContent = '';
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let valid = true;

    clearError(errName); clearError(errEmail); clearError(errMessage);
    [name,email,message].forEach(i => { if(i) i.classList.remove('input-error'); });

    if(!name.value.trim()){ valid=false; errName.textContent='Please enter your name'; name.classList.add('input-error'); }
    if(!email.value.trim()){ valid=false; errEmail.textContent='Please enter your email'; email.classList.add('input-error'); }
    else if(!isEmail(email.value.trim())){ valid=false; errEmail.textContent='Please enter a valid email'; email.classList.add('input-error'); }
    if(!message.value.trim()){ valid=false; errMessage.textContent='Please enter a message'; message.classList.add('input-error'); }

    if(valid){
      // demo: show notice and reset (no server)
      notice.hidden = false;
      form.reset();
      setTimeout(()=> notice.hidden = true, 6000);
    } else {
      notice.hidden = true;
    }
  });

  // live feedback
  [name,email,message].forEach(el=>{
    if(!el) return;
    el.addEventListener('input', ()=>{
      const id = el.id;
      if(id === 'email') {
        if(el.value && !isEmail(el.value)) errEmail.textContent = 'Invalid email format'; else errEmail.textContent='';
      } else {
        const target = id === 'name' ? errName : errMessage;
        if(!el.value.trim()) target.textContent = 'This field is required'; else target.textContent = '';
      }
    });
  });
})();

/* Reveal on scroll using IntersectionObserver */
function observeReveals(){
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.12});
  items.forEach(i=> io.observe(i));
}
