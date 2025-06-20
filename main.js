document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ageForm');
  const dobInput = document.getElementById('dob');
  const result = document.getElementById('result');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Enable the button only when a date is selected
  dobInput.addEventListener('input', () => {
    result.textContent = '';
    result.style.color = '';
    submitBtn.disabled = !dobInput.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dobValue = dobInput.value;
    if (!dobValue) {
      showMessage('⚠️ Please enter your date of birth.', 'red');
      return;
    }

    const dob = new Date(dobValue);
    const today = new Date();

    if (dob > today) {
      showMessage('⚠️ Date of birth cannot be in the future.', 'red');
      return;
    }

    const age = calculateAge(dob, today);
    const message = `🎉 You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;
    showMessage(message, '#27ae60');
  });

  const showMessage = (text, color) => {
    result.textContent = text;
    result.style.color = color;
    result.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateAge = (birthDate, currentDate) => {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += getDaysInPreviousMonth(currentDate);
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  };

  const getDaysInPreviousMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };
});
