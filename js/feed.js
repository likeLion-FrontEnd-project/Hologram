const accountName = localStorage.getItem('accountname');
const token = localStorage.getItem('token');
const feedMain = document.querySelector('.home-main');
const postCategory = document.querySelector('.post-category');
const postTit = document.querySelector('.post-title');
const modalBg = document.querySelector('.modal-bg');
const modalBottom = document.querySelector('.modal-window-bottom');

// 피드 정보 불러오기
async function getFeedInfo () {
  const url = 'https://mandarin.api.weniv.co.kr';
  const postFeedPath = '/post/feed/?limit=50&skip=0';
  const reqInfo = {
    method : 'GET',
    headers : {
      Authorization : `Bearer ${token}`,
      'Content-type' : 'application/json',
    },
  }
  const res = await fetch(url + postFeedPath, reqInfo)
                    .then((response) => {
                      return response;
                    })
  const json = await res.json();
  console.log('post 전송',json);

  // 포스트가 없으면 초기화면 , 있으면 팔로우 게시글 보여주기
  if(json.posts.length <= 0 ) {
    // 피드 초기화면
    const feedMainInit = document.createElement('div');
    const mainLogoImg = document.createElement('img');
    const mainText = document.createElement('p');
    const mainSearchLink = document.createElement('a');
    
    feedMainInit.setAttribute('class', 'home-main-initial');
    mainLogoImg.setAttribute('class', 'main-logo-image');
    mainLogoImg.setAttribute('src', '../assets/images/image-symbol-logo.png');
    mainText.setAttribute('class', 'main-text');
    mainSearchLink.setAttribute('class', 'main-search-link');
    mainSearchLink.setAttribute('href', '../pages/search-init.html');

    mainText.textContent = '유저를 검색해 팔로우 해보세요!';
    mainSearchLink.textContent = '검색하기'

    feedMain.append(feedMainInit);
    feedMainInit.append(mainLogoImg);
    feedMainInit.append(mainText);
    feedMainInit.append(mainSearchLink);
  } else {
    // 팔로우 목록의 피드 화면
    const postSection = document.createElement('section');
    const srOnly = document.createElement('h2');
    const postWrap = document.createElement('ul');

    postSection.setAttribute('class', 'post-section');
    srOnly.setAttribute('class', 'sr-only');
    postWrap.setAttribute('class', 'post-list-wrap feed');

    srOnly.textContent = '피드 게시물 부분';

    feedMain.append(postSection);
    postSection.append(srOnly);
    postSection.append(postWrap);

    for(let i = 0; i < json.posts.length; i++) {
      const POSTS = json.posts[i];
      // 피드 리스트 목록
      const postList = document.createElement('li');
      const postNav = document.createElement('div');
      const postUser = document.createElement('div');
      const userInfo = document.createElement('div');

      postList.setAttribute('class', 'post-list-item');
      postNav.setAttribute('class', 'post-nav');
      postUser.setAttribute('class', 'post-user');
      userInfo.setAttribute('class', 'user-info');

      postWrap.append(postList);
      postList.append(postNav);
      postNav.append(postUser);
      postUser.append(userInfo);
      
      // 피드 이미지
      const postImgWrap = document.createElement('ul');
      const postImgList = document.createElement('li');
      const imgUrl = POSTS.image;

      postImgWrap.setAttribute('class', 'post-img-wrap');
      postImgList.setAttribute('class', 'post-img-list');

      postList.prepend(postImgWrap);
      postImgWrap.append(postImgList)

      if(imgUrl.split(',').length >= 1 && imgUrl.split(',')[0] !== '') {
        imgUrl.split(',').map((src) => {
        const postImg = document.createElement('img');
        postImg.setAttribute('class', 'post-image');
        postImg.src = src;
        postImgList.append(postImg);        
      })
      } else {
        postImgWrap.remove(postImgList)
      } 

      // 피드 프로필계정 & 프로필이미지 & 더보기 버튼
      const userImage = document.createElement('img');
      const userName = document.createElement('strong');
      const account = document.createElement('span');
      const postMenuBtn = document.createElement('button');
      const menuBtnImg = document.createElement('img');

      userImage.setAttribute('class', 'profile-image');
      userImage.setAttribute('src', POSTS.author.image);
      userName.setAttribute('class', 'profile-name');
      account.setAttribute('class', 'profile-account');
      postMenuBtn.setAttribute('class', 'post-menu-button');
      menuBtnImg.setAttribute('class', 'post-menu-button-image');
      menuBtnImg.setAttribute('src', '../assets/images/icon/icon-post-menu.svg');
      
      postUser.prepend(userImage);
      userInfo.append(userName);
      userInfo.append(account);
      postMenuBtn.append(menuBtnImg);
      postNav.append(postMenuBtn);

      const accountName = POSTS.author.accountname;
      const username = POSTS.author.username;

      userName.textContent = username;
      account.textContent =  `@${accountName.slice(0, 6)}`;
      
      // 프로필사진 클릭 시 해당 프로필 페이지로 이동
      userImage.addEventListener('click', () => {
        location.href = `/pages/profile.html?accountname=${accountName}`;
      })

      // 피드 컨텐츠 내용
      const contentText = POSTS.content.split(',');
      const postMain = document.createElement('div');
      const postCategory = document.createElement('span');
      const postTitle = document.createElement('h3');
      const postContent = document.createElement('p');
      const postMoreBtn = document.createElement('button');

      postMain.setAttribute('class', 'post-main');
      postCategory.setAttribute('class', 'post-category');
      postTitle.setAttribute('class', 'post-title');
      postContent.setAttribute('class', 'post-content');
      postMoreBtn.setAttribute('class', 'detail-button');
      
      postList.append(postMain);
      postMain.append(postCategory);
      postMain.append(postTitle);
      postMain.append(postContent);
      postContent.append(postMoreBtn);

      if(contentText.length < 3) {
        postCategory.style.display = 'none';
        postTitle.style.display = 'none';
        postContent.textContent = contentText[0];
      } else {
        // 카테코리, 타이틀 추가
        postCategory.textContent = contentText[0];
        postTitle.textContent = contentText[1];
        postContent.textContent = contentText[2];
      }

      // 피드 하단 - 시간, 좋아요, 댓글
      const postFooter = document.createElement('div');
      const postTime = document.createElement('p');
      const postFooterBtns = document.createElement('div');
      const likeBtn = document.createElement('button');
      const likeNum = document.createElement('span');
      const commentBtn = document.createElement('button');
      const commentNum = document.createElement('span');

      postFooter.setAttribute('class', 'post-footer');
      postTime.setAttribute('class', 'post-time');
      postFooterBtns.setAttribute('class', 'post-footer-button');
      likeBtn.setAttribute('class', 'like-button');
      likeBtn.setAttribute('type', 'button');
      likeNum.setAttribute('class', 'like-num');
      commentBtn.setAttribute('class', 'comment-button');
      commentBtn.setAttribute('type', 'button');
      commentNum.setAttribute('class', 'comment-num');
      
      postList.append(postFooter);
      postFooter.append(postTime);
      postFooter.append(postFooterBtns);
      postFooterBtns.append(likeBtn);
      postFooterBtns.append(likeNum);
      postFooterBtns.append(commentBtn);
      postFooterBtns.append(commentNum);

      const heartCount = POSTS.heartCount;
      const commentCount = POSTS.commentCount;
    
      likeNum.textContent = heartCount;
      commentNum.textContent = commentCount;

      // 업로드 시간
      const uploadDate = timeForToday(POSTS.createdAt);
      postTime.textContent = uploadDate;

      // 좋아요 클릭
      likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('clicked')
      })

      // 더보기 버튼 클릭시 하단 모달창 열기
      postMenuBtn.addEventListener('click', () => {
        modalBg.classList.remove('hidden');
        modalBottom.classList.remove('hidden');
      })
    }
  }
} 
getFeedInfo();

// 피드 업로드 시간 확인하는 함수
function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);
  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일 전`;
  }
  return `${Math.floor(betweenTimeDay / 365)}년 전` + console.log(today);
}
