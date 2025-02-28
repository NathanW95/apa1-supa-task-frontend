const createNewUser = async () => {
    const resultElement = document.getElementById("result");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!usernameInput.value || !passwordInput.value) {
        resultElement.textContent = "Please enter both a username and password";
        return;
    }

    if (passwordInput.value.length < 5) {
        resultElement.textContent = "Password must be at least 5 characters";
        return;
    }

    resultElement.textContent = "Creating user...";

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
        resultElement.textContent = `Error: ${error.message}`;
    }

    resultElement.textContent = "User created! You can now sign in.";

    usernameInput.value = "";
    passwordInput.value = "";
}

const checkLogin = async () => {
    const resultElement = document.getElementById("result");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!usernameInput.value || !passwordInput.value) {
        resultElement.textContent = "Please enter both a username and password";
        return;
    }

    resultElement.textContent = "Checking login credentials...";
    console.log("function running");

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
        console.log(response);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            resultElement.textContent = `Signing in ${usernameInput.value}...`;
            window.location.href = "main.html";
        } else {
            // resultElement.textContent = data.message;
            throw new Error(`Error: ${response.status}`);
        }

    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }

    usernameInput.value = "";
    passwordInput.value = "";
}
document.getElementById("createAccountButton").addEventListener("click", createNewUser);
document.getElementById("signInButton").addEventListener("click", checkLogin);