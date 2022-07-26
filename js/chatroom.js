/* 뒤로 가기 */
const backBtn = document.querySelector('.back-btn');
function goBack(){
  window.history.back();
}
backBtn.addEventListener('click', goBack);

const open = () => {
    document.querySelector(".modal").classList.remove("hidden");
}
const close = () => {
    document.querySelector(".modal").classList.add("hidden");  
}  

/* 헤더 메뉴 버튼 */
document.querySelector(".more-menu-btn").addEventListener("click", open);
document.querySelector(".modal-bg ").addEventListener("click", close); 
document.querySelector(".modal-close-bar").addEventListener("click", close); 
const back = document.querySelector('#back');

async function handleprofileSetBtn () {
  location.href='../pages/profile.html';
  close()
}

back.addEventListener('click', ()=>{
  close()
  //채팅방 모달이 보여진다. 
  document.querySelector(".chatroom-modal").classList.remove("hidden");  
});

/* 채팅방 모달 */
const chatroommodalBg = document.querySelector(".chatroommodal-bg");
// 채팅방모달 - 취소
const cancelBtn = document.querySelector('#cancel-btn');
// 채팅방모달 - 채팅방 이동
const backChatroomBtn = document.querySelector('#back-chatroom-btn');

// 로그아웃모달 배경 선택 시 모달 종료
chatroommodalBg.addEventListener('click', ()=>{
  document.querySelector(".chatroom-modal").classList.add("hidden");  
})
cancelBtn.addEventListener('click', ()=>{
  document.querySelector(".chatroom-modal").classList.add("hidden");  
})
backChatroomBtn.addEventListener('click', ()=>{
  location.href='../pages/chat.html';
})

// 채팅방 전송 버튼 on
const meassageInput = document.querySelector(".message-inp");
const messageBtn = document.querySelector(".send-btn span");
async function handleChangeBtnColor() {
  if(!(meassageInput.value =="")) {
    messageBtn.classList.add('show');
}
else {
  messageBtn.classList.remove('show');
}
}
meassageInput.addEventListener('keyup', handleChangeBtnColor)
