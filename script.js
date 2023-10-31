const form = document.querySelector('form');
const password1 = document.querySelector('#password'), password2 = document.querySelector('#confirm-password');

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => checkFormControls(input));
});

form.querySelector('div.bottom button').addEventListener('click', event => {
    form.querySelectorAll('input').forEach(input => {
        checkFormControls(input);
    });

    if (!checkPasswords() || !form.checkValidity()) {
        event.preventDefault();
    } else {
        form.submit();
    }
});

function checkPasswords() {
    // They should match and not be blank
    const check = password1.value === password2.value && password2.value !== '';

    if (!check) {
        password2.nextElementSibling.textContent = 'Passwords do not match!';
    } else {
        password2.nextElementSibling.textContent = '';
    }

    return check;
}

function checkFormControls(input) {
    const warningElement = input.nextElementSibling;

    if (!input.checkValidity() || input.id === 'confirm-password') {
        // Blank field or one of the name fields
        if ((input.value == '' || input.id === 'first-name' || input.id === 'last-name') && input.id !== 'confirm-password') {
            warningElement.textContent = 'This is a required field!';

        // Password field (not blank)
        } else if (input.id.includes('password')) {
            if (input.id === 'password') {
                password1.nextElementSibling.textContent = 'Please provide a valid password!';
            }

            // Check passwords
            checkPasswords();

        // Email field (not blank)
        } else if (input.id === 'user-email') {
            warningElement.textContent = 'Please provide a valid email!';
        }
    } else {
        warningElement.textContent = '';
        if (input.id === 'password') {
            password1.nextElementSibling.textContent = '';
        }
    }
}