// ============ Core Navigation & Loader ============
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const yearSpan = document.getElementById('year');

  // Hide Loader
  window.addEventListener('load', () => {
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.style.display = 'none', 500);
    }
  });

  // Sticky Navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Blur dropdown toggles when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      navLinks.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => toggle.blur());
    }
  });

  // Mobile Menu
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      navLinks.classList.toggle('open');
      
      // Lock/unlock body scroll
      if (navLinks.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      
      // Close all dropdowns when hamburger closes
      if (!navLinks.classList.contains('open')) {
        navLinks.querySelectorAll('.nav-dropdown').forEach(dd => dd.classList.remove('open'));
        navLinks.querySelectorAll('.nav-subdropdown').forEach(dd => dd.classList.remove('open'));
      }
    });
    // Close menu on non-dropdown link click
    navLinks.querySelectorAll('a:not(.nav-dropdown-toggle):not(.nav-subdropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
        navLinks.querySelectorAll('.nav-dropdown').forEach(dd => dd.classList.remove('open'));
        navLinks.querySelectorAll('.nav-subdropdown').forEach(dd => dd.classList.remove('open'));
      });
    });

    // Blur dropdown menu items on click to remove focus state
    navLinks.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
      link.addEventListener('click', () => {
        link.blur();
      });
    });
    // Mobile dropdown toggle — only on small screens
    navLinks.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 820) {
          const parent = toggle.closest('.nav-dropdown');
          const isOpen = parent.classList.contains('open');
          // If dropdown is already open, allow navigation to the page
          if (isOpen) {
            // Let the default navigation happen (don't prevent default)
            toggle.blur();
            return;
          }
          // If dropdown is closed, prevent navigation and open dropdown
          e.preventDefault();
          // Close siblings
          navLinks.querySelectorAll('.nav-dropdown').forEach(dd => dd.classList.remove('open'));
          navLinks.querySelectorAll('.nav-subdropdown').forEach(dd => dd.classList.remove('open'));
          parent.classList.add('open');
        } else {
          // On desktop, blur the toggle after click to remove focus outline
          toggle.blur();
        }
      });
    });

    // Mobile sub-dropdown toggle (inside Services dropdown)
    navLinks.querySelectorAll('.nav-subdropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 820) {
          e.preventDefault();
          const parent = toggle.closest('.nav-subdropdown');
          const isOpen = parent.classList.contains('open');
          // Close siblings within same dropdown menu
          const scope = parent.parentElement || navLinks;
          scope.querySelectorAll('.nav-subdropdown').forEach(dd => dd.classList.remove('open'));
          if (!isOpen) parent.classList.add('open');
        }
      });
    });
  }

  // Footer Year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// ============ Courses Data ============
const COURSES = [
  {
    title: "ICT - Information & Communication Technology",
    category: "technology",
    thumb: "ict",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    short: "Professional course from basic computer to advanced research & reporting.",
    desc: "Professional course covering everything from basic computer to advanced research and reporting.",
    duration: "60 Classes",
    level: "Complete Course",
    price: "",
    learn: [
      "MS Office Complete Package",
      "Basic Designing",
      "Internet Usage & Digital Literacy",
      "Advanced Research & Report Writing"
    ]
  },
  {
    title: "Digital Marketing",
    category: "marketing",
    thumb: "marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    short: "Basic to advanced digital ecosystem understanding.",
    desc: "Special course designed for complete digital ecosystem understanding.",
    duration: "Classes (Basic → Advanced)",
    level: "Basic to Advanced",
    price: "",
    learn: [
      "Social Media Marketing Fundamentals",
      "Digital Ecosystem Basics",
      "Online Branding Concepts",
      "Advanced Level: Separate special classes for students who want to go pro"
    ]
  },
  {
    title: "Graphic Designing",
    category: "design",
    thumb: "graphic",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    short: "Industry-standard tools + practical design projects.",
    desc: "Special focused classes covering industry-standard tools.",
    duration: "Special Classes",
    level: "Skill Course",
    price: "",
    learn: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Basic Design Principles & Projects"
    ]
  },
  {
    title: "Freelancing",
    category: "business",
    thumb: "freelancing",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    short: "For students who complete a skill course — learn how to earn online.",
    desc: "For students who complete a skill course. We teach how to earn online.",
    duration: "24–26 Special Classes",
    level: "Career Support",
    price: "",
    learn: [
      "Fiverr & Upwork Profile Setup",
      "Facebook Communities & Client Hunting",
      "Working with Local Businesses",
      "Payment Methods & Portfolio Building"
    ]
  },
  {
    title: "21st Century Skill Development",
    category: "skills",
    thumb: "soft-skills",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    short: "Essential soft skills for professional growth.",
    desc: "Essential soft skills for professional growth.",
    duration: "26 Special Classes",
    level: "Professional Skills",
    price: "",
    learn: [
      "Presentation Skills",
      "Interview Preparation",
      "Debate & Public Speaking",
      "Critical Thinking"
    ]
  },
  {
    title: "Programming Language - Python",
    category: "development",
    thumb: "python",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=800",
    short: "From fundamentals to final real-world project.",
    desc: "Complete course from fundamentals to final project. We teach everything from basic syntax to advanced concepts.",
    duration: "60 Special Classes",
    level: "Complete Course",
    price: "",
    learn: [
      "Programming Fundamentals & Logic Building",
      "Core Python Concepts",
      "Libraries & Frameworks: NumPy, Pandas, etc.",
      "Real-world Project Development"
    ]
  },
  {
    title: "Video Editing - Premiere Pro & CapCut",
    category: "production",
    thumb: "video",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
    short: "Professional video editing training for creators & media professionals.",
    desc: "Professional video editing training for content creators and media professionals.",
    duration: "26 Special Classes",
    level: "Skill Course",
    price: "",
    learn: [
      "Adobe Premiere Pro - Advanced Timeline Editing",
      "CapCut - Mobile & Desktop Editing",
      "Transitions, Effects, Color Grading & Final Export"
    ]
  }
];

