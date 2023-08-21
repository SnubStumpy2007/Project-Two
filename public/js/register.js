document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    const signUpButton = document.getElementById('sign-up');

    signUpButton.addEventListener('click', (e) => {
        e.preventDefault();

        const email = document.getElementById('email-signup').value.trim();
        const username = document.getElementById('username-signup').value.trim();
        const pwd_hash = document.getElementById('password-signup').value.trim();

        if (!email || !username || !pwd_hash) {
            return alert('You must provide all registration details!');
        }

        const newUser = { email, username, pwd_hash };

        // Send POST request to /register route
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                location.replace('/');
            } else {
                alert(data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
