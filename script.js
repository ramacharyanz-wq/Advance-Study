// ---------- Sticky header shadow on scroll ----------
const header = document.getElementById('siteHeader');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
if (navToggle && header) {
  navToggle.addEventListener('click', () => {
    header.classList.toggle('menu-open');
  });
}

// ---------- Destination auto-slider pauses on hover/focus via CSS (see .dest-scroller:hover) ----------


// ---------- Hero slideshow (auto-advancing, with manual controls) ----------
const slideshow = document.getElementById('heroSlideshow');
if (slideshow) {
  const slides = Array.from(slideshow.querySelectorAll('.slide'));
  const dots = Array.from(slideshow.querySelectorAll('.dot'));
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  let current = 0;
  let timer = null;
  const INTERVAL = 4500;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, INTERVAL);
  }
  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  nextBtn.addEventListener('click', () => { next(); startAuto(); });
  prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.index, 10)); startAuto(); });
  });

  slideshow.addEventListener('mouseenter', stopAuto);
  slideshow.addEventListener('mouseleave', startAuto);

  startAuto();
}


const DESTINATIONS = {
  nepal: {
    name: "Nepal",
    icon: "assets/destinations/nepal.svg",
    photo: "assets/destinations/photos/nepal.jpg",
    why: "Nepal is where your journey begins. Our training events, held throughout the year, give you the hands-on foundation you need before heading abroad, and for students not yet ready to relocate internationally, we also connect you with domestic hospitality opportunities.",
    visa: "No visa needed",
    roles: "Front office, Food & beverage service, Housekeeping, Tour and guest services",
    duration: "Flexible, tied to training event dates",
    extra: "You're a Nepalese citizen training and working in your home country.",
    goodToKnow: "This is the best starting point to build your skills and prepare for an international placement."
  },
  india: {
    name: "India",
    icon: "assets/destinations/india.svg",
    photo: "assets/destinations/photos/india.jpg",
    why: "India's hospitality industry is enormous and fast-growing, with strong demand across five-star hotel chains, resorts, and restaurant groups, and it's the easiest destination for Nepalese students to access.",
    visa: "No visa needed",
    roles: "Food & beverage service, Kitchen and culinary, Front office, Housekeeping",
    duration: "Set by the employer, typically 3–12 months",
    extra: "Under the 1950 India–Nepal Treaty of Peace and Friendship, Nepalese citizens can enter, live, and work in India without a visa or passport. You'll need valid ID, such as your citizenship certificate, voter ID, or a Nepali mission-issued ID.",
    goodToKnow: "Because there's no visa process involved, India is typically the fastest destination to arrange and the lowest-cost to get started in."
  },
  uae: {
    name: "United Arab Emirates",
    icon: "assets/destinations/uae.svg",
    photo: "assets/destinations/photos/uae.jpg",
    why: "The UAE, particularly Dubai, Abu Dhabi, and Sharjah, is one of the world's top luxury hospitality markets, home to five-star hotel brands and a tourism industry that runs year-round.",
    visa: "Employer-sponsored training visa",
    roles: "Food & beverage, Culinary, Front office, Housekeeping, Guest services",
    duration: "6–12 months",
    extra: "Your host hotel or restaurant sponsors your entry permit once you have a confirmed internship offer. Many placements also include a monthly stipend and accommodation.",
    goodToKnow: "UAE hotels actively prefer trained interns from hospitality programs for peak tourist season roles, which works in your favour if you come prepared."
  },
  qatar: {
    name: "Qatar",
    icon: "assets/destinations/qatar.svg",
    photo: "assets/destinations/photos/qatar.jpg",
    why: "Qatar's hospitality sector has grown rapidly since hosting the FIFA World Cup 2022, with major investment in new hotels and continued need for trained international staff.",
    visa: "Employer-sponsored work visa",
    roles: "Front office, Food & beverage, Housekeeping, Event services",
    duration: "Set by the employer",
    extra: "Your host employer manages sponsorship and paperwork once you have a confirmed offer. Processing typically takes 4–8 weeks once sponsorship begins.",
    goodToKnow: "Qatar's hospitality market is projected to keep growing significantly through 2030, meaning strong ongoing demand for trained staff."
  },
  thailand: {
    name: "Thailand",
    icon: "assets/destinations/thailand.svg",
    photo: "assets/destinations/photos/thailand.jpg",
    why: "Thailand's tourism and hospitality industry is one of the most established in Asia, offering exposure to international resort brands alongside a rich service culture.",
    visa: "Non-Immigrant \u201cED\u201d Visa (education-linked)",
    roles: "Front office, Food & beverage, Culinary, Guest services",
    duration: "90 days initially, extendable",
    extra: "This visa requires a formal letter from your host organization confirming the internship. If the internship isn't tied to a formal academic requirement, a different visa and work permit may apply instead.",
    goodToKnow: "It's important your offer letter clearly states the training nature of the role, and we help make sure this is set up correctly."
  },
  turkey: {
    name: "Turkey",
    icon: "assets/destinations/turkey.svg",
    photo: "assets/destinations/photos/turkey.jpg",
    why: "Turkey bridges European and Middle Eastern hospitality standards, with a large and growing tourism sector across Istanbul and its coastal resort regions.",
    visa: "Student Internship Visa",
    roles: "Front office, Food & beverage, Culinary, Guest services",
    duration: "Up to 90 days for short-term placements; longer placements may need a residence permit",
    extra: "Applied for at a Turkish consulate before travel, using a confirmation letter from your host organization. Interns are generally entitled to at least 30% of the local minimum wage.",
    goodToKnow: "Turkey treats mandatory (curriculum-linked) and voluntary internships differently. This affects your visa pathway, so we help confirm which applies to you."
  },
  newzealand: {
    name: "New Zealand",
    icon: "assets/destinations/newzealand.svg",
    photo: "assets/destinations/photos/newzealand.jpg",
    why: "New Zealand offers a high standard of living, strong hospitality training culture, and world-renowned tourism destinations from Auckland to Queenstown.",
    visa: "Student and Trainee Work Visa",
    roles: "Food & beverage service, Culinary, Front office, Housekeeping, Bar service",
    duration: "Up to 6 months",
    extra: "Requires a written job offer and your education provider's confirmation that the placement is tied to your studies. You'll need funds of at least NZD $1,000/month, or an approved sponsor.",
    goodToKnow: "This visa requires a genuine link between the internship and your course of study, and we help structure your application so this connection is clearly documented."
  },
  australia: {
    name: "Australia",
    icon: "assets/destinations/australia.svg",
    photo: "assets/destinations/photos/australia.jpg",
    why: "Australia's hospitality and tourism industry offers structured, high-quality occupational training with strong long-term career value across major cities and coastal regions.",
    visa: "Training Visa (Subclass 407)",
    roles: "Front office, Food & beverage, Culinary, Housekeeping",
    duration: "Up to 2 years",
    extra: "Your sponsor must be an approved Temporary Activities Sponsor, and at least 70% of your program must be hands-on workplace training. Requires minimum age 18 and functional English (IELTS 4.5 or equivalent).",
    goodToKnow: "This is a training visa, not a general work visa. It's built specifically for genuine skills development, which is exactly what our preparation programs support."
  }
};