const VISIBLE_COUNT = 6;

function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;
  grid.innerHTML = COURSES.map((c, i) => `
    <article class="card course-card reveal ${i >= VISIBLE_COUNT ? 'is-hidden' : ''}" data-index="${i}" style="cursor:pointer;">
      <div class="course-thumb" style="background-image: url('${c.image}'); background-size: cover; background-position: center;"><span>${c.category.toUpperCase()}</span></div>
      <div class="course-body">
        <h3>${c.title}</h3>
        <p>${c.short}</p>
        <div class="course-meta"><span>${c.duration}</span><span>${c.level}</span></div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.dataset.index, 10);
      openCourseModal(index);
    });
  });
}
renderCourses();

// ============ Course Detail Modal ============
const courseModal = document.getElementById('courseModal');
const courseModalBackdrop = document.getElementById('courseModalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalEnrollBtn = document.getElementById('modalEnrollBtn');
let _activeCourseIndex = null;

function openCourseModal(index) {
  const c = COURSES[index];
  if (!c || !courseModal) return;
  _activeCourseIndex = index;
  document.getElementById('modalCourseImage').src = c.image;
  document.getElementById('modalCategory').textContent = c.category.toUpperCase();
  document.getElementById('modalTitle').textContent = c.title;
  document.getElementById('modalDesc').textContent = c.desc;
  document.getElementById('modalDuration').textContent = c.duration;
  document.getElementById('modalLevel').textContent = c.level;
  const list = document.getElementById('modalList');
  list.innerHTML = c.learn.map(item => `<li><span class="modal-check">&#10003;</span>${item}</li>`).join('');
  courseModal.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function closeCourseModal() {
  if (!courseModal) return;
  courseModal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

if (courseModalBackdrop) courseModalBackdrop.addEventListener('click', closeCourseModal);
if (modalClose) modalClose.addEventListener('click', closeCourseModal);
if (modalEnrollBtn) {
  modalEnrollBtn.addEventListener('click', () => {
    closeCourseModal();
    setTimeout(() => openEnrollModal(_activeCourseIndex), 50);
  });
}

// ============ Premium Enrollment Modal Logic ============
const enrollModal = document.getElementById('enrollModal');
const multiStepForm = document.getElementById('multiStepEnrollForm');
const enrollSteps = document.querySelectorAll('.e-step');
const enrollStepLabels = document.querySelectorAll('.enroll-step-label');
const progressBar = document.getElementById('enrollProgressBar');
const nextBtn = document.getElementById('enrollNext');
const prevBtn = document.getElementById('enrollPrev');
const submitBtn = document.getElementById('enrollSubmit');
const programSelect = document.getElementById('enrollProgramSelect');
const enrollBackdrop = document.getElementById('enrollBackdrop');
const enrollClose = document.getElementById('enrollClose');
const statusDiv = document.getElementById('enroll-status');

let currentStep = 1;

function openEnrollModal(courseIndex) {
  if (!enrollModal) {
    if (courseIndex !== undefined) {
      window.location.href = `courses.html?enroll=${courseIndex}`;
    } else {
      window.location.href = 'courses.html';
    }
    return;
  }
  if (courseIndex !== undefined && COURSES[courseIndex]) {
    if (programSelect) programSelect.value = COURSES[courseIndex].title;
  }
  resetEnrollForm();
  enrollModal.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function closeEnrollModal() {
  if (!enrollModal) return;
  enrollModal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

if (enrollBackdrop) enrollBackdrop.addEventListener('click', closeEnrollModal);
if (enrollClose) enrollClose.addEventListener('click', closeEnrollModal);

function updateSteps() {
  enrollSteps.forEach(step => {
    step.classList.toggle('active', parseInt(step.dataset.step) === currentStep);
  });
  enrollStepLabels.forEach(label => {
    const lblStep = parseInt(label.dataset.for);
    label.classList.toggle('active', lblStep <= currentStep);
  });

  const totalSteps = enrollSteps.length || 3;
  const progress = (currentStep / totalSteps) * 100;
  if (progressBar) progressBar.style.width = `${progress}%`;

  if (prevBtn) prevBtn.style.display = currentStep > 1 ? 'flex' : 'none';
  if (currentStep === totalSteps) {
    if (nextBtn) nextBtn.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'flex';
  } else {
    if (nextBtn) nextBtn.style.display = 'flex';
    if (submitBtn) submitBtn.style.display = 'none';
  }
}

function validateStep(stepNum) {
  const stepEl = document.querySelector(`.e-step[data-step="${stepNum}"]`);
  if (!stepEl) return true;
  const inputs = stepEl.querySelectorAll('input[required], select[required], textarea[required]');
  let valid = true;

  inputs.forEach(input => {
    let parentWrapper = input.closest('.e-field') || input.closest('.e-pill-group') || input.closest('.e-checkbox-wrap');
    if (!parentWrapper) return;

    if (input.type === 'radio' || input.type === 'checkbox') {
      const name = input.name;
      const checked = stepEl.querySelector(`input[name="${name}"]:checked`);
      if (!checked) {
        parentWrapper.classList.add('has-error');
        setTimeout(() => parentWrapper.classList.remove('has-error'), 1000);
        valid = false;
      } else {
        parentWrapper.classList.remove('has-error');
      }
    } else if (!input.value.trim()) {
      parentWrapper.classList.add('has-error');
      setTimeout(() => parentWrapper.classList.remove('has-error'), 1000);
      valid = false;
    } else {
      parentWrapper.classList.remove('has-error');
    }
  });

  return valid;
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      currentStep++;
      updateSteps();
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentStep--;
    updateSteps();
  });
}

function resetEnrollForm() {
  currentStep = 1;
  updateSteps();
  if (multiStepForm) multiStepForm.reset();
  if (statusDiv) {
    statusDiv.style.display = 'none';
    statusDiv.className = 'e-status';
  }
  document.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
}

// ============ UI Features ============

// Scroll reveal (IntersectionObserver)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  io.observe(el);
});

