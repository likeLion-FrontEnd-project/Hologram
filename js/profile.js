getUserProfile();

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


/* 유저 정보 받아오기  */
async function getUserProfile() {
  const token = localStorage.getItem('token');
  const accountName = localStorage.getItem('accountname');
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
    console.log(userProfile);
    setUserProfile(userProfile);

    // userPost
    const userPostData = await fetch(`${url}/post/${accountName}/userpost`, getUserData);
    const userPostJson = await userPostData.json();
    const userPost = userPostJson.post;
    // setUserPost(userPost);

    // 프로필 상태별 버튼
    checkUser(userProfile);

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

/* 프로필 상태별 버튼 */
function checkUser(userProfile) {
  // localStorage에 있는 토큰이 다르다면
    // 팔로우 목록에 있다면 
      // follow-btn.textContent 를 팔로우
    // 팔로우 목록에 없다면
      // follow-btn.textContent 를 언팔로우 (클래스도 replace)
} 