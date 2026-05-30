/* AuraHealth Care Interactive Prototype Scripts */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const state = {
    currentView: 'dashboard',
    selectedDoctor: 'Dr. Sandra Patel',
    selectedDate: null,
    selectedTime: null,
    highContrast: false,
    fontSizeMultiplier: 1.0,
    prescriptionAutoFilled: false
  };

  // DOM Elements - Navigation
  const navTabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.view-section');
  const dbBookBtn = document.getElementById('db-book-btn');
  const dbRecordsBtn = document.getElementById('db-records-btn');
  const dbRefillBtn = document.getElementById('db-refill-btn');

  // DOM Elements - Accessibility Controls
  const toggleContrastBtn = document.getElementById('toggle-contrast');
  const textScaleUpBtn = document.getElementById('text-scale-up');
  const textScaleDnBtn = document.getElementById('text-scale-dn');
  const textScaleResetBtn = document.getElementById('text-scale-reset');

  // DOM Elements - Booking Calendar
  const weekGrid = document.getElementById('week-grid');
  const timeSlotsGrid = document.getElementById('time-slots-grid');
  const timeSlotsContainer = document.getElementById('time-slots-container');
  const confirmBookingBtn = document.getElementById('confirm-booking-btn');
  const selectedDateText = document.getElementById('selected-date-text');

  // DOM Elements - Forms & Refills
  const autofillBtn = document.getElementById('autofill-btn');
  const refillForm = document.getElementById('refill-payment-form');
  const ccInput = document.getElementById('cc-number');
  const zipInput = document.getElementById('zip-code');
  const insuranceSelect = document.getElementById('insurance-carrier');
  const submitPaymentBtn = document.getElementById('submit-payment-btn');

  // DOM Elements - Overlays / Modals
  const loadingOverlay = document.getElementById('loading-overlay');
  const successModal = document.getElementById('success-modal');
  const successModalClose = document.getElementById('success-modal-close');
  const successModalTitle = document.getElementById('success-modal-title');
  const successModalBody = document.getElementById('success-modal-body');

  // DOM Elements - Lab Results
  const downloadReportBtn = document.getElementById('download-report-btn');

  // ----------------------------------------------------
  // NAVIGATION CONTROLS
  // ----------------------------------------------------
  function switchView(viewId) {
    state.currentView = viewId;
    
    // Update tabs highlight
    navTabs.forEach(tab => {
      if (tab.dataset.target === viewId) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    // Toggle sections visibility
    sections.forEach(section => {
      if (section.id === `${viewId}-view`) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Reset view-specific state on switch if appropriate
    window.scrollTo(0, 0);
  }

  // Hook navigation tab event clicks
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchView(tab.dataset.target);
    });
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchView(tab.dataset.target);
      }
    });
  });

  // Dashboard deep-link buttons mapping
  if (dbBookBtn) dbBookBtn.addEventListener('click', () => switchView('booking'));
  if (dbRecordsBtn) dbRecordsBtn.addEventListener('click', () => switchView('records'));
  if (dbRefillBtn) dbRefillBtn.addEventListener('click', () => switchView('billing'));

  // ----------------------------------------------------
  // ACCESSIBILITY & UTILITIES
  // ----------------------------------------------------
  toggleContrastBtn.addEventListener('click', () => {
    state.highContrast = !state.highContrast;
    if (state.highContrast) {
      document.body.classList.add('contrast-high');
      toggleContrastBtn.classList.add('active');
      toggleContrastBtn.innerText = 'High Contrast: ON';
    } else {
      document.body.classList.remove('contrast-high');
      toggleContrastBtn.classList.remove('active');
      toggleContrastBtn.innerText = 'High Contrast: OFF';
    }
  });

  function applyFontScaling() {
    document.body.style.fontSize = `${state.fontSizeMultiplier * 16}px`;
    // Update accessibility indicators if needed
  }

  textScaleUpBtn.addEventListener('click', () => {
    if (state.fontSizeMultiplier < 1.5) {
      state.fontSizeMultiplier += 0.1;
      applyFontScaling();
    }
  });

  textScaleDnBtn.addEventListener('click', () => {
    if (state.fontSizeMultiplier > 0.85) {
      state.fontSizeMultiplier -= 0.1;
      applyFontScaling();
    }
  });

  textScaleResetBtn.addEventListener('click', () => {
    state.fontSizeMultiplier = 1.0;
    applyFontScaling();
  });

  // ----------------------------------------------------
  // BOOKING SYSTEM CALENDAR
  // ----------------------------------------------------
  const calendarData = [
    { dayName: 'Mon', dateNum: 1, slotsAvailable: 4, slots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'] },
    { dayName: 'Tue', dateNum: 2, slotsAvailable: 6, slots: ['08:30 AM', '09:30 AM', '10:00 AM', '11:00 AM', '01:30 PM', '03:00 PM'] },
    { dayName: 'Wed', dateNum: 3, slotsAvailable: 2, slots: ['11:00 AM', '02:30 PM'] },
    { dayName: 'Thu', dateNum: 4, slotsAvailable: 3, slots: ['09:00 AM', '10:00 AM', '04:00 PM'] },
    { dayName: 'Fri', dateNum: 5, slotsAvailable: 5, slots: ['08:00 AM', '09:00 AM', '11:30 AM', '01:00 PM', '02:30 PM'] },
    { dayName: 'Sat', dateNum: 6, slotsAvailable: 0, slots: [] },
    { dayName: 'Sun', dateNum: 7, slotsAvailable: 0, slots: [] }
  ];

  function buildCalendarGrid() {
    weekGrid.innerHTML = '';
    
    calendarData.forEach((day, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'day-slot-btn interactive-slot';
      btn.setAttribute('aria-label', `${day.dayName} June ${day.dateNum}, ${day.slotsAvailable} appointments available`);
      if (day.slotsAvailable === 0) {
        btn.disabled = true;
      }

      // Add HTML content
      btn.innerHTML = `
        <span class="day-name" style="font-size:0.75rem; text-transform:uppercase;">${day.dayName}</span>
        <span class="day-number">${day.dateNum}</span>
        <span class="day-slots-count">${day.slotsAvailable > 0 ? `${day.slotsAvailable} Slots` : 'Closed'}</span>
      `;

      btn.addEventListener('click', () => {
        // Toggle selected state
        document.querySelectorAll('.day-slot-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        selectCalendarDate(day);
      });

      weekGrid.appendChild(btn);
    });
  }

  function selectCalendarDate(day) {
    state.selectedDate = `Tuesday, June ${day.dateNum}, 2026`;
    state.selectedTime = null; // reset
    selectedDateText.innerText = `Selected date: ${state.selectedDate}`;
    
    // Hide confirm booking CTA until slot selected
    confirmBookingBtn.style.display = 'none';

    // Populate Time Slots sub-grid
    timeSlotsGrid.innerHTML = '';
    
    day.slots.forEach(slot => {
      const slotBtn = document.createElement('button');
      slotBtn.type = 'button';
      slotBtn.className = 'time-slot';
      slotBtn.innerText = slot;
      slotBtn.setAttribute('aria-label', `Select appointment at ${slot}`);

      slotBtn.addEventListener('click', () => {
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        slotBtn.classList.add('selected');
        
        state.selectedTime = slot;
        
        // Show confirm CTA
        confirmBookingBtn.style.display = 'inline-flex';
        confirmBookingBtn.focus();
      });

      timeSlotsGrid.appendChild(slotBtn);
    });

    timeSlotsContainer.style.display = 'flex';
    timeSlotsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Handle booking submission
  confirmBookingBtn.addEventListener('click', () => {
    if (!state.selectedDate || !state.selectedTime) return;

    // Trigger loader overlay briefly
    loadingOverlay.style.display = 'flex';
    document.getElementById('loading-text-info').innerText = 'Securing your appointment slot...';

    setTimeout(() => {
      loadingOverlay.style.display = 'none';

      // Setup success modal
      successModalTitle.innerText = 'Appointment Scheduled Successfully!';
      successModalBody.innerHTML = `
        <p style="margin-bottom:1rem;">Your telehealth consultation with <strong>Dr. Sandra Patel</strong> has been locked in.</p>
        <p style="font-size:1.1rem; color:var(--primary-color); font-weight:700; margin-bottom:1rem;">
          📅 ${state.selectedDate} <br> 🕒 ${state.selectedTime}
        </p>
        <p style="font-size:0.875rem; color:var(--text-secondary);">
          A connection link and diagnostic questionnaire have been sent to your primary clinical messaging inbox.
        </p>
      `;
      successModal.style.display = 'flex';
      
      // Auto close and go to dashboard
      successModalClose.focus();
    }, 800);
  });

  // ----------------------------------------------------
  // LAB RESULTS EXPORT PDF MOCKUP
  // ----------------------------------------------------
  if (downloadReportBtn) {
    downloadReportBtn.addEventListener('click', () => {
      // Simulate PDF file stream creation
      const reportContent = `
AURAHEALTH CARE - CLINICAL LAB RESULTS
--------------------------------------
Patient: Eleanor Vance
Date: May 24, 2026
Test Type: Lipid Panel
Ordering Physician: Dr. Sandra Patel

RESULTS:
Cholesterol, Total: 210 mg/dL (Reference Range: <200 mg/dL) [ELEVATED]
Triglycerides: 150 mg/dL (Reference Range: <150 mg/dL) [NORMAL]
HDL Cholesterol: 48 mg/dL (Reference Range: >40 mg/dL) [OPTIMAL]
LDL Cholesterol: 142 mg/dL (Reference Range: <100 mg/dL) [ELEVATED]

CLINICAL RECOMMENDATION:
Patient presents indications of Hyperlipidemia. Recommended cardiovascular follow-up check.
      `;
      
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Eleanor_Vance_Lipid_Panel_Report.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // ----------------------------------------------------
  // BILLING AND PRESCRIPTION FORM
  // ----------------------------------------------------
  // Auto-fill button reduces data entry load (Tesler's Law compliance)
  autofillBtn.addEventListener('click', () => {
    ccInput.value = '4111 2222 3333 4444';
    zipInput.value = '90210';
    insuranceSelect.value = 'aurashield';
    
    // Clear validation warnings
    validateField(ccInput, ccInput.value.replace(/\s/g, '').length === 16);
    validateField(zipInput, zipInput.value.length === 5);
    validateField(insuranceSelect, insuranceSelect.value !== '');
    
    state.prescriptionAutoFilled = true;
    autofillBtn.innerText = 'Pre-registered Details Applied';
    autofillBtn.classList.remove('btn-secondary');
    autofillBtn.classList.add('btn-outline');
  });

  function validateField(inputElement, isValid) {
    const group = inputElement.closest('.form-group');
    if (isValid) {
      inputElement.classList.remove('is-invalid');
      inputElement.classList.add('is-valid');
      if (group) group.classList.remove('has-error');
    } else {
      inputElement.classList.remove('is-valid');
      inputElement.classList.add('is-invalid');
      if (group) group.classList.add('has-error');
    }
    return isValid;
  }

  // Event validation listeners
  ccInput.addEventListener('blur', () => {
    const rawVal = ccInput.value.replace(/\s/g, '');
    const isValid = /^\d{16}$/.test(rawVal);
    validateField(ccInput, isValid);
  });

  zipInput.addEventListener('blur', () => {
    const isValid = /^\d{5}$/.test(zipInput.value);
    validateField(zipInput, isValid);
  });

  insuranceSelect.addEventListener('change', () => {
    validateField(insuranceSelect, insuranceSelect.value !== '');
  });

  refillForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check all fields
    const rawCc = ccInput.value.replace(/\s/g, '');
    const isCcValid = validateField(ccInput, /^\d{16}$/.test(rawCc));
    const isZipValid = validateField(zipInput, /^\d{5}$/.test(zipInput.value));
    const isInsValid = validateField(insuranceSelect, insuranceSelect.value !== '');

    if (!isCcValid || !isZipValid || !isInsValid) {
      // Focus the first invalid input (Heuristic 9)
      const firstInvalid = document.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Doherty Threshold Simulation: loading loop prevents multiple submissions
    submitPaymentBtn.disabled = true;
    loadingOverlay.style.display = 'flex';
    document.getElementById('loading-text-info').innerText = 'Processing secure copayment transaction...';

    setTimeout(() => {
      loadingOverlay.style.display = 'none';
      submitPaymentBtn.disabled = false;

      // Show payment confirmation
      successModalTitle.innerText = 'Refill & Payment Complete!';
      successModalBody.innerHTML = `
        <p style="margin-bottom:1rem;">Your prescription renewal request for <strong>Lisinopril 10mg</strong> has been sent to Dr. Sandra Patel.</p>
        <p style="font-size:1.1rem; color:var(--secondary-color); font-weight:700; margin-bottom:1rem;">
          💳 Transaction ID: TXN-29401-AH <br> 💰 Amount Charged: $15.00
        </p>
        <p style="font-size:0.875rem; color:var(--text-secondary);">
          Your insurance provider <strong>(${insuranceSelect.options[insuranceSelect.selectedIndex].text})</strong> was successfully authorized. You will receive an SMS shipping tracking link once pharmacy dispatch completes.
        </p>
      `;
      successModal.style.display = 'flex';
      successModalClose.focus();
    }, 1400); // 1.4 second processing time simulates real system confirmation
  });

  // Modal dismissal
  successModalClose.addEventListener('click', () => {
    successModal.style.display = 'none';
    switchView('dashboard');
  });

  // Close modal on escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.style.display === 'flex') {
      successModal.style.display = 'none';
      switchView('dashboard');
    }
  });

  // Initialize
  buildCalendarGrid();
});
