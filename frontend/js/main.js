document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;

  // Theme
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }
  toggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });

  // Nav scroll
  const navbar = document.querySelector('.navbar');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', scrollY > 10);
    let cur = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }, { passive: true });

  // Mobile
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', menu.classList.contains('open'));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // WeChat modal
  const wx = document.getElementById('wechat-modal');
  window.showWechat = () => wx.classList.add('open');
  window.hideWechat = () => wx.classList.remove('open');
  wx.addEventListener('click', e => { if (e.target === wx) hideWechat(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideWechat(); });

  // Publication contributions toggle
  document.querySelectorAll('.pub-contrib-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.getAttribute('aria-controls'));
      const open = target.classList.contains('open');
      target.classList.toggle('open');
      btn.setAttribute('aria-expanded', !open);
    });
  });

  // Figure toggle
  document.querySelectorAll('.pub-figure-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.getAttribute('aria-controls'));
      const open = target.classList.contains('open');
      target.classList.toggle('open');
      btn.classList.toggle('open', !open);
      btn.setAttribute('aria-expanded', !open);
    });
  });

  // Back to top
  const btt = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => btt.classList.toggle('visible', scrollY > 400), { passive: true });
  btt.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Smooth scroll for hash links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