const destList = document.getElementById('destList');
const destPanel = document.getElementById('destPanel');

function renderDestination(id) {
  const d = DESTINATIONS[id];
  if (!d || !destPanel) return;
  destPanel.style.animation = 'none';
  void destPanel.offsetWidth; // restart animation
  destPanel.style.animation = '';
  destPanel.innerHTML = `
    <div class="panel-photo"><img src="${d.photo}" alt="${d.name}"></div>
    <div class="eyebrow-row">
      <div class="panel-title"><img class="dest-icon" src="${d.icon}" alt="" width="48" height="48"><h2>${d.name}</h2></div>
      <span class="visa-pill">${d.visa}</span>
    </div>
    <p class="why">${d.why}</p>
    <div class="dest-facts">
      <div class="fact"><h4>Typical roles</h4><p>${d.roles}</p></div>
      <div class="fact"><h4>Typical duration</h4><p>${d.duration}</p></div>
      <div class="fact"><h4>Visa detail</h4><p>${d.extra}</p></div>
    </div>
    <div class="good-know">${d.goodToKnow}</div>
  `;
}

if (destList && destPanel) {
  destList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    destList.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDestination(btn.dataset.id);
    history.replaceState(null, '', '#' + btn.dataset.id);
  });

  const initial = window.location.hash.replace('#', '') || 'nepal';
  const initialBtn = destList.querySelector(`button[data-id="${initial}"]`) || destList.querySelector('button');
  destList.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  initialBtn.classList.add('active');
  renderDestination(initialBtn.dataset.id);
}

// ---------- Traveling logo (home page hero -> nav, scroll-scrubbed) ----------
// The logo's size and position are driven directly by scroll distance each
// frame (not a fixed-duration animation triggered at a threshold), so the
// transformation always tracks exactly how far — and how fast — you scroll.
const travelingIcon = document.getElementById('travelingIcon');
const heroLogoSlot = document.getElementById('heroLogoSlot');
const navLogoSlot = document.getElementById('navLogoSlot');

