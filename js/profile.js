getUserProfile();

/* 모달창 */
const open = () => {
  document.querySelector(".modal").classList.remove("hidden");
}
const close = () => {
  document.querySelector(".modal").classList.add("hidden");  
}  

/* 헤더 메뉴 버튼 */
document.querySelector(".more-menu-btn").addEventListener("click", open);
document.querySelector(".modal-bg ").addEventListener("click", close); 
document.querySelector(".modal-close-bar").addEventListener("click", close); 
const profileSetBtn = document.querySelector('#profile-setting');
const logoutChoose = document.querySelector('#logout');

profileSetBtn.addEventListener('click', () => {
  location.href='../pages/profile.html';
  close()
})
logoutChoose.addEventListener('click', ()=>{
  close()
  // 로그아웃 모달이 보여진다. 
  document.querySelector(".logout-modal").classList.remove("hidden");  
});

/* 로그아웃 모달 */
const logoutmodalBg = document.querySelector(".logoutmodal-bg");
// 로그아웃모달 - 취소
const cancelBtn = document.querySelector('#cancel-btn');
// 로그아웃모달 - 로그아웃
const logoutBtn = document.querySelector('#logout-btn');

// 로그아웃모달 배경 선택 시 모달 종료
logoutmodalBg.addEventListener('click', ()=>{
  document.querySelector(".logout-modal").classList.add("hidden");  
})
cancelBtn.addEventListener('click', ()=>{
  document.querySelector(".logout-modal").classList.add("hidden");  
})
logoutBtn.addEventListener('click', ()=>{
  // 로그아웃
  location.href='../pages/splash.html####';
})



/* 유저 정보 받아오기  */
async function getUserProfile(accountname) {
  const token = localStorage.getItem('token');
  
  // getAccount: 쿼리스트링에서 정보를 받아온다. 
  const getAccount = location.search.replace("?","").split("=");
  const accountName = (getAccount == '') ? 
    localStorage.getItem('accountname') : getAccount[1];
  
  const getUserData = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
  }


  try{
    // userProfile
    const userProfileData = await fetch(`${url}/profile/${accountName}`, getUserData);
    const userProfileJson = await userProfileData.json();
    const userProfile = userProfileJson.profile;

    const followingData = await fetch(`${url}/profile/${accountName}/follower`, getUserData);
    const followList = await followingData.json();
    const userFollowing = userProfile.following;
    
    setUserProfile(userProfile, followList);
    
    // userPost
    const userPostData = await fetch(`${url}/post/${accountName}/userpost`, getUserData);
    const userPostJson = await userPostData.json();
    const userPost = userPostJson.post;
    // setUserPost(userPost);

  } catch(errorMsg) {
    console.log(errorMsg);
  }
}

/* 팔로잉 리스트 받아오기  */
// async function getFollowingList() {
//   const token = localStorage.getItem('token');

//   const getAccount = location.search.replace("?", "").split("=");
//   const accountName = (getAccount == '') ?
//     localStorage.getItem('accountname') : getAccount[1];

//   const getFollowingData = {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-type': 'application/json'
//     },
//   }
//   const followingData = await fetch(`${url}/profile/${accountName}/following`, getFollowingData);
//   const followingList = await followingData.json();
//   const userFollowing = userProfile.following;
// }

const myProfileBtnWrap = document.querySelector('.myProfile-btns');
const followBtnWrap = document.querySelector('.follow-btns');
const unfollowBtnWrap = document.querySelector('.unfollow-btns');

/* 유저 프로필 정보 뿌려주기 */
function setUserProfile(userProfile, followList) {
  console.log('현재의 유저'); 
  console.log(userProfile);
  console.log(followList); // 로그인한 나의 팔로잉 리스트
  // 팔로우 리스트에 내 아이디가 있다면?


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
  } else if (userProfile.isfollow === true ) { // 팔로우 중이라면
    followBtnWrap.style.display = 'flex';
    followBtn.classList.replace('user-follow-btn', 'user-unfollow-btn');
    followBtn.textContent = '언팔로우';
  }
}

// follow-btn -> profile-unfollow-btn

// follow, unfollow 상태 변경
async function changeFollow(userProfile){
  const localUser = localStorage.getItem('accountname');
  const nowUser = userProfile.accountname;
  
  const token = localStorage.getItem('token');
  const getAccount = location.search.replace("?","").split("=");
  const accountName = (getAccount == '') ? 
    localStorage.getItem('accountname') : getAccount[1];
  
  // 팔로우 됨
  if(followBtn.classList.contains('user-follow-btn')){ // 현재 팔로우 중임 
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
    }catch(err){
      console.error('err', err);
    }
    console.log('팔로우 성공');
    followBtn.classList.replace('user-follow-btn', 'user-unfollow-btn');
    followBtn.textContent = '언팔로우';
    
  }else if(followBtn.classList.contains('user-unfollow-btn')){ 
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
        console.log('이제 님 언팔함');
        console.log(resUnfollowJson);
    }catch(err){
      console.error('err', err);
    }
    followBtn.classList.replace('user-unfollow-btn', 'user-follow-btn');
    followBtn.textContent = '팔로우';
  }
}
const followBtn = document.querySelector('.user-follow-btn');
followBtn.addEventListener('click', changeFollow);



/* 게시글 - 리스트, 앨범 */
function postViewtoggle(){
  const listWrap = document.querySelector(".post-list-wrap")
  const albumWrap = document.querySelector(".post-album-div")

  if(this.id === 'post-album-btn'){
    toggleClass(albumBtn, listBtn);
    toggleClass(albumWrap, listWrap);
  } else {
    toggleClass(listBtn, albumBtn);
    toggleClass(listWrap, albumWrap);
  }
}
function toggleClass(addClass, removeClass){ 
  addClass.classList.add('on');
  removeClass.classList.remove('on');
}
const listBtn = document.querySelector("#post-list-btn");
const albumBtn = document.querySelector("#post-album-btn");

listBtn.addEventListener('click', postViewtoggle);
albumBtn.addEventListener('click', postViewtoggle);