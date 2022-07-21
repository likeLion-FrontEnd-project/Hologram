const editInputs = document.querySelectorAll('.editprofile-input');
const editUsernameInput = document.querySelector('#editUsername-input');
const editAccountInput = document.querySelector('#editAccId-input');
const editIntroInput = document.querySelector('#editIntroduce-input');
const errEditProfile = document.querySelector('.editprofile-error-msg');
const saveBtn = document.querySelector('.save');

// 계정 검증 API
async function accountnameValid() {
  const url = 'https://mandarin.api.weniv.co.kr';
  try {
    const res = await fetch(`${url}/user/accountnamevalid`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          accountname: editAccountInput.value,
        },
      }),
    });
    const resJson = await res.json();
    console.log(resJson);
    if (resJson.message === '이미 가입된 계정ID 입니다.') {
      editAccountInput.classList.add('error');
      errEditProfile.textContent = `*이미 가입된 계정ID 입니다.`;
      errEditProfile.style.display = 'block';
    }
  } catch (err) {
    console.error(err);
  }
}
// 계정 형식이 맞는지 확인
const checkAccForm = () => {
  const regExp = /^[0-9a-zA-Z._]*$/i;
  if (regExp.test(editAccountInput.value)) {
    editAccountInput.classList.remove('error');
    errEditProfile.style.display = 'none';
  } else {
    editAccountInput.classList.add('error');
    errEditProfile.textContent = `*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.`;
    errEditProfile.style.display = 'block';
  }
};

// 계정ID에 입력 시 계정 검증과 계정 형식이 올바른지 확인 실행
editAccountInput.addEventListener('input', async () => {
  checkAccForm();
  await accountnameValid();
  // 에러 메세지가 있거나 계정ID 값이 없을 때 버튼 활성/비활성
  if (
    errEditProfile.style.display === 'block' ||
    editAccountInput.value === ''
  ) {
    disabledBtn();
  } else {
    activateBtn();
  }
});

// 버튼 활성화
const activateBtn = () => {
  saveBtn.disabled = false;
  saveBtn.classList.add('active');
};

// 버튼 비활성화
const disabledBtn = () => {
  saveBtn.disabled = true;
  saveBtn.classList.remove('active');
};
