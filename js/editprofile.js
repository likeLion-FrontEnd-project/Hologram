const editInputs = document.querySelectorAll('.editprofile-input');
const editUsernameInput = document.querySelector('#editUsername-input');
const editAccountInput = document.querySelector('#editAccId-input');
const editIntroInput = document.querySelector('#editIntroduce-input');
const errEditProfile = document.querySelector('.editprofile-error-msg');
const saveBtn = document.querySelector('.save');

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

// 프로필 이미지 업로드
const profileImgBtn = document.querySelector('.editProfile-img-upload-btn');
const hiddenImgSrc = document.querySelector('#editImgHidden');
const editImg = document.querySelector('#editImg');

// 버튼 클릭시 이미지 input 버튼 클릭
profileImgBtn.addEventListener('click', () => {
  editImg.click();
});

let readURL = function (input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector(
        '.editprofile-edit-wrap'
      ).style.background = `url(${e.target.result}) center center / cover`;
      hiddenImgSrc.value = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

// 이미지 변경 시 미리보기와
editImg.addEventListener('change', function () {
  readURL(this);
});

// 계정 검증 API
async function accountnameValid() {
  const url =
    location.protocol === 'https:'
      ? 'https://mandarin.api.weniv.co.kr'
      : 'http://146.56.183.55:3000';
  const currentId = localStorage.getItem('accountname');
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
    if (resJson.message === '이미 가입된 계정ID 입니다.') {
      editAccountInput.classList.add('error');
      errEditProfile.textContent = `*이미 가입된 계정ID 입니다.`;
      errEditProfile.style.display = 'block';
      if (currentId === editAccountInput.value) {
        editAccountInput.classList.remove('error');
        errEditProfile.textContent = null;
        errEditProfile.style.display = 'none';
      }
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
editAccountInput.addEventListener('input', (e) => {
  checkAccForm();
  accountnameValid();
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

// 프로필 수정 데이터 갱신
async function editUserInfo() {
  const url =
    location.protocol === 'https:'
      ? 'https://mandarin.api.weniv.co.kr'
      : 'http://146.56.183.55:3000';
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${url}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: editUsernameInput.value,
          accountname: editAccountInput.value,
          intro: editIntroInput.value,
          image: hiddenImgSrc.value,
        },
      }),
    });
    const resJson = await res.json();
    if (resJson.message === 'request entity too large') {
      alert('이미지의 용량이 너무 큽니다. 이미지를 변경해주세요.');
    } else {
      localStorage.setItem('accountname', editAccountInput.value);
      location.href = './profile.html';
    }
  } catch (err) {
    console.error(err);
  }
}

saveBtn.addEventListener('click', () => {
  editUserInfo();
});

// 기존 정보 프로필 수정 input에 유지
function setEditUserInfo(editUserInfo) {
  document.querySelector(
    '.editprofile-edit-wrap'
  ).style.background = `url(${editUserInfo.image}) no-repeat center / 110px`;

  hiddenImgSrc.value = editUserInfo.image;
  editUsernameInput.value = editUserInfo.username;
  editAccountInput.value = editUserInfo.accountname;
  editIntroInput.value = editUserInfo.intro;
}

// 프로필 수정 데이터 전송
async function getEditUserInfo() {
  const url =
    location.protocol === 'https:'
      ? 'https://mandarin.api.weniv.co.kr'
      : 'http://146.56.183.55:3000';
  const accountName = localStorage.getItem('accountname');
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${url}/profile/${accountName}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    setEditUserInfo(resJson.profile);
  } catch (err) {
    console.error(err);
  }
}

getEditUserInfo();
