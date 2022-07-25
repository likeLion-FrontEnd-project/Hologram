const selectBtn    = document.querySelector('.select-btn');
const categoryList = document.querySelector('.modal');
const postContent  = document.querySelector('.upload-txt');
const postTitle    = document.querySelector('.upload-tit')
const ImgList     = document.querySelector('.postimg-list');
const postImage = document.querySelector(".upload-img");
const uploadBtn = document.querySelector('.nav-btn');
const postImgList = document.querySelector('.postimg-list');
const dropboxCloseBtn = document.querySelector('.close');
const postUrl = new URLSearchParams(document.location.search);
const postId =  postUrl.get("postId");
let uploadURL=""
const imgFile=[];

// 업로드할 post 가져오기 
async function GetPost() {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch( `${url}/post/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-type' : 'application/json'
        }, 
        });
        const json = await res.json();
        const post = json.post;
        const contentText = post.content.split(',');
        if(contentText.length < 3) {
            selectBtn.style.display = 'none';
            postTitle.style.display = 'none';
            postContent.textContent = contentText[0];
        } else {
        // 카테코리, 타이틀 추가
            selectBtn.textContent = contentText[0];
            postTitle.value = contentText[1];
            postContent.textContent = contentText[2];
            uploadBtn.classList.add('enabled');
        }

        const imgUrl = post.image;

        if(imgUrl.split(',').length >= 1 && imgUrl.split(',')[0] !== '') {
            console.log("ehlsk?")
            imgUrl.split(',').map((src) => {
            const uploadList = document.createElement('li');
            const imgInput = document.createElement('img')
            imgInput.setAttribute('src',src);
            imgInput.setAttribute('class','file-img');
            const closeBtn = document.createElement('button');
            closeBtn.setAttribute('class',"file-btn");
            uploadList.append(imgInput,closeBtn);
            ImgList.append(uploadList);
            uploadURL=src;
            if(imgFile.length<=2) {
                imgFile.push(src);
            }
            else {
                alert("사진은 최대 3장까지 선택 가능합니다.");
                return null;
            }
            closeBtn.addEventListener('click',handleRemoveImg);
            
            })
        }

    } catch(err) {
        console.error(err);
    }
  }

GetPost();
// 카테고리 모달창 보여주기
async function handleShowList() {
  categoryList.classList.toggle('show');
}

selectBtn.addEventListener('click', handleShowList);

// 카테고리 모달창 닫기
async function handleRemoveList() {
  categoryList.classList.remove('show'); 
}

dropboxCloseBtn.addEventListener('click', handleRemoveList);


// 카테고리 선택
async function handleSelectList(e) {
  if (e.target.nodeName === "BUTTON") {
      selectBtn.innerText = e.target.innerText;
      categoryList.classList.remove('show');   
  }
}

categoryList.addEventListener("click",handleSelectList);


// 이미지 불러오기
async function imageUpload(file) {
  const formData = new FormData();
  formData.append("image",file);
  const imageUploadPath = "/image/uploadfiles";
  const requestInformation = {
      method:"POST",
      body:formData
  }
  const res = await fetch(url+imageUploadPath,requestInformation)
                      .then((response)=> { return response;})
                      .catch((error)=> { console.log('이미지 불러올 때 에러가 발생했습니다.',error);})
  const json = await res.json();
  console.log('json',json);
  if(imgFile.length<=2) {
      imgFile.push(url+"/"+json[0].filename);
  }
  else {
      alert("사진은 최대 3장까지 선택 가능합니다.");
      return null;
  }
  return url+"/"+json[0].filename;
}

// 미리보기 이미지 삭제
async function handleRemoveImg(e) {
  console.log("삭제할 이미지 url",e.target.parentNode.childNodes[0].currentSrc);
  console.log('선택한 이미지 요소의 부모요소',e.target.parentNode);
  const index = imgFile.findIndex((element) => {
      return element == e.target.parentNode.childNodes[0].currentSrc;
  })
  imgFile.splice(index,1);
  console.log('삭제하고 남은 보낼 이미지 file',imgFile);
  ImgList.removeChild(e.target.parentNode);
}

// 업로드할 이미지 미리보기
async function handleGetImageUrl(e) {
  console.log(e.target.files);
  const file = e.target.files[0];
  const imgSrc = await imageUpload(file);
  console.log('이미지 url', imgSrc);
  console.log('보낼 이미지 file',imgFile);
  if(imgSrc !== null) {
      const uploadList = document.createElement('li');
      const imgInput = document.createElement('img')
      imgInput.setAttribute('src',imgSrc);
      imgInput.setAttribute('class','file-img');
      const closeBtn = document.createElement('button');
      closeBtn.setAttribute('class',"file-btn");
      uploadList.append(imgInput,closeBtn);
      ImgList.append(uploadList);
      uploadURL=imgSrc;
      closeBtn.addEventListener('click',handleRemoveImg);
  }
}

postImage.addEventListener("change",handleGetImageUrl);

// 업로드 버튼 색상 on
async function handleChangeBtnColor(e) {
  if(!(postTitle.value =="")) {
      uploadBtn.classList.add('enabled');
  }
  else {
      uploadBtn.classList.remove('enabled');
  }
}

postTitle.addEventListener('keyup', handleChangeBtnColor);

// 게시물 수정
async function postUpdate() {
  let imgUrl=""
  if(uploadBtn.classList.contains("enabled")) {
      const categoryContent =selectBtn.innerText=== "게시판 선택" ? "오늘의 잡담" :  selectBtn.innerText;
      const post_txt = `${categoryContent},${postTitle.value},${postContent.value}`;
      if(uploadURL==""){
          imgUrl = ""
      }
      else {
          imgUrl = imgFile.join(",");
      }
      console.log(imgUrl);
      const PostData = {
          "post": {
              "content": post_txt,
              "image": imgUrl
          }
      }
      const token = window.localStorage.getItem('token');
      const requestInformation = {
          method:"PUT",
          headers:{
              "Authorization" : `Bearer ${token}`,
              "Content-type" : "application/json"
          },
          body:JSON.stringify(PostData)
      }
      const res = await fetch(url+`/post/${postId}`,requestInformation)
                          .then((response)=> { return response;})
                          .catch((error)=> { console.log('이미지 불러올 때 에러가 발생했습니다.',error);})
      const json = await res.json()
      console.log('post 전송',json);
      window.localStorage.setItem('post_id',postId);
      const accountName = json.post.author.accountname;
      location.href=`/pages/profile.html?accountname=${accountName}`
  }
  else {
      alert("제목을 입력해주세요.");
      return 0;
  }
}

uploadBtn.addEventListener('click',postUpdate);




