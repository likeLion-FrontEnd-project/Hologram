getUserProfile();

/* 모달창 */
// const open = () => {
//   document.querySelector(".modal").classList.remove("hidden");
// }
// const close = () => {
//   document.querySelector(".modal").classList.add("hidden");  
// }  

// /* 헤더 메뉴 버튼 */
// document.querySelector(".more-menu-btn").addEventListener("click", open);
// document.querySelector(".modal-bg ").addEventListener("click", close); 
// document.querySelector(".modal-close-bar").addEventListener("click", close); 
// const profileSetBtn = document.querySelector('#profile-setting');
// const logoutChoose = document.querySelector('#logout');

// profileSetBtn.addEventListener('click', () => {
//   location.href='../pages/profile.html';
//   close()
// })
// logoutChoose.addEventListener('click', ()=>{
//   close()
//   // 로그아웃 모달이 보여진다. 
//   document.querySelector(".logout-modal").classList.remove("hidden");  
// });

// /* 로그아웃 모달 */
// const logoutmodalBg = document.querySelector(".logoutmodal-bg");
// // 로그아웃모달 - 취소
// const cancelBtn = document.querySelector('#cancel-btn');
// // 로그아웃모달 - 로그아웃
// const logoutBtn = document.querySelector('#logout-btn');

// // 로그아웃모달 배경 선택 시 모달 종료
// logoutmodalBg.addEventListener('click', ()=>{
//   document.querySelector(".logout-modal").classList.add("hidden");  
// })
// cancelBtn.addEventListener('click', ()=>{
//   document.querySelector(".logout-modal").classList.add("hidden");  
// })
// logoutBtn.addEventListener('click', ()=>{
//   // 로그아웃
//   location.href='../pages/login.html';
//   localStorage.clear();
// })



/* 유저 정보 받아오기  */
async function getUserProfile(accountname) {
  const token = localStorage.getItem('token');

  // getAccount: 쿼리스트링에서 정보를 받아온다. 
  const getAccount = location.search.replace("?", "").split("=");
  const accountName = (getAccount == '') ?
    localStorage.getItem('accountname') : getAccount[1];

  const getUserData = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
  }

  try {
    // userProfile
    const userProfileData = await fetch(`${url}/profile/${accountName}`, getUserData);
    const userProfileJson = await userProfileData.json();
    const userProfile = userProfileJson.profile;

    // userFollow
    const followingData = await fetch(`${url}/profile/${accountName}/follower`, getUserData);
    const followList = await followingData.json();
    const userFollowing = userProfile.following;
    setUserProfile(userProfile, followList);

    // userProduct
    const userProductData = await fetch(`${url}/product/${accountName}`, getUserData);
    const userProductJson = await userProductData.json();
    const userProduct = userProductJson.product;
    setUserProduct(userProduct);

    // userPost
    const userPostData = await fetch(`${url}/post/${accountName}/userpost`, getUserData);
    const userPostJson = await userPostData.json();
    const userPost = userPostJson.post;
    checkUserPost(userPost);
    // setUserPost(userPost);

  } catch (errorMsg) {
    location.href = "../pages/404.html";
  }
}

const myProfileBtnWrap = document.querySelector('.myProfile-btns');
const followBtnWrap = document.querySelector('.follow-btns');
const unfollowBtnWrap = document.querySelector('.unfollow-btns');

/* 유저 프로필 정보 뿌려주기 */
function setUserProfile(userProfile, followList) {
  const user_image = (userProfile.image) ? userProfile.image : '../assets/images/img-profile_large.png';

  document.querySelector('.follower-num').textContent = userProfile.followerCount;
  document.querySelector('.follower-wrap').setAttribute('href', `/pages/followers.html?accountname=${userProfile.accountname}`);
  document.querySelector('.following-num').textContent = userProfile.followingCount;
  document.querySelector('.following-wrap').setAttribute('href', `/pages/followings.html?accountname=${userProfile.accountname}`);
  document.querySelector('.profile-img-wrap img').src = user_image;
  document.querySelector('.profile-section .profile-name').textContent = userProfile.username;
  document.querySelector('.profile-section .profile-account').textContent = `@ ${userProfile.accountname}`;
  document.querySelector('.profile-section .profile-intro').textContent = userProfile.intro;

  const localUser = localStorage.getItem('accountname');
  const nowUser = userProfile.accountname;
  console.log(userProfile.isfollow);

  if (nowUser === localUser) { // 내 프로필일 때
    myProfileBtnWrap.classList.add('on');
  }
  else if (userProfile.isfollow === false) { // 팔로우 중이 아니라면
    followBtnWrap.style.display = 'flex';
    followBtn.textContent = '팔로우';
  } else if (userProfile.isfollow === true) { // 팔로우 중이라면
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
  const getAccount = location.search.replace("?", "").split("=");
  const accountName = (getAccount == '') ?
    localStorage.getItem('accountname') : getAccount[1];

  // 팔로우
  if (followBtn.classList.contains('user-follow-btn')) { 
    try {
      const resFollow = await fetch(`${url}/profile/${accountName}/follow`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
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
      const resUnfollow = await fetch(`${url}/profile/${accountName}/unfollow`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });
      const resUnfollowJson = await resUnfollow.json();
      console.log(resUnfollowJson);
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
function checkUserPost(userPost){
  const postSection = document.querySelector('.post-section');
  return (
    userPost.length < 1 ? 
    postSection.style.display = 'none' : postSection.style.display = 'flex'
  )
}