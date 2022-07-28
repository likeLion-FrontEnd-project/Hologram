const emailInput = document.querySelector('.email-input');
const pwInput = document.querySelector('.password-input');
const loginBtn = document.querySelector('.login-btn');
const errMsg = document.querySelector('.error-msg');

function loginBtnActive() {
  if (emailInput.value !== '' && pwInput.value !== '') {
    loginBtn.disabled = false;
    loginBtn.classList.add('active');
  } else {
    loginBtn.disabled = true;
    loginBtn.classList.remove('active');
  }
}

emailInput.addEventListener('input', loginBtnActive);
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
    console.log(resJson.user.token);
    if (resJson.status !== 422) {
      checkToken(resJson.user.token);
      localStorage.setItem('token', resJson.user.token);
      localStorage.setItem('accountname', resJson.user.accountname);
    } else {
      errMsg.style.display = 'block';
      loginBtn.classList.remove('active');
    }
  } catch (err) {
    console.error(err);
  }
}

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginData();
});

// 토큰 검증
async function checkToken(token) {
  const url = 'https://mandarin.api.weniv.co.kr';
  console.log(token);
  try {
    const res = await fetch(`${url}/user/checktoken/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    if (resJson.isValid) {
      location.href = './home.html';
    }
  } catch (err) {
    console.error(err);
  }
}
