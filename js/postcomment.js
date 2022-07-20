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
let curAccountname;
let commentId;
let curComment;

// 댓글 작성 시간

const getTimeDifference = (time) => {
    const commentTime = Date.parse(time);
    console.log(commentTime);
    const nowTime = Date.now();
    const Difference = (nowTime - commentTime) / 1000;
    if (Difference < 60) return `${parseInt(Difference)}초 전`;
    else if (Difference < 3600) return `${parseInt(Difference / 60)}분 전`;
    else if (Difference < 86400) return `${parseInt(Difference / 3600)}시간 전`;
    else if (Difference < 2592000) return `${parseInt(Difference / 86400)}일 전`;
    else return `${parseInt(Difference / 2592000)}달 전`;
};

// 댓글 가져오기
async function handleGetComment() {
    const post_id = window.localStorage.getItem('post_id');
    const token = window.localStorage.getItem('token');
    const requestCommentsInformation = {
        method:"GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    }
    const res = await fetch(url+`/post/${post_id}/comments`, requestCommentsInformation)
                        .then((response)=> {return response;})
                        .catch((error) => {location.href="../pages/404.html";})
    const json = await res.json()
    console.log('댓글 가져오기',json.comments);
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
            if(curAccountname === localStorage.getItem('accountname')) {  
                modalRemove.style.display="block";
                modalBackground.style.display="block";
                modalBackground.addEventListener('click',() => {
                    modalRemove.style.display="none";
                    modalBackground.style.display="none";
                })
            }  
            else {
                modalReport.style.display="block";
                modalBackground.style.display="block";
                modalBackground.addEventListener('click',() => {
                    modalReport.style.display="none";
                    modalBackground.style.display="none";
                })
            }
        })
    })
}


handleGetComment();

// 댓글 생성
async function handlePostComment() {
    const post_txt = commentInput.value;
    commentInput.value='';
    const post_id = window.localStorage.getItem('post_id');
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
    const res = await fetch(url+`/post/${post_id}/comments`, requestCommentInformation)
                        .then((response) => {return response;})
                        .catch((error) => {location.href="../pages/404.html";})
    const json = await res.json();
    console.log('댓글 생성 결과',json.comment);
    commentId =  json.comment.id;
    
    const comment = document.createElement('li');
    comment.setAttribute('class','usercomment-container');

    // user 프로필 이미지
    const userImg = document.createElement('img')
    userImg.setAttribute('src',json.comment.author.image);
    userImg.setAttribute('class','userprofile-img');


    const container = document.createElement('div');
    container.setAttribute('class','info-div');
    const userContainer = document.createElement('div');
    userContainer.setAttribute('class',"userinfo-div");

    // user 닉네임
    const nickname = document.createElement('p');
    nickname.setAttribute('class',"nickname-txt");
    nickname.innerText=json.comment.author.username;

    // 댓글 작성 시간
    const texttime = document.createElement('span');
    texttime.setAttribute('class',"time-txt");
    const Difference = getTimeDifference(json.comment.createdAt);
    console.log("시간 차",Difference);
    texttime.innerText=`${Difference}`;
    userContainer.append(nickname,texttime);

    // 댓글 내용
    const menuBtn = document.createElement("p");
    menuBtn.setAttribute('class',"chat-txt");
    menuBtn.innerText = json.comment.content;
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
    postBtn.addEventListener('click',() => {
        modalRemove.style.display="block";
        modalBackground.style.display="block";
        modalBackground.addEventListener('click',() => {
            console.log("gk")
            modalRemove.style.display="none";
            modalBackground.style.display="none";
        })
    })
}

postBtn.addEventListener('click',handlePostComment);

// 신고 모달창
async function handleReportModal() {
    cancleBtnModal.style.display="block";
    reportModalBackground.style.display="block";
}

cancleBtn.addEventListener('click',handleReportModal);

// 신고 모달 취소 버튼
async function handleCancleReportBtn() {
    cancleBtnModal.style.display="none";
    reportModalBackground.style.display="none";
}


cancleReport.addEventListener('click', handleCancleReportBtn)

// 신고 모달 신고 버튼
async function handleDoReportBtn() {
    const postId = window.localStorage.getItem('post_id');
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
                        .catch((error) => {location.href="../pages/404.html";})
    const json = await res.json();
    console.log('댓글  신고 결과',json);
    cancleBtnModal.style.display="none";
    reportModalBackground.style.display="none";
}


doReport.addEventListener('click',handleDoReportBtn);

// 삭제 모달 삭제 버튼
async function handleCancleBtn() {
    const postId = window.localStorage.getItem('post_id');
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
                        .catch((error) => {location.href="../pages/404.html";})
    const json = await res.json();
    console.log('댓글  삭제 결과',json);
    commentList.removeChild(curComment);
}


removeBtn.addEventListener('click', handleCancleBtn);


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