// Testimonials slider
const slides = document.getElementById('slides');
const dots = document.querySelectorAll('.dot');
if (slides) {
  let current = 0;
  const total = dots.length;

  function goTo(i) {
    current = (i + total) % total;
    slides.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
  }
  dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.i))));

  let auto = setInterval(() => goTo(current + 1), 5500);
  const slider = document.getElementById('slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(auto));
    slider.addEventListener('mouseleave', () => auto = setInterval(() => goTo(current + 1), 5500));
  }
}

// Subtle parallax on hero blobs
const blobs = document.querySelectorAll('.blob');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  blobs.forEach((b, i) => {
    const f = i === 0 ? 1 : -1;
    b.style.transform = `translate(${x * f}px, ${y * f}px)`;
  });
});

// Banner slider
const bannerSlides = document.getElementById('bannerSlides');
const bannerDots = document.querySelectorAll('.b-dot');
if (bannerSlides && bannerDots.length > 0) {
  let bCurrent = 0;
  const bTotal = bannerDots.length;

  function bGoTo(i) {
    bCurrent = (i + bTotal) % bTotal;
    bannerSlides.style.transform = `translateX(-${bCurrent * 100}%)`;
    bannerDots.forEach((d, idx) => d.classList.toggle('active', idx === bCurrent));
  }
  bannerDots.forEach(d => d.addEventListener('click', () => bGoTo(parseInt(d.dataset.b))));

  let bAuto = setInterval(() => bGoTo(bCurrent + 1), 4000);
  const bSlider = document.getElementById('bannerSlider');
  if (bSlider) {
    bSlider.addEventListener('mouseenter', () => clearInterval(bAuto));
    bSlider.addEventListener('mouseleave', () => bAuto = setInterval(() => bGoTo(bCurrent + 1), 4000));
  }
}

