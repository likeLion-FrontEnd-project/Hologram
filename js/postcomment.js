const main = document.querySelector('.main');
const postUl = document.querySelector('.post-ul')
const modalBackground = document.querySelector(".modal-background");
const reportModalBackground = document.querySelector(".report-modal-background");
const commentInput = document.querySelector(".comment-inp");
const postBtn = document.querySelector(".post-btn");
const chatTxt = document.querySelector(".chat-txt");
const commentList = document.querySelector('.comment-list');
const commentInputBtn = document.querySelector(".post-btn span");
const modalReport = document.querySelector('.modal-window-bottom.report');
const modalRemove = document.querySelector('.modal-window-bottom.remove');
const cancleBtn = document.querySelector('.modal-list-btn.report');
const removeBtn = document.querySelector('.modal-list-btn.remove');
const cancleBtnModal = document.querySelector('.report-modal');
const cancleReport = document.querySelector('.cancle-btn');
const doReport = document.querySelector('.report-btn');
const postUrl = new URLSearchParams(document.location.search);
const postId =  postUrl.get("postId");
let curAccountname;
let commentId;
let curComment;

// 게시글 불러오기
async function handleGetPost() {
  const token = window.localStorage.getItem('token');
  const requestPostInformation = {
      method:"GET",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      }
  }
  const res = await fetch(url+`/post/${postId}`, requestPostInformation)
                      .then((response)=> {return response;})
                      .catch((error) => {location.href="/pages/404.html";})
  const json = await res.json();
  console.log('게시글 가져오기',json.post);

  const postWrap = document.createElement('div');
  postWrap.setAttribute('class', 'post-list-wrap');

  main.prepend(postUl);
  postUl.append(postWrap);
  const POST = json.post;
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
  account.textContent =  `@${accountName.slice(0, 6)}`;
  
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

  // 카테고리 - 찬반대결
  if(contentText[0] == "찬반대결") {
      const postFooter = document.createElement('div');
      const agreementBtn = document.createElement('button');
      const agreementTxt = document.createElement('span');
      const OppositionBtn = document.createElement('button');
      const OppositionTxt = document.createElement('span');


      postFooter.setAttribute('class', 'post-footer thumbs-buttons');
      agreementBtn.setAttribute('class', 'thumbs-up-button');
      agreementBtn.setAttribute('type', 'button');
      agreementTxt.setAttribute('class', 'sr-only');
      OppositionBtn.setAttribute('class', 'thumbs-down-button');
      OppositionBtn.setAttribute('type', 'button');
      OppositionTxt.setAttribute('class', 'sr-only');
      
      postList.append(postFooter);
      postFooter.append(agreementBtn,OppositionBtn);
      agreementBtn.append(agreementTxt);
      OppositionBtn.append(OppositionTxt);

      agreementBtn.addEventListener('click',() => {
          agreementBtn.classList.toggle('clicked');
      })
      OppositionBtn.addEventListener('click',() => {
          OppositionBtn.classList.toggle('clicked');
      })
  }

  // 카테고리 - 오늘의 잡담 , 오늘의 팁
  else {
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

      const heartCount = POST.heartCount;
      const commentCount = POST.commentCount;

      likeNum.textContent = heartCount;
      commentNum.textContent = commentCount;

      // 업로드 시간
      const uploadDate = getTimeDifference(POST.createdAt);
      postTime.textContent = uploadDate;

      // 좋아요 클릭
      likeBtn.addEventListener('click', () => {
          likeBtn.classList.toggle('clicked')
      })
  }

  // 게시글 신고
  postMenuBtn.addEventListener('click',() => {
      executePostModal();
  })
}
handleGetPost();

// 댓글 작성 시간

