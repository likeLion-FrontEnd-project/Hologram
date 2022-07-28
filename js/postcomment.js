const main = document.querySelector('.main');
const postUl = document.querySelector('.post-ul')
const commentInput = document.querySelector(".comment-inp");
const postBtn = document.querySelector(".post-btn");
const chatTxt = document.querySelector(".chat-txt");
const commentList = document.querySelector('.comment-list');
const commentInputBtn = document.querySelector(".post-btn span");
const profileImg = document.querySelector(".profile-img");
const postUrl = new URLSearchParams(document.location.search);
const postId =  postUrl.get("postId");
const commentNum = document.createElement('span');
const modalBg = document.querySelectorAll('.modal-bg');
const modalBottom = document.querySelectorAll('.modal-window-bottom');
const modalReportBottom = document.querySelector('.modal-window-bottom-report');
const modalCloseBar = document.querySelectorAll('.modal-close-bar');
const modalCommentDelete = document.querySelector('#delete-comment');
const modalCommentReport = document.querySelector('#report-comment');
const modalDelete = document.querySelector('#delete-post');
const modalModify = document.querySelector('#modify-post');
const modalReport = document.querySelector('#report-post');
const modalCenter = document.querySelectorAll('.modal-window-center');
const modalPostReportCenter = document.querySelector('.modal-window-center-post-report');
const modalCommentReportCenter = document.querySelector('.modal-window-center-report');
const modalCommentCancelBtn = document.querySelector('#cancel-comment-btn');
const modalCommentReportBtn = document.querySelector('#report-comment-btn');
const modalPostCancelBtn = document.querySelector('#report-cancel-post-btn');
const modalPostReportBtn = document.querySelector('#report-post-btn');
const modalDeleteBtn = document.querySelector('#delete-post-btn');
const modalCancelBtn = document.querySelector('#cancel-post-btn');

let commentCount; 
let curAccountname;
let commentId;
let curComment;
let curPostId;
let curPost;

const marketImg = "http://146.56.183.55:5050/Ellipse.png"; // 감귤마켓 기본이미지 
const mandarinImg = "https://mandarin.api.weniv.co.kr/Ellipse.png"; // 감귤마켓 기본이미지 
const defaultImg = "../assets/images/img-profile_large.png"; 

// 내 정보 불러오기
async function handleMyInfo () {
  const token = window.localStorage.getItem('token');
  const accointMe = localStorage.getItem('accountname') 
  const requestMyInformation = {
      method:"GET",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      }
  }
  const res = await fetch(url+`/profile/${accointMe}`, requestMyInformation)
                      .then((response)=> {return response;})
                      .catch((error) => {location.href="/pages/404.html";})
  const json = await res.json();
  profileImg.src = json.profile.image;
}

handleMyInfo();
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
  commentCount = json.post.commentCount;
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
  postImg.src = imgCheck(src);
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
  userImage.setAttribute('src', imgCheck(POST.author.image));
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

      postFooter.setAttribute('class', 'post-footer');
      postTime.setAttribute('class', 'post-time');
      postFooterBtns.setAttribute('class', 'post-footer-button');
      likeBtn.setAttribute('class', 'like-button');
      POST.hearted ? likeBtn.classList.add('clicked') : likeBtn.classList.remove('clicked');
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
  }

  // 게시글 신고
  postMenuBtn.addEventListener('click',() => {
      curPost = postList; 
      curPostId = POST.id;
      curAccountname=  POST.author.accountname;
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
    commentList.textContent='';
    json.comments.slice().reverse().forEach((value,index) => {
        const comment = document.createElement('li');
        comment.setAttribute('class','usercomment-container');

        // user 프로필 이미지
        const userImg = document.createElement('img')
        userImg.setAttribute('src',imgCheck(value.author.image));
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
            executeCommentModal();
        })

        userImg.addEventListener('click', () => {
          location.href = `/pages/profile.html?accountname=${value.author.accountname}`;
        })
    })
}

handleGetComment();

// 댓글 생성
async function handlePostComment() {
  const post_txt = commentInput.value;
  commentInput.value='';
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
  handleGetComment();
  commentCount += 1;
  commentNum.textContent = commentCount;
}

postBtn.addEventListener('click',handlePostComment);

// 댓글 신고 
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
  console.log('댓글 신고 결과',json);
  modalCenter[0].classList.add('hidden');
  modalBg[1].classList.add('hidden');
}