// ============ Star Rating & Feedback Form ============
const starRating = document.getElementById('starRating');
const fbRating = document.getElementById('fb-rating');
if (starRating && fbRating) {
  const stars = starRating.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.value);
      const current = parseInt(fbRating.value);
      
      if (current === val) {
        fbRating.value = 0;
        stars.forEach(s => {
          s.classList.remove('active');
          s.classList.remove('hover');
        });
      } else {
        fbRating.value = val;
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.value) <= val);
        });
      }
    });
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.value);
      stars.forEach(s => {
        s.classList.toggle('hover', parseInt(s.dataset.value) <= val);
      });
    });
  });
  starRating.addEventListener('mouseleave', () => {
    const current = parseInt(fbRating.value);
    stars.forEach(s => {
      s.classList.remove('hover');
      s.classList.toggle('active', parseInt(s.dataset.value) <= current);
    });
  });
}

// ============ Form Submissions (Web3Forms) ============
const WEB3_ACCESS_KEY = "4b99f241-a2d9-4160-b731-e17f07bc9a7a";

async function handleFormSubmit(formId, statusId, successMsg) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (formId === 'multiStepEnrollForm' && !validateStep(currentStep)) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalBtnText = btn.innerHTML;
    const btnTextSpan = btn.querySelector('.btn-text');
    const btnSpinner = btn.querySelector('.btn-spinner');

    if (btnTextSpan && btnSpinner) {
      btnTextSpan.style.display = 'none';
      btnSpinner.style.display = 'inline-block';
      btn.classList.add('is-loading');
    } else {
      btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Submitting...';
    }

    btn.disabled = true;
    status.style.display = 'none';
    status.className = formId === 'multiStepEnrollForm' ? 'e-status' : 'form-status';

    const formData = new FormData(form);
    formData.append("access_key", WEB3_ACCESS_KEY);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (data.success) {
        status.innerHTML = `<i class="fa fa-check-circle"></i> ${successMsg}`;
        status.classList.add('success');
        status.style.display = 'block';

        if (formId === 'multiStepEnrollForm') {
          setTimeout(closeEnrollModal, 3000);
        } else {
          form.reset();
        }
      } else {
        throw new Error(data.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      status.innerHTML = `<i class="fa fa-exclamation-circle"></i> ${error.message}`;
      status.classList.add('error');
      status.style.display = 'block';
    } finally {
      if (btn.querySelector('.btn-spinner')) {
        btn.querySelector('.btn-text').style.display = 'inline-block';
        btn.querySelector('.btn-spinner').style.display = 'none';
        btn.classList.remove('is-loading');
      } else {
        btn.innerHTML = originalBtnText;
      }
      btn.disabled = false;
    }
  });
}

// Initialize all forms
handleFormSubmit('projectForm', 'project-status', 'Your inquiry has been sent successfully!');
handleFormSubmit('multiStepEnrollForm', 'enroll-status', 'Registration Complete! Our team will contact you on WhatsApp.');
handleFormSubmit('feedbackForm', 'feedback-status', 'Thank you for your feedback!');

const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
  const feedbackStatus = document.createElement('div');
  feedbackStatus.id = 'feedback-status';
  feedbackStatus.className = 'form-status';
  feedbackForm.appendChild(feedbackStatus);
}

// ============ Service Modal Logic ============
handleFormSubmit('multiStepServiceForm', 'serviceStatus', 'Request submitted successfully! We will contact you soon.');

