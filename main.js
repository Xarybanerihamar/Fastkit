(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const setHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const required = [...form.querySelectorAll('[required]')];
      let valid = true;
      required.forEach(field => {
        field.classList.remove('invalid');
        if (!field.value.trim() || (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value.trim()))) {
          field.classList.add('invalid');
          valid = false;
        }
      });
      if (!valid) {
        const first = form.querySelector('.invalid');
        first?.focus();
        return;
      }
      const success = form.querySelector('[data-form-success]');
      success?.classList.add('show');
      form.reset();
      success?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
})();
