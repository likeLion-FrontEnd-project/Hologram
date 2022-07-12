const joinEmail = document.querySelector('#email-input');

joinEmail.addEventListener('input', (e) => {
  const email = e.target.value;
  checkEmail(email);
});

const checkEmail = async (InputEmail) => {
  const userData = await fetch(
    'https://mandarin.api.weniv.co.kr/user/emailvalid',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: InputEmail,
        },
      }),
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const emailValid = document.querySelector('.email-result');

  if (userData.message === '이미 가입된 이메일 주소 입니다.') {
    joinEmail.classList.add('error-border');
    emailValid.textContent = `*${userData.message}`;
    emailValid.style.display = 'block';
  } else {
    joinEmail.classList.remove('error-border');
    emailValid.style.display = 'none';
  }
};

document.querySelector('.join-btn').addEventListener('click', (e) => {
  e.preventDefault();
  checkEmail();
});
