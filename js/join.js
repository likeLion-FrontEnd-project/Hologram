// 이메일로 회원가입

const emailInput = document.querySelector('#email-input');
const inputs = document.querySelectorAll('.input');
const nextBtn = document.querySelector('.join-btn');
const errEmail = document.querySelector('.error-msg');
const errConds = document.querySelectorAll('.check-item');

// 이메일로 회원가입 페이지 버튼 활성화
const activeBtn = () => {
  nextBtn.disabled = false;
  nextBtn.classList.add('active');
};

// 버튼 비활성화
const inactiveBtn = () => {
  nextBtn.disabled = true;
  nextBtn.classList.remove('active');
};

// 버튼과 input의 에러 발생 결과에 따라 버튼 활성/비활성
const isError = () => {
  // input 클래스를 가진 모든 요소의 value가 ""일 때 결과를 배열로 저장
  const inputVal = [...inputs].map((input) => input.value === '');
  // errConds의 클래스를 가진 모든 요소가 "error-txt"라는 클래스를 가지고 있을 때 결과를 배열로 저장
  const errResults = [...errConds].map((cond) =>
    cond.classList.contains('error-txt')
  );

  // 아래의 조건에 따라 버튼을 활성/비활성
  if (
    errEmail.style.display === 'block' ||
    errResults.includes(true) ||
    inputVal.includes(true)
  ) {
    inactiveBtn();
  } else {
    activeBtn();
  }
};

// API 데이터를 받아온 후 이메일 중복 확인
async function checkEmail() {
  const url =
    location.protocol === 'https:'
      ? 'https://mandarin.api.weniv.co.kr'
      : 'http://146.56.183.55:3000/';
  try {
    const res = await fetch(`${url}/user/emailvalid`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: emailInput.value,
        },
      }),
    });
    const resJson = await res.json();
    console.log(resJson);
    // resJson 값에 따라 버튼 활성/에러 메세지, 스타일 출력 여부 결정
    if (resJson.message === '이미 가입된 이메일 주소 입니다.') {
      emailInput.classList.add('error');
      errEmail.style.display = 'block';
      isError();
    } else {
      isError();
      emailInput.classList.remove('error');
      errEmail.style.display = 'none';
    }
  } catch (err) {
    console.error(err);
  }
}

// email 작성란에 타이핑 시 이메일 중복을 확인하고 에러 결과에 따라 버튼을 활성/비활성
emailInput.addEventListener('change', () => {
  checkEmail();
  isError();
});

const pwInput = document.querySelector('.password-input');
const pwConfirmInput = document.querySelector('.password-confirm-input');

// 비밀번호 작성란에 타이핑 시 작성값을 각 함수로 전달하여 조건에 따라 조건 리스트의 에러 표시, 버튼을 활성/비활성 하고 마지막으로 에러의 여부에 따라 한번 더 버튼의 활성 여부를 결정한다.

pwInput.addEventListener('input', (e) => {
  const inputVal = e.target.value;
  checkEnglish(inputVal);
  checkNumber(inputVal);
  checkLength(inputVal);
  checkSame(inputVal);
  isError();
});

// 비밀번호 입력값이 영어를 포함하는가?
const checkEnglish = (val) => {
  let regExp = /[a-z]/gi;
  const condEnglish = document.querySelector('.cond-include-english');
  if (val === '') {
    condEnglish.classList.remove('error-txt');
    condEnglish.classList.remove('correct-txt');
    pwInput.classList.remove('error');
  } else if (regExp.test(val)) {
    condEnglish.classList.add('correct-txt');
    condEnglish.classList.remove('error-txt');
    pwInput.classList.remove('error');
    isError();
  } else {
    condEnglish.classList.add('error-txt');
    condEnglish.classList.remove('correct-txt');
    pwInput.classList.add('error');
    isError();
  }
};

// 비밀번호 입력값이 숫자를 포함하는가?
const checkNumber = (val) => {
  let regExp = /[0-9]/g;
  const condNumber = document.querySelector('.cond-include-number');
  if (val === '') {
    condNumber.classList.remove('error-txt');
    condNumber.classList.remove('correct-txt');
    pwInput.classList.remove('error');
  } else if (regExp.test(val)) {
    condNumber.classList.add('correct-txt');
    condNumber.classList.remove('error-txt');
    pwInput.classList.remove('error');
    isError();
  } else {
    condNumber.classList.remove('correct-txt');
    condNumber.classList.add('error-txt');
    pwInput.classList.add('error');
    isError();
  }
};

// 비밀번호 입력값의 길이가 8자 이상 20자 이내인가?
const checkLength = (val) => {
  const condLength = document.querySelector('.cond-length');
  condLength.classList.add('error');
  pwInput.classList.add('error');
  if (val === '') {
    condLength.classList.remove('error-txt');
    condLength.classList.remove('correct-txt');
    pwInput.classList.remove('error');
  } else if (val.length >= 8 && val.length <= 20) {
    condLength.classList.add('correct-txt');
    condLength.classList.remove('error-txt');
    pwInput.classList.remove('error');
    isError();
  } else {
    condLength.classList.remove('correct-txt');
    condLength.classList.add('error-txt');
    pwInput.classList.add('error');
    isError();
  }
};

