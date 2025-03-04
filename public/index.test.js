const { createNewUser, userLogin, userExists } = require('./index');

beforeEach(() => {
  document.body.innerHTML = `
    <div id="user-feedback"></div>
    <input id="username" value="" />
    <input id="password" value="" />
    <button id="create-account-button">Create Account</button>
    <button id="sign-in-button">Sign In</button>
  `;

  delete window.location;
  window.location = { href: '' };
});

global.fetch = jest.fn();

describe('createNewUser', () => {
  test('should display error if username or password is missing', async () => {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    await createNewUser();

    expect(document.getElementById('user-feedback').textContent).toBe('Please enter both a username and password');
  });

  test('should display error if password is too short', async () => {
    document.getElementById("username").value = "testuser";
    document.getElementById("password").value = "123";

    await createNewUser();

    expect(document.getElementById('user-feedback').textContent).toBe('Password must be at least 5 characters');
  });

  test('should display error if user already exists', async () => {
    document.getElementById("username").value = "existingUser";
    document.getElementById("password").value = "password123";

    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });

    await createNewUser();

    expect(document.getElementById('user-feedback').textContent).toBe('User already exists! Choose another username or sign in.');
  });

  test('should show success message after successful user creation', async () => {
    document.getElementById("username").value = "newUser";
    document.getElementById("password").value = "password123";

    fetch.mockResolvedValueOnce({ ok: false, json: async () => ({ success: false }) }); // Mock `userExists` returning false
    fetch.mockResolvedValueOnce({ ok: true }); // Mock successful user creation

    await createNewUser();

    expect(document.getElementById('user-feedback').textContent).toBe('User created! You can now sign in.');
  });
});

describe('userLogin', () => {
  test('should display error if login credentials are incorrect', async () => {
    document.getElementById("username").value = "Nathan";
    document.getElementById("password").value = "wrongPassword";

    await userLogin();

    expect(document.getElementById('user-feedback').textContent).toBe('Incorrect username or password');
  });

  test('should sign user in if details are correct', async () => {
    document.getElementById("username").value = "Nathan";
    document.getElementById("password").value = "RightPassword";

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, userId: '12345' }),
    });

    await userLogin();

    expect(localStorage.getItem('userId')).toBe('12345');
    expect(window.location.href).toBe('/main.html');
    expect(document.getElementById('user-feedback').textContent).toBe('Signing in Nathan...');
  });
});


describe('userExists', () => {
  test('should return true if user already exists', async () => {
    document.getElementById("username").value = "existingUser";
    document.getElementById("password").value = "password123";

    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });

    const response = await userExists();
    expect(response).toBe(true);
  });

  test('should return false if user does not exists', async () => {
    document.getElementById("username").value = "newUser";
    document.getElementById("password").value = "password123";

    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: false }) });

    const response = await userExists();
    expect(response).toBe(false);
  });
});