(function initServiceModal() {
  const modal = document.getElementById('serviceModal');
  const form = document.getElementById('multiStepServiceForm');
  if (!modal || !form) return;

  const steps = form.querySelectorAll('.e-step');
  const labels = document.querySelectorAll('.enroll-step-label');
  const progress = document.getElementById('serviceProgressBar');
  const backDrop = document.getElementById('serviceBackdrop');
  const closeBtn = document.getElementById('serviceClose');

  let currStep = 1;

  window.openServiceModal = function (serviceName) {
    if (serviceName) {
      const select = document.getElementById('sf_service');
      if (select) select.value = serviceName;
    }
    currStep = 1;
    update();
    form.reset();
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  };

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  if (backDrop) backDrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  function update() {
    steps.forEach(s => s.classList.toggle('active', parseInt(s.dataset.step) === currStep));
    labels.forEach(l => l.classList.toggle('active', parseInt(l.dataset.for) <= currStep));
    if (progress) progress.style.width = `${(currStep / steps.length) * 100}%`;
  }

  function validate(stepNum) {
    const stepEl = form.querySelector(`.e-step[data-step="${stepNum}"]`);
    if (!stepEl) return true;
    let valid = true;
    stepEl.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
      let wrapper = input.closest('.e-field') || input.closest('.e-pill-group') || input.closest('.e-checkbox-wrap');
      if (!wrapper) return;
      if (input.type === 'radio' || input.type === 'checkbox') {
        if (!stepEl.querySelector(`input[name="${input.name}"]:checked`)) {
          wrapper.classList.add('has-error');
          setTimeout(() => wrapper.classList.remove('has-error'), 1000);
          valid = false;
        }
      } else if (!input.value.trim()) {
        wrapper.classList.add('has-error');
        setTimeout(() => wrapper.classList.remove('has-error'), 1000);
        valid = false;
      }
    });
    return valid;
  }

  form.querySelectorAll('.e-btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      if (validate(currStep)) {
        currStep++;
        update();
      }
    });
  });

  form.querySelectorAll('.e-btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
      currStep--;
      update();
    });
  });
})();

// ============ AI Tools Modal Logic ============
handleFormSubmit('aiToolsForm', 'aiStatus', 'Inquiry sent! We will contact you on WhatsApp with access details.');

(function initAIModal() {
  const modal = document.getElementById('aiModal');
  const form = document.getElementById('aiToolsForm');
  if (!modal || !form) return;

  const steps = form.querySelectorAll('.e-step');
  const labels = modal.querySelectorAll('.enroll-step-label');
  const progress = document.getElementById('aiProgressBar');
  const backDrop = document.getElementById('aiBackdrop');
  const closeBtn = document.getElementById('aiClose');

  let currStep = 1;

  window.openAIModal = function () {
    currStep = 1;
    update();
    form.reset();
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  };

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  if (backDrop) backDrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  function update() {
    steps.forEach(s => s.classList.toggle('active', parseInt(s.dataset.step) === currStep));
    labels.forEach(l => l.classList.toggle('active', parseInt(l.dataset.for) <= currStep));
    if (progress) progress.style.width = `${(currStep / steps.length) * 100}%`;
  }

  function validate(stepNum) {
    const stepEl = form.querySelector(`.e-step[data-step="${stepNum}"]`);
    if (!stepEl) return true;
    let valid = true;
    stepEl.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
      let wrapper = input.closest('.e-field') || input.closest('.e-pill-group') || input.closest('.e-checkbox-wrap');
      if (!wrapper) return;
      if (input.type === 'radio' || input.type === 'checkbox') {
        const name = input.name;
        if (!stepEl.querySelector(`input[name="${name}"]:checked`)) {
          wrapper.classList.add('has-error');
          setTimeout(() => wrapper.classList.remove('has-error'), 1000);
          valid = false;
        }
      } else if (!input.value.trim()) {
        wrapper.classList.add('has-error');
        setTimeout(() => wrapper.classList.remove('has-error'), 1000);
        valid = false;
      }
    });
    return valid;
  }

  form.querySelectorAll('.e-btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      if (validate(currStep)) {
        currStep++;
        update();
      }
    });
  });

  form.querySelectorAll('.e-btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
      currStep--;
      update();
    });
  });
})();

// ============ URL Parameter Handling for Deep Linking ============
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const enrollParam = urlParams.get('enroll');

  if (enrollParam !== null) {
    const courseIndex = parseInt(enrollParam, 10);
    if (!isNaN(courseIndex) && document.getElementById('enrollModal')) {
      // Small delay to ensure everything is initialized and smooth
      setTimeout(() => {
        openEnrollModal(courseIndex);
      }, 100);
    }
  }
});