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
  location.href='./splash.html####';
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
    setUserProfile(userProfile);
    // 프로필 상태별 버튼
    checkUser(userProfile);
    
    // userPost
    const userPostData = await fetch(`${url}/post/${accountName}/userpost`, getUserData);
    const userPostJson = await userPostData.json();
    const userPost = userPostJson.post;
    // setUserPost(userPost);

  } catch(errorMsg) {
    console.log(errorMsg);
  }
}

/* 유저 프로필 정보 뿌려주기 */
function setUserProfile(userProfile) {

  const user_image = (userProfile.image) ? userProfile.image : '../assets/images/img-profile_large.png';
  
  document.querySelector('.follower-num').textContent = userProfile.followerCount;
  document.querySelector('.following-num').textContent = userProfile.followingCount;
  document.querySelector('.profile-img-wrap img').src = user_image;
  document.querySelector('.profile-section .profile-name').textContent = userProfile.username;
  document.querySelector('.profile-section .profile-account').textContent = `@ ${userProfile.accountname}`;
  document.querySelector('.profile-section .profile-intro').textContent = userProfile.intro;
}

const myProfileBtnWrap = document.querySelector('.myProfile-btns');
const followBtnWrap = document.querySelector('.follow-btns');
const unfollowBtnWrap = document.querySelector('.unfollow-btns');
/* 프로필 상태별 버튼 */
function checkUser(userProfile) {
  // userAccountname 현재 프로필 페이지에서 보이는 사용자
  const localUser = localStorage.getItem('accountname');
  const nowUser = userProfile.accountname;
  
  if (nowUser === localUser) { // 내 프로필일 때
    myProfileBtnWrap.style.display = 'flex';
  } else if (userProfile.isfollow == false) { // 팔로우 중이 아니라면
    followBtnWrap.style.display = 'flex';
  } else if (userProfile.isfollow == true ) { // 팔로우 중이라면
    unfollowBtnWrap.style.display = 'flex';
  }
} 
/* 프로필 상태별 페이지 이동 */
const chatBtn = document.querySelector('#follow-chat-btn')
const followingChatBtn = document.querySelector('#following-chat-btn')
function moveChat() {
  location.href='./chat.html';
}
chatBtn.addEventListener('click', moveChat)
followingChatBtn.addEventListener('click', moveChat)


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