// 댓글 삭제
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
  commentList.removeChild(curComment);
  commentCount -= 1;
  commentNum.textContent = commentCount;
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
    modalBg[0].classList.remove('hidden');
    modalBottom[0].classList.remove('hidden');
  
    modalCloseBar[0].addEventListener('click', () => {
      modalBottom[0].classList.add('hidden');
      modalBg[0].classList.add('hidden');
    })
    modalBg[0].addEventListener('click', () => {
      modalBottom[0].classList.add('hidden');
      modalBg[0].classList.add('hidden');
    })

    modalCommentDelete.addEventListener('click',handleCancleBtn);

  }  
  else {
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

      modalCommentReport.addEventListener('click', ()=> {
        modalCenter[0].classList.remove('hidden');
        modalBottom[1].classList.add('hidden');
        modalBg[1].addEventListener('click', () => {
          modalCenter[0].classList.add('hidden');
        })
  
      })

      modalCommentReportBtn.addEventListener('click',handleDoCommentReportBtn);

      modalCommentCancelBtn.addEventListener('click', () => {
        modalCenter[0].classList.add('hidden');
        modalBg[1].classList.add('hidden');
      })

  }
}

// 게시물 삭제
async function handleDeletePost() {
  modalCenter[1].classList.add('hidden');
  modalBg[1].classList.add('hidden'); 
  const token = window.localStorage.getItem('token');
  const requestDeleteInformation = {
      method:"DELETE",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      },
  }
  const res = await fetch(url+`/post/${curPostId}`,requestDeleteInformation)
                      .then((response)=> {return response;})
                      .catch((error) => {location.href="/pages/404.html";})
  const json = await res.json();
  location.href = `/pages/profile.html?accountname=${curAccountname}`;
}

// 게시물 신고
async function handleReportPost() {
  modalPostReportCenter.classList.add('hidden');
  modalBg[3].classList.add('hidden'); 
  const token = window.localStorage.getItem('token');
  const requestReportInformation = {
      method:"POST",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      },
  }
  const res = await fetch(url+`/post/${curPostId}/report`, requestReportInformation)
                      .then((response) => {return response;})
                      .catch((error) => {location.href="/pages/404.html";})
  const json = await res.json();
  console.log('게시물 신고 결과',json);
}

function executePostModal() {
  if(curAccountname === localStorage.getItem('accountname')){
    modalBg[2].classList.remove('hidden');
    modalBottom[2].classList.remove('hidden');
  
    modalCloseBar[2].addEventListener('click', () => {
      modalBottom[2].classList.add('hidden');
      modalBg[2].classList.add('hidden');
    })
  
    modalBg[2].addEventListener('click', () => {
      modalBottom[2].classList.add('hidden');
      modalBg[2].classList.add('hidden');
    })

    // 게시글 삭제 중앙 모달창
    modalDelete.addEventListener('click', () => {
      modalCenter[1].classList.remove('hidden');
      modalBottom[2].classList.add('hidden');
      modalBg[2].addEventListener('click', () => {
        modalCenter[1].classList.add('hidden');
      })
    })

    modalDeleteBtn.addEventListener('click',handleDeletePost);

    modalCancelBtn.addEventListener('click', () => {
      modalCenter[1].classList.add('hidden');
      modalBg[2].classList.add('hidden');
    })

    // 게시물 수정 
    modalModify.addEventListener('click',() => {
      location.href = `/pages/editpost.html?postId=${curPostId}`;
    }

    )

  } else {
    modalBg[3].classList.remove('hidden');
    modalReportBottom.classList.remove('hidden');
  
    modalCloseBar[3].addEventListener('click', () => {
      modalReportBottom.classList.add('hidden');
      modalBg[3].classList.add('hidden');
    })
  
    modalBg[3].addEventListener('click', () => {
      modalReportBottom.classList.add('hidden');
      modalBg[3].classList.add('hidden');
    })

    // 게시글 신고 중앙 모달창
    modalReport.addEventListener('click', () => {
      modalPostReportCenter.classList.remove('hidden');
      modalReportBottom.classList.add('hidden');
      modalBg[3].addEventListener('click', () => {
        modalPostReportCenter.classList.add('hidden');
      })
    })
    modalPostReportBtn.addEventListener('click',handleReportPost);

    modalPostCancelBtn.addEventListener('click', () => {
      modalPostReportCenter.classList.add('hidden');
      modalBg[3].classList.add('hidden');
    })
  }

}

// 로그아웃

modalBg[4].addEventListener("click", close); 