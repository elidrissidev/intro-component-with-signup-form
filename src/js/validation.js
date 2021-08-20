const form = document.querySelector('.cta__form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  let firstInvalidElement;

  for (let el of event.target.elements) {
    const error = hasError(el);

    if (error) {
      showError(el, error);

      if (!firstInvalidElement) {
        firstInvalidElement = el;
      }
      continue;
    }

    removeError(el);
  }

  if (firstInvalidElement) {
    firstInvalidElement.focus();
    return;
  }

  alert("Alas, no trial for you.");
});

form.addEventListener('blur', function(event) {
  const field = event.target;

  const error = hasError(field);

  if (error) {
    showError(field, error);
    return;
  }

  removeError(field);
}, true);

function hasError(field) {
  if (field.type === 'submit') {
    return;
  }

  const errorEl = document.querySelector(`#${field.id}-error`);

  if (field.validity.valid) {
    errorEl.textContent = '';

    field.closest('.form__input-wrapper').classList.remove('form__input-wrapper--has-error');
    return;
  }

  let error;

  if (field.validity.valueMissing) {
    const fieldLabel = field.labels[0].textContent.trim();
    error = `${fieldLabel} cannot be empty`;
  }

  if (field.validity.patternMismatch) {
    error = 'Looks like this is not an email';
  }

  return error;
}

function showError(field, error) {
  if (!field.id) {
    return;
  }

  field.setAttribute('aria-invalid', true);

  const errorEl = document.querySelector(`#${field.id}-error`);

  if (errorEl) {
    errorEl.setAttribute('aria-live', 'assertive');
    errorEl.textContent = error;
  }

  field.closest('.form__input-wrapper').classList.add('form__input-wrapper--has-error');
}

function removeError(field) {
  if (!field.id) {
    return;
  }

  field.setAttribute('aria-invalid', false);

  const errorEl = document.querySelector(`#${field.id}-error`);

  if (errorEl) {
    errorEl.setAttribute('aria-live', 'off');
    errorEl.textContent = '';
  }

  field.closest('.form__input-wrapper').classList.remove('form__input-wrapper--has-error');
}
