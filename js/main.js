

// Toggle Navbar for mobile
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  menu.textContent = open ? '✕' : '☰';
});

// Form Elements
const appForm = document.getElementById('jobApplicationForm');
const englishSelect = document.getElementById('englishLevel');
const englishAlert = document.getElementById('englishAlert');
const submitBtn = document.getElementById('submitBtn');
const responseMsg = document.getElementById('responseMsg');

// Qualified Levels Array
const qualifiedLevels = ['B2', 'C1', 'C2'];

// Real-time English Level Check
englishSelect.addEventListener('change', function() {
  const selectedLevel = this.value;
  if (selectedLevel && !qualifiedLevels.includes(selectedLevel)) {
    englishAlert.style.display = 'block';
  } else {
    englishAlert.style.display = 'none';
  }
});

// Handle Form Submission
appForm.addEventListener('submit', async function(e) {
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

  // Clear previous response message
  responseMsg.style.display = 'none';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting Application...';

  // Prepare Payload
  const formData = {
    jobTitle: 'Customer Service Representative',
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    graduationYear: document.getElementById('graduationYear').value,
    englishLevel: englishVal,
    notes: document.getElementById('notes').value
  };

  try {
    const response = await fetch('https://hr.tasawehala.com/api/applyjob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      responseMsg.className = 'success';
      responseMsg.style.display = 'block';
      responseMsg.innerHTML = '🎉 Application submitted successfully! We will contact you soon.';
      appForm.reset();
      englishAlert.style.display = 'none';
    } else {
      throw new Error('Failed to submit application. Status: ' + response.status);
    }
  } catch (error) {
    console.error('Submission Error:', error);
    responseMsg.className = 'error';
    responseMsg.style.display = 'block';
    responseMsg.innerHTML = '❌ An error occurred while sending your application. Please try again later.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Application →';
  }
});
