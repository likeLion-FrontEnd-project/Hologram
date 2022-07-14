/* 뒤로 가기 */
const backBtn = document.querySelector('.back-btn');
function goBack(){
  window.history.back();
}
backBtn.addEventListener('click', goBack);

/* 게시글 - 리스트, 앨범 */
function postViewtoggle(){
  const listWrap = document.querySelector(".post-list-wrap")
  const albumWrap = document.querySelector(".post-album-div")

  if(this.id === 'post-album-btn'){
    addClass(albumBtn, listBtn);
    addClass(albumWrap, listWrap);
  } else {
    addClass(listBtn, albumBtn);
    addClass(listWrap, albumWrap);
  }
}
function addClass(addClass, removeClass){ 
  addClass.classList.add('on');
  removeClass.classList.remove('on');
}

const listBtn = document.querySelector("#post-list-btn");
const albumBtn = document.querySelector("#post-album-btn");
listBtn.addEventListener('click', postViewtoggle);
albumBtn.addEventListener('click', postViewtoggle);