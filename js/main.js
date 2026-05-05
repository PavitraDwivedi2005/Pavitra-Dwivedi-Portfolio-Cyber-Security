// Main interactions & animations
document.addEventListener('DOMContentLoaded', () => {

  // Custom cursor
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if(dot && ring){
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
    (function movRing(){rx+=(mx-rx)*0.15;ry+=(my-ry)*0.15;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(movRing);})();
    document.querySelectorAll('a,button,.project-card,.skill-tag,.cert-card,.contact-card,.blog-card').forEach(el=>{
      el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
      el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
    });
  }

  // Navbar scroll
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll',()=>{
    nav && nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hamburger
  const ham = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if(ham && links){
    ham.addEventListener('click',()=>{
      links.classList.toggle('active');
      ham.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('active')));
  }

  // Typed effect
  const typed = document.querySelector('.hero-typed');
  if(typed){
    const strings = [
      'Backend Developer',
      'Cybersecurity Enthusiast',
      'Cloud & DevOps Explorer',
      'AI / ML Researcher',
      'Open Source Contributor'
    ];
    let si=0,ci=0,deleting=false;
    function type(){
      const cur = strings[si];
      typed.innerHTML = (deleting ? cur.substring(0,ci--) : cur.substring(0,ci++)) + '<span class="cursor-blink">|</span>';
      let speed = deleting ? 40 : 80;
      if(!deleting && ci > cur.length){ speed=1800; deleting=true; }
      if(deleting && ci < 0){ deleting=false; si=(si+1)%strings.length; speed=400; }
      setTimeout(type, speed);
    }
    type();
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObs.unobserve(e.target);}});
  },{threshold:0.15});
  reveals.forEach(el=>revealObs.observe(el));

  // Counter animation for stats
  document.querySelectorAll('.stat-number[data-count]').forEach(el=>{
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.ceil(target/60);
          const timer = setInterval(()=>{
            current += step;
            if(current >= target){ current=target; clearInterval(timer); }
            el.textContent = current + suffix;
          }, 25);
          obs.unobserve(el);
        }
      });
    },{threshold:0.5});
    obs.observe(el);
  });

  // FAQ toggles
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const item = q.closest('.faq-item');
      item.classList.toggle('open');
      const arrow = q.querySelector('.faq-arrow');
      if(arrow) arrow.textContent = item.classList.contains('open') ? '−' : '+';
    });
  });

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll',()=>{
    const scrollY = window.scrollY + 100;
    sections.forEach(sec=>{
      const top = sec.offsetTop, h = sec.offsetHeight, id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if(link){
        if(scrollY >= top && scrollY < top+h) link.classList.add('active');
        else link.classList.remove('active');
      }
    });
  });

  // Smooth parallax on hero elements
  const heroContent = document.querySelector('.hero-content');
  if(heroContent){
    window.addEventListener('scroll',()=>{
      const s = window.scrollY;
      heroContent.style.transform = `translateY(${s*0.3}px)`;
      heroContent.style.opacity = 1 - s/600;
    });
  }

  // Contact form handler
  const form = document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = 'Message Sent! ✓';
      btn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
      setTimeout(()=>{btn.textContent='Send Message →';btn.style.background='';form.reset();},3000);
    });
  }
});
