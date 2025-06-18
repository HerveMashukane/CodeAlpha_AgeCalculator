document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ageForm');
  const dobInput = document.getElementById('dob');
  const result = document.getElementById('result');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Set today's date as the max allowed date in the input
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  dobInput.setAttribute('max', todayStr);

  // Enable the submit button only when a date is entered
  dobInput.addEventListener('input', () => {
    result.textContent = '';
    result.style.color = '';
    submitBtn.disabled = !dobInput.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dobValue = dobInput.value;
    if (!dobValue) {
      showMessage('Please enter your date of birth.', 'red');
      return;
    }

    const dob = new Date(dobValue);
    const now = new Date();

    if (dob > now) {
      showMessage('Date of birth cannot be in the future.', 'red');
      return;
    }

    // Show temporary loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Calculating...';

    // Small delay to simulate processing
    setTimeout(() => {
      const age = getAge(dob, now);
      const message = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;
      showMessage(message, '#27ae60');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Calculate Age';
    }, 400);
  });

  function showMessage(text, color) {
    result.textContent = text;
    result.style.color = color;
    result.scrollIntoView({ behavior: 'smooth' });
  }

  function getAge(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += daysInPreviousMonth(currentDate);
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  }

//   function daysInPreviousMonth(date) {
//     return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
//   }
// });
