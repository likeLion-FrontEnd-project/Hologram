const selectBtn    = document.querySelector('.select-btn');
const categoryList = document.querySelector('.modal');
const categoryListModal = document.querySelector(".category-list");
const postContent  = document.querySelector('.upload-txt');
const postTitle    = document.querySelector('.upload-tit')
const ImgList     = document.querySelector('.postimg-list');
const postImage = document.querySelector(".upload-img");
const uploadBtn = document.querySelector('.nav-btn');
const postImgList = document.querySelector('.postimg-list');
const dropboxCloseBtn = document.querySelector('.close');
let uploadURL=""
const imgFile=[];

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
    if(e.target.innerText !== "게시판 선택") {
      selectBtn.innerText = e.target.innerText;
      categoryList.classList.remove('show');  
    }
  }  
}

categoryListModal.addEventListener("click",handleSelectList);


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

// 게시물 업로드
async function postUpload() {
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
          method:"POST",
          headers:{
              "Authorization" : `Bearer ${token}`,
              "Content-type" : "application/json"
          },
          body:JSON.stringify(PostData)
      }
      const res = await fetch(url+"/post",requestInformation)
                          .then((response)=> { return response;})
                          .catch((error)=> { console.log('이미지 불러올 때 에러가 발생했습니다.',error);})
      const json = await res.json()
      console.log('post 전송',json);
      console.log('게시글 id',json.post.id);
      window.localStorage.setItem('post_id',json.post.id);
      const accountName = json.post.author.accountname;
      location.href=`/pages/profile.html?accountname=${accountName}`
  }
  else {
      alert("제목을 입력해주세요.");
      return 0;
  }
}

uploadBtn.addEventListener('click',postUpload);




