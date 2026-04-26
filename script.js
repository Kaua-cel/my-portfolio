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

// ============================================
// CONTACT FORM LOGIC
// ============================================

// ⚠️ IMPORTANTE: Configure o EmailJS conforme as instruções em SETUP_EMAIL.md
// Substitua 'OjHi5dYz8sIRm6cDZ' pela sua chave pública do EmailJS
// Obtenha em: https://dashboard.emailjs.com/admin/account
emailjs.init('OjHi5dYz8sIRm6cDZ');

// Form validation rules
const validationRules = {
  user_name: {
    minLength: 2,
    maxLength: 100,
    regex: /^[a-zA-Z\s'-]+$/,
    errorMsg: 'Nome deve ter no mínimo 2 caracteres e conter apenas letras'
  },
  user_email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMsg: 'Email inválido'
  },
  message: {
    minLength: 10,
    maxLength: 5000,
    errorMsg: 'Mensagem deve ter no mínimo 10 caracteres'
  }
};

// Validate individual fields
function validateField(fieldName, value) {
  const rules = validationRules[fieldName];
  if (!rules) return true;

  const trimmedValue = value.trim();

  if (rules.minLength && trimmedValue.length < rules.minLength) {
    return false;
  }

  if (rules.maxLength && trimmedValue.length > rules.maxLength) {
    return false;
  }

  if (rules.regex && !rules.regex.test(trimmedValue)) {
    return false;
  }

  return true;
}

// Show/hide error messages
function showError(fieldName, show = true) {
  const errorElement = document.getElementById(`${fieldName.replace('user_', '')}-error`);
  if (errorElement) {
    if (show) {
      errorElement.classList.remove('hidden');
    } else {
      errorElement.classList.add('hidden');
    }
  }
}

// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Get form fields
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const formData = {
        user_name: nameInput.value,
        user_email: emailInput.value,
        message: messageInput.value
      };

      // Validate all fields
      let isValid = true;
      for (const [fieldName, value] of Object.entries(formData)) {
        const isFieldValid = validateField(fieldName, value);
        showError(fieldName, !isFieldValid);
        if (!isFieldValid) isValid = false;
      }

      if (!isValid) {
        formMessage.textContent = '';
        formMessage.classList.add('hidden');
        return;
      }

      // Disable submit button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formMessage.classList.add('hidden');

      try {
        // Send email using EmailJS
        await emailjs.send('service_contact_portfolio', 'template_contact', {
          to_email: 'kauaneres.dev@gmail.com',
          user_name: formData.user_name,
          user_email: formData.user_email,
          message: formData.message,
          reply_to: formData.user_email
        });

        // Success message
        formMessage.textContent = '✓ Mensagem enviada com sucesso! Responderei em breve.';
        formMessage.classList.add('text-green-400');
        formMessage.classList.remove('text-red-400', 'hidden');

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          formMessage.classList.add('hidden');
          formMessage.classList.remove('text-green-400');
        }, 5000);

      } catch (error) {
        console.error('Erro ao enviar email:', error);
        
        // Error message
        formMessage.textContent = '✗ Erro ao enviar mensagem. Por favor, tente novamente ou envie um email diretamente.';
        formMessage.classList.add('text-red-400');
        formMessage.classList.remove('text-green-400', 'hidden');

      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });

    // Real-time validation on input
    document.getElementById('contact-name').addEventListener('blur', function() {
      const isValid = validateField('user_name', this.value);
      showError('user_name', !isValid && this.value.trim() !== '');
    });

    document.getElementById('contact-email').addEventListener('blur', function() {
      const isValid = validateField('user_email', this.value);
      showError('user_email', !isValid && this.value.trim() !== '');
    });

    document.getElementById('contact-message').addEventListener('blur', function() {
      const isValid = validateField('message', this.value);
      showError('message', !isValid && this.value.trim() !== '');
    });
  }
});