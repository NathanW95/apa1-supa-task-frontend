const userFeedback = document.getElementById("user-feedback");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const createNewUser = async () => {
    if (!usernameInput.value || !passwordInput.value) {
        userFeedback.textContent = "Please enter both a username and password";
        return;
    }

    if (passwordInput.value.length < 5) {
        userFeedback.textContent = "Password must be at least 5 characters";
        return;
    }

    userFeedback.textContent = "Creating user...";

    try {
        const response = await fetch('/api/create_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value
            }),
        });
    } catch (error) {
        userFeedback.textContent = `Error: ${error.message}`;
    }

    userFeedback.textContent = "User created! You can now sign in.";

    resetLoginInputFields()
}

const checkLogin = async () => {
    if (!usernameInput.value || !passwordInput.value) {
        userFeedback.textContent = "Please enter both a username and password";
        return;
    }

    userFeedback.textContent = "Checking login credentials...";

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            userFeedback.textContent = `Signing in ${usernameInput.value}...`;

            localStorage.setItem('userId', data.userId);
            window.location.href = '/main.html';
        } else {
            userFeedback.textContent = "Incorrect username or password";
        }
    } catch (error) {
        userFeedback.textContent = `Error: ${error.message}`;
    }
    resetLoginInputFields()
}

const resetLoginInputFields = () => {
    usernameInput.value = "";
    passwordInput.value = "";
}

document.getElementById("create-account-button").addEventListener("click", createNewUser);
document.getElementById("sign-in-button").addEventListener("click", checkLogin);