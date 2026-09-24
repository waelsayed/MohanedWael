
  // ── Toggle Navbar for mobile ──
  const nav = document.getElementById('nav');
  const menu = document.getElementById('menu');
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.textContent = open ? '✕' : '☰';
  });

  // ── Form Elements ──
  const appForm = document.getElementById('jobApplicationForm');
  const englishSelect = document.getElementById('englishLevel');
  const englishAlert = document.getElementById('englishAlert');
  const submitBtn = document.getElementById('submitBtn');
  const responseMsg = document.getElementById('responseMsg');

  // ── Qualified English Levels ──
  const qualifiedLevels = ['B2', 'C1', 'C2'];

  // ── WhatsApp Number (with country code, no + or spaces) ──
  const WHATSAPP_NUMBER = '201065577897'; // 01065577897 → Egypt (+20)

  // ── Real-time English Level Check ──
  englishSelect.addEventListener('change', function() {
    const selectedLevel = this.value;
    if (selectedLevel && !qualifiedLevels.includes(selectedLevel)) {
      englishAlert.style.display = 'block';
    } else {
      englishAlert.style.display = 'none';
    }
  });

  // ── Device Detection ──
  function getDeviceType() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // iOS detection (iPhone, iPad, iPod)
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      return 'ios';
    }

    // Android detection
    if (/android/i.test(ua)) {
      return 'android';
    }

    // Desktop / everything else
    return 'desktop';
  }

  // ── Build WhatsApp URL based on device ──
  function buildWhatsAppURL(message) {
    const encodedMessage = encodeURIComponent(message);
    const device = getDeviceType();

    if (device === 'ios') {
      // iOS uses api.whatsapp.com or whatsapp:// scheme
      return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    }

    if (device === 'android') {
      // Android intent scheme opens the WhatsApp app directly
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    }

    // Desktop fallback (WhatsApp Web / Desktop app)
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  }

  // ── Handle Form Submission ──
  appForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const englishVal = englishSelect.value;

    // Validate English Level Requirement
    if (!qualifiedLevels.includes(englishVal)) {
      englishAlert.style.display = 'block';
      responseMsg.className = 'error';
      responseMsg.style.display = 'block';
      responseMsg.innerHTML = '❌ Sorry, your English level must be at least <strong>B2</strong> to apply for this vacancy.';
      return;
    }

    // Clear previous response
    responseMsg.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Opening WhatsApp...';

    // ── Collect Form Data ──
    const fullName       = document.getElementById('fullName').value.trim();
    const email          = document.getElementById('email').value.trim();
    const phone          = document.getElementById('phone').value.trim();
    const graduationYear = document.getElementById('graduationYear').value.trim();
    const notes          = document.getElementById('notes').value.trim();

    // ── Build Formatted WhatsApp Message ──
    const message =
      `*📋 New Job Application*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*💼 Position:* Sales Representative\n` +
      `*👤 Full Name:* ${fullName}\n` +
      `*📧 Email:* ${email}\n` +
      `*📱 Phone:* ${phone}\n` +
      `*🎓 Graduation Year:* ${graduationYear}\n` +
      `*🌐 English Level:* ${englishVal}\n` +
      `*📝 Notes:* ${notes || 'N/A'}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ Sent via HR Mohaned Wael Portal`;

    // ── Open WhatsApp ──
    const url = buildWhatsAppURL(message);

    // Small delay so the button text updates visually before redirect
    setTimeout(() => {
      window.open(url, '_blank');

      responseMsg.className = 'success';
      responseMsg.style.display = 'block';
      responseMsg.innerHTML = '🎉 WhatsApp is opening with your application. Please press <strong>Send</strong> to submit.';

      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Application →';

      // Optional: reset form after a short delay
      // appForm.reset();
      // englishAlert.style.display = 'none';
    }, 300);
  });