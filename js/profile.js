getUserProfile();

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
    myProfileBtnWrap.classList.add('on');
  } else if (userProfile.isfollow == false) { // 팔로우 중이 아니라면
    followBtnWrap.classList.add('on');
  } else if (userProfile.isfollow == true ) { // 팔로우 중이라면
    //unfollowBtnWrap.classList.add('on');
    unfollowBtnWrap.style.display = 'flex';
  }
} 


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