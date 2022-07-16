const emailInput = document.querySelector('.email-input');
const pwInput = document.querySelector('.password-input');
const loginBtn = document.querySelector('.login-btn');
const errMsg = document.querySelector('.error-message');

function loginBtnActive() {
  if (emailInput.value !== '' && pwInput.value !== '') {
    loginBtn.disabled = false;
    loginBtn.classList.add('active');
  } else {
    loginBtn.disabled = true;
    loginBtn.classList.remove('active');
  }
}

loginBtn.addEventListener('input', loginBtnActive);
pwInput.addEventListener('input', loginBtnActive);

async function loginData() {
  const url = 'https://mandarin.api.weniv.co.kr';
  try {
    const res = await fetch(`${url}/user/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: emailInput.value,
          password: pwInput.value,
        },
      }),
    });
    const resJson = await res.json();
    console.log(resJson);

    if (resJson.status !== 422) {
      location.href = './feed.html';
    } else {
      errMsg.classList.add('error');
      loginBtn.classList.remove('active');
    }
    localStorage.setItem('token', resJson.user.token);
    localStorage.setItem('accountname', resJson.user.accountname);
  } catch (err) {
    console.error(err);
  }
}

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginData();
});
