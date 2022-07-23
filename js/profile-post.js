const token = localStorage.getItem('token');
const getAccount = location.search.replace("?","").split("=");
const accountName = (getAccount == '') ? localStorage.getItem('accountname') : getAccount[1];

const postListWrap = document.querySelector('.post-list-wrap')
const modalBg = document.querySelectorAll('.modal-bg');
const modalBottom = document.querySelectorAll('.modal-window-bottom');
const modalCloseBar = document.querySelectorAll('.modal-close-bar');
const modalDelete = document.querySelector('#delete-post');
const modalModify = document.querySelector('#modify-post');
const modalCenter = document.querySelectorAll('.modal-window-center');
const modalCancelBtn = document.querySelectorAll('#cancel-btn');
const modalDeleteBtn = document.querySelector('#delete-btn');

async function getMyFeed () {
    const myFeedPath = `/post/${accountName}/userpost`;
    const reqInfo = {
      method : 'GET',
      headers : {
        Authorization : `Bearer ${token}`,
        'Content-type' : 'application/json',
      },
    }
    const res = await fetch(url + myFeedPath, reqInfo)
                      .then((response) => {
                        return response;
                      })
    const json = await res.json();

    const srOnly = document.createElement('h2');
    srOnly.setAttribute('class', 'sr-only');
    srOnly.textContent = '피드 게시물 부분';
  
    for(let i = 0; i < json.post.length; i++) {
      const POST = json.post[i];
      const postId = POST.id;

      // 피드 리스트 목록
      const postList = document.createElement('li');
      const postNav = document.createElement('div');
      const postUser = document.createElement('div');
      const userInfo = document.createElement('div');

      postList.setAttribute('class', 'post-list-item');
      postNav.setAttribute('class', 'post-nav');
      postUser.setAttribute('class', 'post-user');
      userInfo.setAttribute('class', 'user-info');

      postListWrap.append(postList);
      postList.append(postNav);
      postNav.append(postUser);
      postUser.append(userInfo);
      
      // 피드 이미지
      const postImgWrap = document.createElement('ul');
      const postImgList = document.createElement('li');
      const imgUrl = POST.image;

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
      userImage.setAttribute('src', POST.author.image);
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

      const accountName = POST.author.accountname;
      const username = POST.author.username;

      userName.textContent = username;
      account.textContent =  `@${accountName}`;
      
      // 프로필사진 클릭 시 해당 프로필 페이지로 이동
      userImage.addEventListener('click', () => {
        location.href = `/pages/profile.html?accountname=${accountName}`;
        
      })

      // 피드 컨텐츠 내용
      const contentText = POST.content.split(',');
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

      if(contentText.length >= 3 && contentText[0] === '오늘의 잡담' || contentText[0] === '찬반대결' || contentText[0] === '오늘의 팁') {
        // 카테고리, 타이틀 추가 (카테고리명이 일치할 경우에만)
        postCategory.textContent = contentText[0];
        postTitle.textContent = contentText[1];
        postContent.textContent = contentText[2];
      }
      else {
        postCategory.style.display = 'none';
        postTitle.style.display = 'none';
        postContent.textContent = contentText;
      }
    
      // 피드 하단 
      const postFooter = document.createElement('div');
      const postTime = document.createElement('p');
      const postFooterBtns = document.createElement('div');
      const likeBtn = document.createElement('button');
      const likeNum = document.createElement('span');
      const commentBtn = document.createElement('button');
      const commentNum = document.createElement('span');

      postFooter.setAttribute('class', 'post-footer');
      postList.append(postFooter);

    // 피드 하단 - 찬성 or 반대
      if(contentText[0] === '찬반대결') {
        const clicked = 'clicked';

        // 카테고리가 '찬반 대결'인 경우 피드 하단 부분
        const thumUpBtn = document.createElement('button');
        const thumUpImg = document.createElement('img');
        const thumDownBtn = document.createElement('button');
        const thumDownImg = document.createElement('img');

        postFooter.setAttribute('class', 'post-footer thumbs-buttons');
        thumUpBtn.setAttribute('class', 'thumbs-up-button');
        thumUpImg.setAttribute('class', 'thumbs-up-image');
        thumDownBtn.setAttribute('class', 'thumbs-down-button');
        thumDownImg.setAttribute('class', 'thumbs-down-image');

        postFooter.append(thumUpBtn);
        postFooter.append(thumDownBtn);
        thumUpBtn.append(thumUpImg);
        thumDownBtn.append(thumDownImg);

        // 찬성 
        thumUpBtn.addEventListener('click', () => {
          thumDownBtn.classList.remove(clicked);
          thumUpBtn.classList.toggle(clicked);
          thumUpBtn.style.transition = '0.3s';
        })
        // 반대
        thumDownBtn.addEventListener('click', () => {
          thumUpBtn.classList.remove(clicked);
          thumDownBtn.classList.toggle(clicked);
          thumDownBtn.style.transition = '0.3s';
        })
      } else {
        // 피드 하단 기본(시간, 좋아요, 댓글)
        postTime.setAttribute('class', 'post-time');
        postFooterBtns.setAttribute('class', 'post-footer-button');
        likeBtn.setAttribute('class', 'like-button');
        POST.hearted ? likeBtn.classList.add('clicked') : likeBtn.classList.remove('clicked');
        likeBtn.setAttribute('type', 'button');
        likeNum.setAttribute('class', 'like-num');
        commentBtn.setAttribute('class', 'comment-button');
        commentBtn.setAttribute('type', 'button');
        commentNum.setAttribute('class', 'comment-num');

        postFooter.append(postTime);
        postFooter.append(postFooterBtns);
        postFooterBtns.append(likeBtn);
        postFooterBtns.append(likeNum);
        postFooterBtns.append(commentBtn);
        postFooterBtns.append(commentNum);

        const heartCount = POST.heartCount;
        const commentCount = POST.commentCount;
      
        likeNum.textContent = heartCount;
        commentNum.textContent = commentCount;

        // 업로드 시간
        const uploadDate = timeForToday(POST.createdAt);
        postTime.textContent = uploadDate;

      // 좋아요 
      async function likePost (post_id) {
        const likePath = `/post/${post_id}/heart`;
        const reqInfo = {
          method : 'POST',
          headers : {
            Authorization : `Bearer ${token}`,
            'Content-type' : 'application/json',
          },
        }
        const res = await fetch(url + likePath, reqInfo)
                          .then((response) => {
                            return response;
                          })
        const json = await res.json();
        return json;
      }

      async function cancelLikePost (post_id) {
        const likeCancelPath = `/post/${post_id}/unheart`;
        const reqInfo = {
          method : 'DELETE',
          headers : {
            Authorization : `Bearer ${token}`,
            'Content-type' : 'application/json',
          },
        }
        const res = await fetch(url + likeCancelPath, reqInfo)
                          .then((response) => {
                            return response;
                          })
        const json = await res.json();
        return json;
      }
      
      async function handleLikeBtn () {
        let data = {};
        let postId = POST.id;

        if(likeBtn.classList.contains('clicked')) {
          likeBtn.classList.remove('clicked');
          data = await cancelLikePost(postId);
          likeNum.textContent = data.post.heartCount;
        } else {
          likeBtn.classList.add('clicked');
          data = await likePost(postId);
          likeNum.textContent = data.post.heartCount;
        }
      }
      likeBtn.addEventListener('click', handleLikeBtn);

        // 댓글창 연결
        commentBtn.addEventListener('click', () => {
          location.href = `/pages/postcomment.html?postId=${postId}`;
        })
      }

      // 게시글 삭제 하단 모달창
      postMenuBtn.addEventListener('click', () => {
        modalBg[1].classList.remove('hidden');
        modalBottom[1].classList.remove('hidden');

        modalCloseBar[1].addEventListener('click', () => {
          modalBottom[1].classList.add('hidden');
          modalBg[1].classList.add('hidden');
        })

        modalBg[1].addEventListener('click', () => {
          modalBottom[1].classList.add('hidden');
          modalBg[1].classList.add('hidden');
        })
      })

      // 게시글 삭제 중앙 모달창
      modalDelete.addEventListener('click', () => {
        modalCenter[1].classList.remove('hidden');
        modalBottom[1].classList.add('hidden');
        modalBg[1].addEventListener('click', () => {
          modalCenter[1].classList.add('hidden');
        })
    
        modalDeleteBtn.addEventListener('click', () => {
          modalCenter[1].classList.add('hidden');
          modalBg[1].classList.add('hidden');
        })

        modalCancelBtn[1].addEventListener('click', () => {
          modalCenter[1].classList.add('hidden');
          modalBg[1].classList.add('hidden');
        })
      })

      modalDeleteBtn.addEventListener('click', () => {
        modalCenter[1].classList.add('hidden');
        modalBg[1].classList.add('hidden');
      })

      modalCancelBtn[1].addEventListener('click', () => {
        modalCenter[1].classList.add('hidden');
        modalBg[1].classList.add('hidden');
      })
    }
  }
getMyFeed();
  
  // 피드 업로드 시간 확인하는 함수
  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);
    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60);
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
  