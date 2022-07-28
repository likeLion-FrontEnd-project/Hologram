const url = 'https://mandarin.api.weniv.co.kr';
const accountName = localStorage.getItem('accountname');
const token = localStorage.getItem('token');
const searchInp = document.querySelector('.search');
const searchMain = document.querySelector('.search-main');
const userListWrap = document.querySelector('.user-list-wrap');

const marketImg = "http://146.56.183.55:5050/Ellipse.png"; // 감귤마켓 기본이미지 
const mandarinImg = "https://mandarin.api.weniv.co.kr/Ellipse.png"; // 감귤마켓 기본이미지 
const defaultImg = "../assets/images/img-profile_large.png"; 

function imgCheck(img) {
  if (img === marketImg || img == mandarinImg || img == defaultImg) {
    return defaultImg;
  } else if (img.search(url) !== -1 || img.search('base64') !== -1 || img.search('.svg') !== -1 || img.search('http://') !== -1 || img.search('https://') !== -1) {
    return img;
  } else if (img.search(url) === -1) { // 이미지가 뜨지 않을 때
    return `${url}/${img}`  
  } 
}

/* 뒤로 가기 */
const backBtn = document.querySelector('.back-btn');
function goBack() {
  window.history.back();
}
backBtn.addEventListener('click', goBack);


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
        const userImg = imgCheck(el.image);
  
        const userprofileLI = document.createElement('li');
        const searchA = document.createElement('a');
        const userProfileImg = document.createElement('img');
        const userInfo = document.createElement('div');
        const userProfileName = document.createElement('strong');
        const userProfileId = document.createElement('span');

        userprofileLI.setAttribute('class', 'user-profile-li');
        searchA.setAttribute('class', 'search-a');
        userProfileImg.setAttribute('class', 'user-img');
        userProfileImg.setAttribute('src', userImg);
        userInfo.setAttribute('class', 'user-info');
        userProfileName.setAttribute('class', 'user-name');
        userProfileId.setAttribute('class', 'user-id');

        userListWrap.append(userprofileLI);
        userprofileLI.append(searchA);
        searchA.append(userProfileImg);
        searchA.append(userInfo);
        userInfo.append(userProfileName);
        userInfo.append(userProfileId);

        userProfileName.textContent = userName;
        userProfileId.textContent = accountName;

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
