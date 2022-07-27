const url = 'https://mandarin.api.weniv.co.kr';

/* 뒤로 가기 */
const backBtn = document.querySelector('.back-btn');
function goBack() {
  window.history.back();
  location.href = document.referrer;
}
backBtn.addEventListener('click', goBack);

// 팔로우 & 언팔로에 필요한 매개변수값들 넘겨주기
function followData(followList) {
  let btnFollow = document.querySelectorAll('.user-follow-btn');

  for (let i = 0; i < btnFollow.length; i++) {
    btnFollow[i].addEventListener('click', (e) => {
      let followUserData = followList[i];
      let followState = e.currentTarget.getAttribute('isfollow');
      let targetButton = e.currentTarget;
      checkFollow(followUserData, followState, targetButton);
    });
  }
}

// 팔로우, 언팔로우 하기
async function checkFollow(followUserData, followState, targetButton) {
  let userAccountName = followUserData.accountname;
  const token = localStorage.getItem('token');

  if (followState === 'true' || targetButton.classList.contains('cancel')) {
    // 언팔로우
    try {
      const resUnfollow = await fetch(
        `${url}/profile/${userAccountName}/unfollow`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      );
      const resUnfollowJson = await resUnfollow.json();
      targetButton.classList.remove('cancel');
      targetButton.textContent = '팔로우';
    } catch (err) {
      console.error('err', err);
    }
  } else {
    // 팔로우
    try {
      const resFollow = await fetch(
        `${url}/profile/${userAccountName}/follow`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      );
      const resFollowJson = await resFollow.json();
      targetButton.classList.add('cancel');
      targetButton.textContent = '취소';
    } catch (err) {
      console.error('err', err);
    }
  }
}

// 로그아웃
/* 모달창 */
const open = () => {
  document.querySelector('.modal').classList.remove('hidden');
};
const close = () => {
  document.querySelector('.modal').classList.add('hidden');
};

/* 헤더 메뉴 버튼 */
document.querySelector('.more-menu-btn').addEventListener('click', open);
document.querySelector('.modal-bg ').addEventListener('click', close);
document.querySelector('.modal-close-bar').addEventListener('click', close);
const profileSetBtn = document.querySelector('#profile-setting');
const logoutChoose = document.querySelector('#logout');

async function handleprofileSetBtn() {
  location.href = '../pages/profile.html';
  close();
}

profileSetBtn.addEventListener('click', () => {
  location.href = '../pages/profile.html';
  close();
});
logoutChoose.addEventListener('click', () => {
  close();
  document.querySelector('.logout-modal').classList.remove('hidden');
});

/* 로그아웃 모달 */
const logoutmodalBg = document.querySelector('.logoutmodal-bg');
// 로그아웃모달 - 취소
const cancelBtn = document.querySelector('#cancel-btn');
// 로그아웃모달 - 로그아웃
const logoutBtn = document.querySelector('#logout-btn');

// 로그아웃모달 배경 선택 시 모달 종료
logoutmodalBg.addEventListener('click', () => {
  document.querySelector('.logout-modal').classList.add('hidden');
});
cancelBtn.addEventListener('click', () => {
  document.querySelector('.logout-modal').classList.add('hidden');
});
logoutBtn.addEventListener('click', () => {
  // 로그아웃
  location.href = '../pages/login.html';
  localStorage.clear();
});
