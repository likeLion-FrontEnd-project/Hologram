const accountName = localStorage.getItem('accountname');
const token = localStorage.getItem('token');
const searchInp = document.querySelector('.search');
const searchMain = document.querySelector('.search-main');
const userListWrap = document.querySelector('.user-list-wrap');

// 검색창 계정 정보 불러오기  
async function searchUser () {
  const inpValue = searchInp.value;
  try {
    if (inpValue === '') {
      userListWrap.textContent = '';
      searchInp.focus();
    } else {
      const searchPath = `/user/searchuser/?keyword=${inpValue}`;
      const reqInfo = {
      method : 'GET',
      headers : {
        Authorization : `Bearer ${token}`,
        'Content-type' : 'application/json',
      },
    }
      const res = await fetch(url + searchPath, reqInfo)
                        .then((response) => {
                          return response;
                        })
      const json = await res.json();
      userListWrap.textContent = '';
  
      // 검색 결과 
      json.forEach((el) => {
        const userName = el.username;
        const accountName = el.accountname;
        const userImg = el.image;
  
        const userprofileLI = document.createElement('li');
        const searchA = document.createElement('a');
        const userProfileImg = document.createElement('img');
        const userInfo = document.createElement('div');
        const userProfileName = document.createElement('strong');
        const userProfileId = document.createElement('span');
        const followBtn = document.createElement('button');
        // const followCancleBtn = document.createElement('button');

        userprofileLI.setAttribute('class', 'user-profile-li');
        searchA.setAttribute('class', 'search-a');
        userProfileImg.setAttribute('class', 'user-img');
        userProfileImg.setAttribute('src', userImg);
        userInfo.setAttribute('class', 'user-info');
        userProfileName.setAttribute('class', 'user-name');
        userProfileId.setAttribute('class', 'user-id');
        // followBtn.setAttribute('class', 'user-follow-btn');
        // followBtn.setAttribute('type', 'button');
        // followCancleBtn.setAttribute('class', 'user-follow-btn');
        // followCancleBtn.setAttribute('type', 'button');

        userListWrap.append(userprofileLI);
        userprofileLI.append(searchA);
        userprofileLI.append(followBtn);
        // userprofileLI.append(followCancleBtn);
        searchA.append(userProfileImg);
        searchA.append(userInfo);
        userInfo.append(userProfileName);
        userInfo.append(userProfileId);

        userProfileName.textContent = userName;
        userProfileId.textContent = accountName;
        // followBtn.textContent = '팔로우';
        // followCancleBtn.textContent = '취소';

        if ((el.follower).includes(userProfileId)) {
          followBtn.setAttribute('class', 'user-follow-btn cancel');
          followBtn.setAttribute('id', 'user-follow-btn-cancel');
          followBtn.textContent = '취소';
        } else {
          followBtn.setAttribute('class', 'user-follow-btn');
          followBtn.setAttribute('id', 'user-follow-btn');
          followBtn.textContent = '팔로우';
        }


        // 유저 프로필 클릭 시 해당 페이지로 이동
        searchA.addEventListener('click', () => {
          location.href = `/pages/profile.html?accountname=${accountName}`;
        })
      })
    }
  } catch (error) {
    console.error(error);
  }
}
searchInp.addEventListener('input', searchUser)
