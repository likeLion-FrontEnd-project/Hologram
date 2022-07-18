const url="https://mandarin.api.weniv.co.kr";

/* 뒤로 가기 */
const backBtn = document.querySelector('.back-btn');
function goBack(){
  window.history.back();
}
backBtn.addEventListener('click', goBack);