if (travelingIcon && heroLogoSlot && navLogoSlot) {
  const FADE_DISTANCE = 240; // px of scroll over which the logo fully morphs

  let heroOrigin = null; // hero slot's resting position, in document coordinates
  let navTarget = null;  // nav slot's on-screen position (constant, since nav is sticky)
  let ticking = false;

  function lerp(a, b, t) { return a + (b - a) * t; }

  // Reads the two slots' current geometry. Cheap to call occasionally
  // (load, resize, font swap) — deliberately NOT called on every scroll
  // tick, since layout reads are the expensive part of this animation.
  function measure() {
    const sY = window.scrollY || window.pageYOffset;
    const heroRect = heroLogoSlot.getBoundingClientRect();
    const navRect = navLogoSlot.getBoundingClientRect();
    heroOrigin = {
      top: heroRect.top + sY, // convert to document-relative so it stays valid at any scroll position
      left: heroRect.left,
      width: heroRect.width,
      height: heroRect.height
    };
    navTarget = {
      top: navRect.top, // nav is sticky and already at rest from scrollY=0, so this is constant
      left: navRect.left,
      width: navRect.width,
      height: navRect.height
    };
  }

  // Cheap per-frame write: no layout reads, just interpolated style writes.
  function apply() {
    if (!heroOrigin || !navTarget) return;
    const sY = window.scrollY || window.pageYOffset;
    const progress = Math.max(0, Math.min(1, sY / FADE_DISTANCE));
    const heroViewportTop = heroOrigin.top - sY;

    travelingIcon.style.top = lerp(heroViewportTop, navTarget.top, progress) + 'px';
    travelingIcon.style.left = lerp(heroOrigin.left, navTarget.left, progress) + 'px';
    travelingIcon.style.width = lerp(heroOrigin.width, navTarget.width, progress) + 'px';
    travelingIcon.style.height = lerp(heroOrigin.height, navTarget.height, progress) + 'px';
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      apply();
      ticking = false;
    });
  }

  function remeasureAndApply() {
    measure();
    apply();
  }

  // Initial measurement/placement
  remeasureAndApply();
  travelingIcon.style.visibility = 'visible';

  function remeasureAfterPaint() {
    requestAnimationFrame(() => requestAnimationFrame(remeasureAndApply));
  }

  // Re-measure whenever layout could have shifted: fonts swapping in,
  // the full page finishing load, window resizing (including mobile
  // browsers showing/hiding their address bar), and a couple of timed
  // safety checks for slower connections.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(remeasureAfterPaint).catch(remeasureAfterPaint);
  }
  window.addEventListener('load', remeasureAfterPaint);
  setTimeout(remeasureAfterPaint, 600);
  setTimeout(remeasureAfterPaint, 1500);
  window.addEventListener('resize', remeasureAfterPaint);

  // Scroll only ever needs the cheap apply() — measure() stays cached.
  window.addEventListener('scroll', onScroll, { passive: true });

  // Browsers can restore a page from back/forward cache without firing
  // 'load' again — re-measure in that case too, so returning to the home
  // page via the browser's back button also lands the logo correctly.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) remeasureAfterPaint();
  });
}

// ---------- Scroll-reveal for section headings ----------
const revealTargets = document.querySelectorAll(
  '.section-head h2, .inverted h2, .cta-banner h2, .dest-intro h2, .contact-banner-text h2'
);
if (revealTargets.length) {
  revealTargets.forEach(el => el.classList.add('reveal-init'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => io.observe(el));
  } else {
    // Fallback: just show them if IntersectionObserver isn't supported
    revealTargets.forEach(el => el.classList.add('reveal-visible'));
  }
}

// ---------- Contact form submission ----------
const contactForm = document.getElementById('contactForm');
const contactThankYou = document.getElementById('contactThankYou');
const sendAnotherBtn = document.getElementById('sendAnotherBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = document.getElementById('contactSubmitBtn');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json().catch(() => ({}));
      })
      .then(() => {
        contactForm.style.display = 'none';
        contactThankYou.style.display = 'block';
      })
      .catch(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        alert("Something went wrong sending your message. Please try again, or email us directly at ramacharya.nz@gmail.com.");
      });
  });
}

if (sendAnotherBtn) {
  sendAnotherBtn.addEventListener('click', function () {
    contactThankYou.style.display = 'none';
    contactForm.reset();
    contactForm.style.display = '';
    const submitBtn = document.getElementById('contactSubmitBtn');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
  });
}
