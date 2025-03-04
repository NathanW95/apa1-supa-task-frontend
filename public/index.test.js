const { createNewUser, userLogin } = require('./index');

beforeEach(() => {
  document.body.innerHTML = `
    <div id="user-feedback"></div>
    <input id="username" value="" />
    <input id="password" value="" />
    <button id="create-account-button">Create Account</button>
    <button id="sign-in-button">Sign In</button>
  `;
  document.getElementById("create-account-button").addEventListener("click", createNewUser);
  document.getElementById("sign-in-button").addEventListener("click", userLogin);
});

test('should display error if username or password is missing', () => {
  createNewUser();
  expect(document.getElementById('user-feedback').textContent).toBe('Please enter both a username and password');
});