const getTimeDifference = (time) => {
  const today = new Date();
  const timeValue = new Date(time);
  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return "방금 전";
  else if (betweenTime < 60) return `${betweenTime}분 전`;
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`;
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) { return `${betweenTimeDay}일 전`; }
  return `${Math.floor(betweenTimeDay / 365)}년 전` + console.log(today);
};

// 댓글 가져오기
async function handleGetComment() {
    const token = window.localStorage.getItem('token');
    const requestCommentsInformation = {
        method:"GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    }
    const res = await fetch(url+`/post/${postId}/comments`, requestCommentsInformation)
                        .then((response)=> {return response;})
                        .catch((error) => {location.href="/pages/404.html";})
    const json = await res.json()
    console.log('댓글 가져오기',json.comments);
    commentList.textContent='';
    json.comments.slice().reverse().forEach((value,index) => {
        console.log('댓글 정보' ,value);
        const comment = document.createElement('li');
        comment.setAttribute('class','usercomment-container');

        // user 프로필 이미지
        const userImg = document.createElement('img')
        userImg.setAttribute('src',value.author.image);
        userImg.setAttribute('class','userprofile-img');

        const container = document.createElement('div');
        container.setAttribute('class','info-div');
        const userContainer = document.createElement('div');
        userContainer.setAttribute('class',"userinfo-div");
        
        // user 닉네임
        const nickname = document.createElement('p');
        nickname.setAttribute('class',"nickname-txt");
        nickname.innerText=value.author.username;

        // 댓글 작성 시간
        const texttime = document.createElement('span');
        texttime.setAttribute('class',"time-txt");
        const Difference = getTimeDifference(value.createdAt);
        console.log("시간 차",Difference);
        texttime.innerText=`${Difference}`;
        userContainer.append(nickname,texttime);

        // 댓글 내용
        const menuBtn = document.createElement("p");
        menuBtn.setAttribute('class',"chat-txt");
        menuBtn.innerText = value.content;
        container.append(userContainer,menuBtn);

        // 메뉴 버튼
        const postBtn = document.createElement('button');
        postBtn.setAttribute('class','menu-btn');
        const menuImg = document.createElement('img');
        menuImg.setAttribute('src',"../assets/images/icon/icon-nav-menu.svg");
        postBtn.append(menuImg);
        comment.append(userImg,container,postBtn);
        commentList.append(comment);
        // 모달창 생성
        postBtn.addEventListener('click',(e) => {
            curAccountname=  value.author.accountname;
            commentId =  value.id;
            curComment = comment;
            console.log(curComment);
            executeCommentModal();
        })
    })
}


handleGetComment();

// 댓글 생성
async function handlePostComment() {
  const post_txt = commentInput.value;
  commentInput.value='';
  console.log('댓글 작성 내용',commentInput.value);
  const PostData = {
      "comment": {
          "content": post_txt,
      }
  }
  const token = window.localStorage.getItem('token');
  const requestCommentInformation = {
      method:"POST",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      },
      body:JSON.stringify(PostData)
  }
  const res = await fetch(url+`/post/${postId}/comments`, requestCommentInformation)
                      .then((response) => {return response;})
                      .catch((error) => {location.href="/pages/404.html";})
  const json = await res.json();
  console.log('댓글 생성 결과',json.comment);
  handleGetComment();
}

postBtn.addEventListener('click',handlePostComment);

// 신고 모달창
async function handleReportModal() {
  cancleBtnModal.style.display="block";
  reportModalBackground.style.display="block";
}


// 신고 모달 취소 버튼
async function handleCancleReportBtn() {
  cancleBtnModal.style.display="none";
  reportModalBackground.style.display="none";
}



// 신고 모달 댓글 신고 
async function handleDoCommentReportBtn() {
  const token = window.localStorage.getItem('token');
  const requestReportInformation = {
      method:"POST",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      },
  }
  const res = await fetch(url+`/post/${postId}/comments/${commentId}/report`, requestReportInformation)
                      .then((response) => {return response;})
                      .catch((error) => {location.href="/pages/404.html";})
  const json = await res.json();
  console.log('댓글  신고 결과',json);
  cancleBtnModal.style.display="none";
  reportModalBackground.style.display="none";
}

// 신고 모달 게시글 신고
async function handleDoPostReportBtn() {
  const token = window.localStorage.getItem('token');
  const requestReportInformation = {
      method:"POST",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      },
  }
  const res = await fetch(url+`/post/${postId}/report`, requestReportInformation)
                      .then((response) => {return response;})
                      .catch((error) => {location.href="/pages/404.html";})
  const json = await res.json();
  console.log('게시물 신고 결과',json);
  cancleBtnModal.style.display="none";
  reportModalBackground.style.display="none";
}



// 삭제 모달 삭제 버튼
async function handleCancleBtn() {
  const token = window.localStorage.getItem('token');
  const requestDeleteInformation = {
      method:"DELETE",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      },
  }
  const res = await fetch(url+`/post/${postId}/comments/${commentId}`,requestDeleteInformation)
                      .then((response)=> {return response;})
                      .catch((error) => {location.href="/pages/404.html";})
  const json = await res.json();
  console.log('댓글  삭제 결과',json);
  console.log(curComment);
  commentList.removeChild(curComment);
}





// 게시 버튼 색상 on
async function handleChangeBtnColor(e) {
  if(!(commentInput.value =="")) {
      commentInputBtn.classList.add('enabled');
  }
  else {
      commentInputBtn.classList.remove('enabled');
  }
}

commentInput.addEventListener('keyup', handleChangeBtnColor);

function executeCommentModal() {
  if(curAccountname === localStorage.getItem('accountname')) {  
      modalRemove.style.display="block";
      modalBackground.style.display="block";
      modalBackground.addEventListener('click',() => {
          modalRemove.style.display="none";
          modalBackground.style.display="none";
      })
      removeBtn.addEventListener('click', handleCancleBtn);
  }  
  else {
      modalReport.style.display="block";
      modalBackground.style.display="block";
      modalBackground.addEventListener('click',() => {
          modalReport.style.display="none";
          modalBackground.style.display="none";
      })
      cancleReport.addEventListener('click', handleCancleReportBtn)
      cancleBtn.addEventListener('click',handleReportModal);
      doReport.addEventListener('click',handleDoCommentReportBtn);
  }
}

function executePostModal() {
  modalReport.style.display="block";
  modalBackground.style.display="block";
  modalBackground.addEventListener('click',() => {
      modalReport.style.display="none";
      modalBackground.style.display="none";
  })
  cancleReport.addEventListener('click', handleCancleReportBtn)
  cancleBtn.addEventListener('click',handleReportModal);
  doReport.addEventListener('click',handleDoPostReportBtn);
}

const logoutModal = document.querySelector(".modal-window-bottom.logout");

document.querySelector(".more-menu-btn").addEventListener("click", () => {
    console.log("여기 되고 잇냐");
    console.log(logoutModal);
    logoutModal.style.display="block";
});