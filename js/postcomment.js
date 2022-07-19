const commentInput = document.querySelector(".comment-inp");
const postBtn = document.querySelector(".post-btn");
const chatTxt = document.querySelector(".chat-txt");
const commentList = document.querySelector('.comment-list');

// 댓글 생성
async function postComment() {
    const post_txt = commentInput.value;
    commentInput.value='';
    const post_id = window.localStorage.getItem('post_id');
    console.log(commentInput.value);
    const PostData = {
        "comment": {
            "content": post_txt,
        }
    }
    const token = window.localStorage.getItem('token');
    const res = await fetch(url+`/post/${post_id}/comments`, {
        method:"POST",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        },
        body:JSON.stringify(PostData)
    })
    const json = await res.json();
    console.log('댓글 생성 결과',json.comment);

    
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
    texttime.innerText="· 5분 전";
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
}

postBtn.addEventListener('click',postComment);

// 댓글 가져오기
async function getComment() {
    const post_id = window.localStorage.getItem('post_id');
    const token = window.localStorage.getItem('token');
    const res = await fetch(url+`/post/${post_id}/comments`, {
        method:"GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    const json = await res.json()
    console.log('댓글 가져오기',json.comments);
    json.comments.slice().reverse().forEach((value,index) => {
        console.log(value);
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
        texttime.innerText="· 5분 전";
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
    })
}


getComment();