// 비밀번호 입력값과 비밀번호 확인 입력값이 같은가?
const checkSame = (val) => {
  const condSame = document.querySelector('.cond-samePassword');
  if (val === '') {
    condSame.classList.remove('correct-txt');
    condSame.classList.remove('error-txt');
    pwConfirmInput.classList.remove('error');
  } else if (val === pwConfirmInput.value) {
    condSame.classList.add('correct-txt');
    condSame.classList.remove('error-txt');
    pwConfirmInput.classList.remove('error');
    isError();
  } else {
    condSame.classList.remove('correct-txt');
    condSame.classList.add('error-txt');
    pwConfirmInput.classList.add('error');
    isError();
  }
};

// 비밀번호 확인 작성란에 입력 시 아래의 조건에 따라 조건 리스트의 에러를 표시, 버튼 활성/비활성
pwConfirmInput.addEventListener('input', (e) => {
  const inputVal = e.target.value;
  const condSame = document.querySelector('.cond-samePassword');
  if (inputVal === '') {
    condSame.classList.remove('correct-txt');
    condSame.classList.remove('error-txt');
    pwConfirmInput.classList.remove('error');
  } else if (pwInput.value === inputVal) {
    condSame.classList.add('correct-txt');
    condSame.classList.remove('error-txt');
    e.target.classList.remove('error');
    isError();
  } else {
    condSame.classList.remove('correct-txt');
    condSame.classList.add('error-txt');
    e.target.classList.add('error');
    isError();
  }
});

// 버튼 클릭 시 다음 회원가입 섹션으로 이동
nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const joinSec = document.querySelector('.join-sec');
  const setProfileSec = document.querySelector('.setProfile-sec');
  joinSec.style.display = 'none';
  setProfileSec.style.display = 'block';
});

// 프로필 설정

const uploadImgBtn = document.querySelector('.setProfile-img-upload-btn');
const fileInput = document.querySelector('#editImg');
const editImgHidden = document.querySelector('#editImgHidden');
const userNameInput = document.querySelector('.setUsername-input');
const accountIdInput = document.querySelector('.setAccId-input');
const introInput = document.querySelector('.setIntroduce-input');
const errSetProfile = document.querySelector('.setprofile-error-msg');
const submitBtn = document.querySelector('.submit-btn');

// 프로필 설정 페이지 버튼 활성화
const activeSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.classList.add('active');
};

// 프로필 설정 페이지 버튼 활성화
const inactiveSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.classList.remove('active');
};

// 업로드 버튼 클릭시 숨겨진 type이 file인 input이 클릭됨
uploadImgBtn.addEventListener('click', () => {
  fileInput.click();
});

// 불러온 이미지 적용
let readURL = function (input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector(
        '.setprofile-edit-wrap'
      ).style.background = `url(${e.target.result}) center center / cover`;
      editImgHidden.value = e.target.result;
      console.log(editImgHidden.value);
      activeSubmitBtn();
    };
    reader.readAsDataURL(input.files[0]);
  }
};

editImg.addEventListener('change', function () {
  readURL(this);
});

// userName의 길이값이 2 이상 10이하일 경우 버튼 활성 / 아닐 시 비활성
const checkUsername = () => {
  if (
    (userNameInput.value >= 2 && userNameInput.value <= 10) ||
    userNameInput.value !== ''
  ) {
    activeSubmitBtn();
  } else {
    inactiveSubmitBtn();
  }
};

// 회원가입 데이터 전송
async function joinData() {
  const url =
    location.protocol === 'https:'
      ? 'https://mandarin.api.weniv.co.kr'
      : 'http://146.56.183.55:3000';
  const image =
    editImgHidden.value !== ''
      ? editImgHidden.value
      : 'https://mandarin.api.weniv.co.kr/Ellipse.png';
  try {
    const res = await fetch(`${url}/user`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: userNameInput.value,
          email: emailInput.value,
          password: pwInput.value,
          accountname: accountIdInput.value,
          intro: introInput.value,
          image: image,
        },
      }),
    });
    const resJson = await res.json();
    console.log(resJson);

    if (
      resJson.message === '이미 사용중인 계정 ID입니다.' ||
      resJson.message === '영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.'
    ) {
      errSetProfile.style.display = 'block';
      errSetProfile.textContent = `*${resJson.message}`;
      accountIdInput.classList.add('error');
      AccIdError();
      accountIdInput.focus();
    } else if (resJson.message === 'request entity too large') {
      alert('이미지의 용량이 너무 큽니다. 이미지를 변경해주세요.');
      inactiveSubmitBtn();
    } else {
      accountIdInput.classList.remove('error');
      location.href = '../pages/login.html';
      AccIdError();
    }
  } catch (err) {
    console.error(err);
  }
}

// 에러 메세지가 표시 유무에 따라 버튼 활성/비활성
const AccIdError = () => {
  if ((errSetProfile.style.display = 'block')) {
    inactiveSubmitBtn();
  } else {
    activeSubmitBtn();
  }
};

// 계정ID가 조건에 맞을 시 버튼 활성 / 아닐 시 비활성
const checkAccountId = () => {
  const regExp = /[a-z0-9\_\.]/gi;
  if (regExp.test(accountIdInput.value)) {
    activeSubmitBtn();
  } else {
    inactiveSubmitBtn();
  }
};

// accountIdInput에 입력 시 조건에 부합하는지 비교 시작
accountIdInput.addEventListener('input', checkAccountId);

// submitBtn 클릭 시 데이터 전송
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  joinData();
});
