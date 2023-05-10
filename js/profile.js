const marketImg = 'http://146.56.183.55:5050/Ellipse.png'; // 감귤마켓 기본이미지
const mandarinImg = 'https://api.mandarin.weniv.co.kr/Ellipse.png'; // 감귤마켓 기본이미지
const defaultImg = '../assets/images/img-profile_large.png';
getUserProfile();

/* 유저 정보 받아오기  */
async function getUserProfile(accountname) {
  const token = localStorage.getItem('token');

  // getAccount: 쿼리스트링에서 정보를 받아온다.
  const getAccount = location.search.replace('?', '').split('=');
  const accountName =
    getAccount == '' ? localStorage.getItem('accountname') : getAccount[1];

  const getUserData = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  };

  try {
    // userProfile
    const userProfileData = await fetch(
      `${url}/profile/${accountName}`,
      getUserData
    );
    const userProfileJson = await userProfileData.json();
    const userProfile = userProfileJson.profile;

    // userFollow
    const followingData = await fetch(
      `${url}/profile/${accountName}/follower`,
      getUserData
    );
    const followList = await followingData.json();
    const userFollowing = userProfile.following;
    setUserProfile(userProfile, followList);

    // userProduct
    const userProductData = await fetch(
      `${url}/product/${accountName}`,
      getUserData
    );
    const userProductJson = await userProductData.json();
    const userProduct = userProductJson.product;
    setUserProduct(userProduct);

    // userPost
    const userPostData = await fetch(
      `${url}/post/${accountName}/userpost`,
      getUserData
    );
    const userPostJson = await userPostData.json();
    const userPost = userPostJson.post;
    checkUserPost(userPost);
  } catch (errorMsg) {
    location.href = '../pages/404.html';
  }
}

const myProfileBtnWrap = document.querySelector('.myProfile-btns');
const followBtnWrap = document.querySelector('.follow-btns');
const unfollowBtnWrap = document.querySelector('.unfollow-btns');

/* 유저 프로필 정보 뿌려주기 */
function setUserProfile(userProfile, followList) {
  const user_image = userProfile.image
    ? userProfile.image
    : '../assets/images/img-profile_large.png';

  document.querySelector('.follower-num').textContent =
    userProfile.followerCount;
  document
    .querySelector('.follower-wrap')
    .setAttribute(
      'href',
      `/pages/followers.html?accountname=${userProfile.accountname}`
    );
  document.querySelector('.following-num').textContent =
    userProfile.followingCount;
  document
    .querySelector('.following-wrap')
    .setAttribute(
      'href',
      `/pages/followings.html?accountname=${userProfile.accountname}`
    );
  document.querySelector('.profile-img-wrap img').src = imgCheck(user_image);
  document.querySelector('.profile-section .profile-name').textContent =
    userProfile.username;
  document.querySelector(
    '.profile-section .profile-account'
  ).textContent = `@ ${userProfile.accountname}`;
  document.querySelector('.profile-section .profile-intro').textContent =
    userProfile.intro;

  const localUser = localStorage.getItem('accountname');
  const nowUser = userProfile.accountname;

  if (nowUser === localUser) {
    // 내 프로필일 때
    myProfileBtnWrap.style.display = 'flex';
  } else if (userProfile.isfollow === false) {
    followBtnWrap.style.display = 'flex';
    followBtn.textContent = '팔로우';
  } else if (userProfile.isfollow === true) {
    followBtnWrap.style.display = 'flex';
    followBtn.classList.replace('user-follow-btn', 'user-unfollow-btn');
    followBtn.textContent = '언팔로우';
  }
}

// follow, unfollow 상태 변경
async function changeFollow(userProfile) {
  const localUser = localStorage.getItem('accountname');
  const nowUser = userProfile.accountname;

  const token = localStorage.getItem('token');
  const getAccount = location.search.replace('?', '').split('=');
  const accountName =
    getAccount == '' ? localStorage.getItem('accountname') : getAccount[1];

  // 팔로우
  if (followBtn.classList.contains('user-follow-btn')) {
    try {
      const resFollow = await fetch(`${url}/profile/${accountName}/follow`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const resFollowJson = await resFollow.json();
    } catch (err) {
      console.error('err', err);
    }
    followBtn.classList.replace('user-follow-btn', 'user-unfollow-btn');
    followBtn.textContent = '언팔로우';
  } else if (followBtn.classList.contains('user-unfollow-btn')) {
    try {
      const resUnfollow = await fetch(
        `${url}/profile/${accountName}/unfollow`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      );
      const resUnfollowJson = await resUnfollow.json();
    } catch (err) {
      console.error('err', err);
    }
    followBtn.classList.replace('user-unfollow-btn', 'user-follow-btn');
    followBtn.textContent = '팔로우';
  }
}
const followBtn = document.querySelector('.user-follow-btn');
followBtn.addEventListener('click', changeFollow);

/* 게시글 영역 개수 검사*/
function checkUserPost(userPost) {
  const postSection = document.querySelector('.post-section');
  return userPost.length < 1
    ? (postSection.style.display = 'none')
    : (postSection.style.display = 'flex');
}

// 채팅 버튼 선택
document.querySelector('.chat-btn').addEventListener('click', () => {
  location.href = '../pages/chatroom.html';
});
