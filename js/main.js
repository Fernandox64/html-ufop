document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header sticky shadow ---------- */
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
    backToTop.classList.toggle('show', window.scrollY > 500);
  });

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  var navOverlay = document.getElementById('navOverlay');

  function closeMenu() {
    navMenu.classList.remove('open');
    navOverlay.classList.remove('show');
    navToggle.innerHTML = '<i class="bi bi-list"></i>';
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('open');
    navOverlay.classList.toggle('show', isOpen);
    navToggle.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
  });

  navOverlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.nav-menu > li > a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 991 && link.parentElement.classList.contains('has-dropdown')) return;
      closeMenu();
    });
  });

  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  /* ---------- Hero slider ---------- */
  var hsRoot = document.querySelector('[data-carousel="hero"]');
  if (hsRoot) {
    var hsTrack = hsRoot.querySelector('[data-track]');
    var hsDotsWrap = hsRoot.querySelector('[data-dots]');
    var hsSlides = hsTrack.children;
    var hsCurrent = 0;
    var hsTimer;

    for (var h = 0; h < hsSlides.length; h++) {
      var hsDot = document.createElement('button');
      if (h === 0) hsDot.classList.add('active');
      hsDot.setAttribute('aria-label', 'Slide ' + (h + 1));
      (function (idx) {
        hsDot.addEventListener('click', function () { goToHsSlide(idx); });
      })(h);
      hsDotsWrap.appendChild(hsDot);
    }

    function goToHsSlide(idx) {
      hsCurrent = (idx + hsSlides.length) % hsSlides.length;
      hsTrack.style.transform = 'translateX(-' + (hsCurrent * 100) + '%)';
      Array.prototype.forEach.call(hsDotsWrap.children, function (d, i) {
        d.classList.toggle('active', i === hsCurrent);
      });
    }

    function nextHsSlide() { goToHsSlide(hsCurrent + 1); }
    function prevHsSlide() { goToHsSlide(hsCurrent - 1); }

    hsRoot.querySelector('[data-next]').addEventListener('click', nextHsSlide);
    hsRoot.querySelector('[data-prev]').addEventListener('click', prevHsSlide);

    function startHsAuto() { hsTimer = setInterval(nextHsSlide, 6000); }
    startHsAuto();

    hsRoot.addEventListener('mouseenter', function () { clearInterval(hsTimer); });
    hsRoot.addEventListener('mouseleave', startHsAuto);
  }

  /* ---------- Course filter ---------- */
  var filterButtons = document.querySelectorAll('#filterTabs button');
  var courseCards = document.querySelectorAll('#coursesGrid .course-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');

      courseCards.forEach(function (card) {
        var show = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('.counter');
  var counted = false;

  function animateCounters() {
    if (counted) return;
    counted = true;
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var current = 0;
      var step = Math.max(1, Math.ceil(target / 80));
      var timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString('pt-BR') + (current === target ? '+' : '');
      }, 20);
    });
  }

  var statsSection = document.querySelector('.stats');
  if (statsSection && 'IntersectionObserver' in window) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);
  } else {
    animateCounters();
  }

  /* ---------- Testimonials slider ---------- */
  var track = document.getElementById('tTrack');
  var dotsWrap = document.getElementById('tDots');
  var slides = track ? track.children : [];
  var current = 0;
  var autoTimer;

  if (track && slides.length) {
    for (var i = 0; i < slides.length; i++) {
      var dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', 'Depoimento ' + (i + 1));
      (function (idx) {
        dot.addEventListener('click', function () { goToSlide(idx); });
      })(i);
      dotsWrap.appendChild(dot);
    }

    function goToSlide(idx) {
      current = idx;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
        d.classList.toggle('active', i === idx);
      });
    }

    function nextSlide() {
      goToSlide((current + 1) % slides.length);
    }

    function startAuto() {
      autoTimer = setInterval(nextSlide, 5000);
    }

    startAuto();

    track.parentElement.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
    track.parentElement.addEventListener('mouseleave', startAuto);
  }

  /* ---------- Newsletter form ---------- */
  var newsletterForm = document.getElementById('newsletterForm');
  var newsletterMsg = document.getElementById('newsletterMsg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      newsletterMsg.classList.add('show');
      newsletterForm.reset();
      setTimeout(function () { newsletterMsg.classList.remove('show'); }, 4000);
    });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
