/* =====================================================
   Advance Study — Site scripts
===================================================== */
(function () {
  "use strict";

  /* ---------- Sticky header: shadow on scroll, hide on scroll down ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var lastScrollY = window.scrollY;
    var headerHeight = function () { return header.offsetHeight; };

    var onScroll = function () {
      var currentY = window.scrollY;
      header.classList.toggle('scrolled', currentY > 8);

      if (currentY <= 8) {
        header.classList.remove('nav-hidden');
      } else if (currentY > lastScrollY && currentY > headerHeight()) {
        header.classList.add('nav-hidden');
      } else if (currentY < lastScrollY) {
        header.classList.remove('nav-hidden');
      }
      lastScrollY = currentY;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    window.addEventListener('mousemove', function (e) {
      if (e.clientY < 90) header.classList.remove('nav-hidden');
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  if (navToggle && header) {
    navToggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('menu-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------- Scroll-reveal animation: fades/slides sections and cards in as you scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal-group]');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ---------- Animated counters (numbers that count up when revealed) ---------- */
  var counters = document.querySelectorAll('[data-count-to]');
  if (counters.length && 'IntersectionObserver' in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        countIO.unobserve(el);
        var target = el.getAttribute('data-count-to');
        var suffix = el.getAttribute('data-count-suffix') || '';
        var numeric = parseFloat(target);
        if (isNaN(numeric)) return;
        var duration = 1100;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = Math.round(numeric * eased);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countIO.observe(el); });
  }

  /* ---------- Back to top button ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 640);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Hero slideshow (auto-advancing, with manual controls) ---------- */
  var slideshow = document.getElementById('heroSlideshow');
  if (slideshow) {
    var slides = Array.prototype.slice.call(slideshow.querySelectorAll('.slide'));
    var dots = Array.prototype.slice.call(slideshow.querySelectorAll('.dot'));
    var prevBtn = document.getElementById('slidePrev');
    var nextBtn = document.getElementById('slideNext');
    var current = 0;
    var timer = null;
    var INTERVAL = 5000;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function startAuto() { stopAuto(); timer = setInterval(next, INTERVAL); }
    function stopAuto() { if (timer) clearInterval(timer); }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAuto(); });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () { goTo(parseInt(dot.dataset.index, 10)); startAuto(); });
    });
    slideshow.addEventListener('mouseenter', stopAuto);
    slideshow.addEventListener('mouseleave', startAuto);
    startAuto();
  }

  /* ---------- Destinations data + interactive selector ---------- */
  /* ---------- Destinations data + interactive selector ----------
     This data is injected fresh into destinations.html by the admin
     panel's Publish button, from the live database. The empty fallback
     below only applies if this page is ever viewed without going
     through Publish first. */
  var DESTINATIONS = window.__DESTINATIONS_DATA || {};

  var destList = document.getElementById('destList');
  var destPanel = document.getElementById('destPanel');
  var destPhotoImg = document.getElementById('destPhotoImg');

  function renderDestination(id) {
    var d = DESTINATIONS[id];
    if (!d || !destPanel) return;

    if (destPhotoImg) {
      destPhotoImg.classList.remove('is-shown');
      var img = new Image();
      img.onload = function () {
        destPhotoImg.src = d.photo;
        destPhotoImg.alt = d.name + " hospitality destination";
        requestAnimationFrame(function () { destPhotoImg.classList.add('is-shown'); });
      };
      img.src = d.photo;
    }

    destPanel.style.animation = 'none';
    void destPanel.offsetWidth;
    destPanel.style.animation = '';
    destPanel.innerHTML =
      '<div class="eyebrow-row">' +
        '<div class="panel-title"><img class="dest-icon" src="' + d.icon + '" alt="" width="48" height="48"><h2>' + d.name + '</h2></div>' +
        '<span class="visa-pill">' + d.visa + '</span>' +
      '</div>' +
      '<p class="why">' + d.why + '</p>' +
      '<div class="dest-facts">' +
        '<div class="fact"><h4>Typical roles</h4><p>' + d.roles + '</p></div>' +
        '<div class="fact"><h4>Typical duration</h4><p>' + d.duration + '</p></div>' +
        '<div class="fact"><h4>Visa detail</h4><p>' + d.extra + '</p></div>' +
      '</div>' +
      '<div class="good-know">' + d.goodToKnow + '</div>';
  }

  if (destList && destPanel) {
    destList.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('button') : null;
      if (!btn) return;
      var buttons = destList.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) buttons[i].classList.remove('active');
      btn.classList.add('active');
      renderDestination(btn.dataset.id);
      history.replaceState(null, '', '#' + btn.dataset.id);
    });

    var initial = window.location.hash.replace('#', '') || 'uae';
    var initialBtn = destList.querySelector('button[data-id="' + initial + '"]') || destList.querySelector('button');
    destList.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
    initialBtn.classList.add('active');
    renderDestination(initialBtn.dataset.id);
  }

  /* ---------- Contact form submission (saves directly to Supabase) ---------- */
  var contactForm = document.getElementById('contactForm');
  var contactThankYou = document.getElementById('contactThankYou');
  var sendAnotherBtn = document.getElementById('sendAnotherBtn');

  // These two values are safe to publish in client-side code: the anon key
  // only allows what the database's security rules permit, which for this
  // key is limited to inserting new enquiries -- it cannot read, edit, or
  // delete anything.
  var SUPABASE_URL = 'https://amqkzdubjdnbfzmctoau.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtcWt6ZHViamRuYmZ6bWN0b2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzMjYwNzgsImV4cCI6MjEwNDkwMjA3OH0.8EzwxF6HMrkkC5shc7HxAV09lQ33Ey3NgyTTNbkX-z8';

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = document.getElementById('contactSubmitBtn');
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      var formData = new FormData(contactForm);
      var payload = {
        full_name: formData.get('Name') || '',
        pronouns: formData.get('Pronouns') || null,
        purpose: formData.get('Purpose') || null,
        preferred_contact: formData.get('PreferredContact') || null,
        email: formData.get('Email') || '',
        phone: formData.get('Phone') || null,
        message: formData.get('Message') || null,
        source_page: window.location.pathname
      };

      fetch(SUPABASE_URL + '/rest/v1/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Network response was not ok');
          contactForm.style.display = 'none';
          contactThankYou.style.display = 'block';
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          alert("Something went wrong sending your message. Please try again, or email us directly at info@advstudy.com.");
        });
    });
  }

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', function () {
      contactThankYou.style.display = 'none';
      contactForm.reset();
      contactForm.style.display = '';
      var submitBtn = document.getElementById('contactSubmitBtn');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    });
  }

  /* ---------- FAQ page: category browsing, search, accordion ---------- */
  var ICONS = {
    general: '<svg width="38" height="38" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="12.5" stroke="#073F3E" stroke-width="1.4"/><path d="M17 15.5v8" stroke="#FFB950" stroke-width="2" stroke-linecap="round"/><circle cx="17" cy="11.2" r="1.4" fill="#FFB950"/></svg>',
    training: '<svg width="38" height="38" viewBox="0 0 34 34" fill="none"><path d="M17 8 L29 13.5 L17 19 L5 13.5 Z" stroke="#073F3E" stroke-width="1.4" stroke-linejoin="round"/><path d="M10.5 16.2v6c0 1.4 2.9 3.3 6.5 3.3s6.5-1.9 6.5-3.3v-6" stroke="#073F3E" stroke-width="1.4"/><path d="M29 13.5v6.5" stroke="#FFB950" stroke-width="2" stroke-linecap="round"/></svg>',
    placement: '<svg width="38" height="38" viewBox="0 0 34 34" fill="none"><rect x="6" y="13" width="22" height="14" rx="1.8" stroke="#073F3E" stroke-width="1.4"/><path d="M12.5 13v-2.6c0-1 .8-1.8 1.8-1.8h5.4c1 0 1.8.8 1.8 1.8V13" stroke="#073F3E" stroke-width="1.4"/><path d="M6 18.5h22" stroke="#FFB950" stroke-width="2"/></svg>',
    visa: '<svg width="38" height="38" viewBox="0 0 34 34" fill="none"><rect x="8" y="5" width="18" height="24" rx="2" stroke="#073F3E" stroke-width="1.4"/><circle cx="17" cy="13" r="3" stroke="#FFB950" stroke-width="1.6"/><path d="M12 23c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" stroke="#073F3E" stroke-width="1.4" stroke-linecap="round"/></svg>',
    destinations: '<svg width="38" height="38" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="12" stroke="#073F3E" stroke-width="1.4"/><ellipse cx="17" cy="17" rx="5.2" ry="12" stroke="#073F3E" stroke-width="1.1" opacity="0.6"/><path d="M5 17h24" stroke="#073F3E" stroke-width="1.1" opacity="0.6"/><circle cx="21.5" cy="12" r="2" fill="#FFB950"/></svg>',
    costs: '<svg width="38" height="38" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="12" stroke="#073F3E" stroke-width="1.4"/><path d="M20.5 13.2c-.4-1-1.6-1.8-3.3-1.8-2 0-3.6 1.1-3.6 2.6s1.5 2 3.6 2.4c2.1.4 3.6 1 3.6 2.5s-1.6 2.6-3.6 2.6c-1.7 0-2.9-.8-3.3-1.8" stroke="#FFB950" stroke-width="1.6" stroke-linecap="round"/><path d="M17 9.5v15" stroke="#FFB950" stroke-width="1.6" stroke-linecap="round"/></svg>',
    start: '<svg width="38" height="38" viewBox="0 0 34 34" fill="none"><path d="M17 6c4 3 6 7.5 6 12.5 0 3-1 5.5-2.3 7.3l-1-3.3-2.7 2-2.7-2-1 3.3C12 24 11 21.5 11 18.5 11 13.5 13 9 17 6Z" stroke="#073F3E" stroke-width="1.4" stroke-linejoin="round"/><circle cx="17" cy="15.5" r="2.3" fill="#FFB950"/></svg>'
  };

  /* ---------- FAQ data ----------
     Injected fresh into faq.html by the admin panel's Publish button,
     from the live database. Empty fallback only applies if this page
     is ever viewed without going through Publish first. */
  var FAQ_DATA = window.__FAQ_DATA || {};

  var faqSidebar = document.getElementById('faqSidebar');
  var faqPanel = document.getElementById('faqPanel');
  var faqSearch = document.getElementById('faqSearch');

  if (faqSidebar && faqPanel) {
    var currentCat = "general";

    function escapeHtml(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function itemHtml(q, a, badge) {
      var badgeHtml = badge ? '<span class="faq-badge">' + escapeHtml(badge) + '</span><br>' : '';
      return '' +
        '<div class="faq-item">' +
          '<button class="faq-q" type="button" aria-expanded="false">' +
            '<span>' + badgeHtml + escapeHtml(q) + '</span>' +
            '<span class="faq-plus" aria-hidden="true"></span>' +
          '</button>' +
          '<div class="faq-a"><div><p>' + escapeHtml(a) + '</p></div></div>' +
        '</div>';
    }

    function renderCategory(key) {
      var cat = FAQ_DATA[key];
      if (!cat) return;
      var html = cat.items.map(function (it) { return itemHtml(it.q, it.a, null); }).join("");
      faqPanel.innerHTML =
        '<div class="faq-panel-head">' + (ICONS[key] || '') + '<h3>' + escapeHtml(cat.title) + '</h3></div>' +
        '<div class="faq-list">' + html + '</div>';
    }

    function renderSearch(query) {
      var q = query.trim().toLowerCase();
      var matches = [];
      Object.keys(FAQ_DATA).forEach(function (key) {
        FAQ_DATA[key].items.forEach(function (it) {
          if (it.q.toLowerCase().indexOf(q) !== -1 || it.a.toLowerCase().indexOf(q) !== -1) {
            matches.push({ q: it.q, a: it.a, cat: FAQ_DATA[key].title });
          }
        });
      });
      if (matches.length === 0) {
        faqPanel.innerHTML = '<div class="faq-empty">No questions match &ldquo;' + escapeHtml(query) + '&rdquo;. Try a different word, or <a href="index.html#contact">contact us</a> directly.</div>';
        return;
      }
      var html = matches.map(function (m) { return itemHtml(m.q, m.a, m.cat); }).join("");
      faqPanel.innerHTML = '<div class="faq-result-count">' + matches.length + ' question' + (matches.length === 1 ? '' : 's') + ' found</div><div class="faq-list">' + html + '</div>';
    }

    faqSidebar.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('button') : null;
      if (!btn) return;
      var buttons = faqSidebar.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) buttons[i].classList.remove('faq-active');
      btn.classList.add('faq-active');
      currentCat = btn.getAttribute('data-cat');
      if (faqSearch) faqSearch.value = '';
      renderCategory(currentCat);
    });

    faqPanel.addEventListener('click', function (e) {
      var q = e.target.closest ? e.target.closest('.faq-q') : null;
      if (!q) return;
      var item = q.closest('.faq-item');
      var wasOpen = item.classList.contains('faq-open');
      var openItems = faqPanel.querySelectorAll('.faq-item.faq-open');
      for (var i = 0; i < openItems.length; i++) {
        openItems[i].classList.remove('faq-open');
        var openQ = openItems[i].querySelector('.faq-q');
        if (openQ) openQ.setAttribute('aria-expanded', 'false');
      }
      if (!wasOpen) {
        item.classList.add('faq-open');
        q.setAttribute('aria-expanded', 'true');
      }
    });

    if (faqSearch) {
      faqSearch.addEventListener('input', function () {
        var val = faqSearch.value;
        var buttons = faqSidebar.querySelectorAll('button');
        if (val.trim().length === 0) {
          for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle('faq-active', buttons[i].getAttribute('data-cat') === currentCat);
          }
          renderCategory(currentCat);
        } else {
          for (var j = 0; j < buttons.length; j++) buttons[j].classList.remove('faq-active');
          renderSearch(val);
        }
      });
    }

    renderCategory(currentCat);
  }
  /* ---------- Match "ADVANCE STUDY" brand text width to the first hero heading line ---------- */
  var brandTag = document.querySelector('.brand-tag');
  var heroLine1 = document.getElementById('heroLine1');
  if (brandTag && heroLine1) {
    var matchTimer = null;

    function matchBrandWidth() {
      // Reset to the CSS-defined size first so we measure from a known baseline each time
      brandTag.style.fontSize = '';
      var targetWidth = heroLine1.getBoundingClientRect().width;
      var currentWidth = brandTag.getBoundingClientRect().width;
      if (!targetWidth || !currentWidth) return;
      var baseSize = parseFloat(window.getComputedStyle(brandTag).fontSize);
      var newSize = baseSize * (targetWidth / currentWidth);
      brandTag.style.fontSize = newSize + 'px';
      // Re-check once more in case the new size shifted line-wrapping/rounding
      var finalWidth = brandTag.getBoundingClientRect().width;
      if (finalWidth && targetWidth) {
        var correction = newSize * (targetWidth / finalWidth);
        brandTag.style.fontSize = correction + 'px';
      }
    }

    function scheduleMatch() {
      clearTimeout(matchTimer);
      matchTimer = setTimeout(matchBrandWidth, 80);
    }

    scheduleMatch();
    window.addEventListener('resize', scheduleMatch);
    window.addEventListener('load', scheduleMatch);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleMatch).catch(function () {});
    }
  }

})();
