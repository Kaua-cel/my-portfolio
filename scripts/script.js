tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#05080a',
        'brand-card': '#0b1218',
        'brand-blue': '#1e40af',
        'brand-accent': '#3b82f6',
        'brand-muted': '#94a3b8',
      }
    }
  }
}

// Custom smooth scrolling function
function smoothScrollTo(target, duration = 800) {
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        smoothScrollTo(target, 800);
      }
    });
  });
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickInsideBtn = mobileMenuBtn.contains(event.target);
      
      if (!isClickInsideMenu && !isClickInsideBtn) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
});

emailjs.init({
  publicKey: "UGlYVzALbdYXi9xvg",
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = {
    user_name: document.getElementById('contact-name').value,
    user_email: document.getElementById('contact-email').value,
    message: document.getElementById('contact-message').value,
  };
  const formMessage = document.getElementById('form-message');

  const serviceID = "service_p34a5ou";
  const templateID = "template_contact";

  submitBtn = document.getElementById('submit-btn');
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  emailjs.send(serviceID, templateID, formData).then(() => {
    Toastify({
      text: "Message sent successfully!",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #4CAF50, #81C784)",
        color: "#fff",
      },
    }).showToast();

    document.getElementById('contact-form').reset();
  }).catch((error) => {
    Toastify({
      text: "Error sending message. Please try again.",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #f44336, #ef5350)",
        color: "#fff",
      },
    }).showToast();
    console.error('EmailJS Error:', error);
  }). finally(() => {
    submitBtn.textContent = "Send Message";
    submitBtn.disabled = false;
  });
});