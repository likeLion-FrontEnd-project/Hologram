const userListWrap = document.querySelector('.user-list-wrap');

getFollowerList();


/* 팔로잉 리스트 받아오기  */
async function getFollowerList() {
  const token = localStorage.getItem('token');

  const getAccount = location.search.replace("?", "").split("=");
  const accountName = (getAccount == '') ?
    localStorage.getItem('accountname') : getAccount[1];

  const getFollowingData = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
  }
  const followingData = await fetch(`${url}/profile/${accountName}/follower`, getFollowingData);
  const followerList = await followingData.json();

  // 현재 로그인한 사용자
  const userProfileData = await fetch(`${url}/profile/${accountName}`, getFollowingData);
  const userProfileJson = await userProfileData.json();
  const userProfile = userProfileJson.profile;


  const userId = userProfile._id;
  const userAccountname =userProfile.accountname;
  const userFollowing = userProfile.follower; // 로컬유저가 팔로잉중인사람

  setFollowerList(followerList, userId, userAccountname, userFollowing);

}

function setFollowerList(followerList, userId, userAccountname, userFollowing) {
  if (followerList.length === 0) {
    const noFollowMsg = document.createElement('li');
    noFollowMsg.setAttribute('class', 'noFollow-msg-wrap');
    
    const msgStrong = document.createElement('strong');
    msgStrong.setAttribute('class', 'msg-strong');
    msgStrong.innerText = '팔로워 계정이 없습니다.';
    
    const msgP = document.createElement('p');
    msgP.setAttribute('class', 'msg-p');
    msgP.innerText = '유저를 검색해 팔로우 해보세요!';

    // li > strong+p
    noFollowMsg.appendChild(msgStrong);
    noFollowMsg.appendChild(msgP);
    // ul > li
    userListWrap.appendChild(noFollowMsg);

  } else {
    followerList.forEach((i) => {

      const userProfileWrap = document.createElement('li');
      userProfileWrap.setAttribute('class', 'user-profile-li');
      
      const userProfileLink = document.createElement('a');
      userProfileLink.setAttribute('href', `/pages/profile.html?accountname=${i.accountname}`);

      const userProfileImg = document.createElement('img');
      userProfileImg.setAttribute('class', 'user-img');
      userProfileImg.setAttribute('src', i.image);

      /* user-info */
      const userInfoWrap = document.createElement('div');
      userInfoWrap.setAttribute('class', 'user-info');

      const userInfoName = document.createElement('strong');
      userInfoName.setAttribute('class', 'user-name');
      userInfoName.innerText = i.username;

      const userInfoIntro = document.createElement('span');
      userInfoIntro.setAttribute('class', 'user-intro');
      userInfoIntro.innerText = i.intro;

      /* 팔로우한 상태 구분 버튼 */
      const userFollowBtn = document.createElement('button');

      if (i.isfollow) { 
        userFollowBtn.setAttribute('class', 'user-follow-btn cancel');
        userFollowBtn.setAttribute('id', 'user-follow-btn-cancel');
        userFollowBtn.innerText = '취소';
      } else {
        if (i.accountname === localStorage.getItem('accountname')) {
          userFollowBtn.style.display = 'none'
        } else {
          userFollowBtn.setAttribute('class', 'user-follow-btn');
          userFollowBtn.setAttribute('id', 'user-follow-btn');
          userFollowBtn.innerText = '팔로우';
        }
      }
      // a > img
      userProfileLink.appendChild(userProfileImg);
      // a > div < name+intro
      userInfoWrap.appendChild(userInfoName);
      userInfoWrap.appendChild(userInfoIntro);
      userProfileLink.appendChild(userInfoWrap);
      // li > a , li > button
      userProfileWrap.appendChild(userProfileLink);
      userProfileWrap.appendChild(userFollowBtn);
      // ul > li
      userListWrap.appendChild(userProfileWrap);
    });
  }
  followData(followerList)
}


