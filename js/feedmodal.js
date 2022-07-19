const modalCloseBar = document.querySelector('.modal-close-bar');
const modalReport = document.querySelector('#report');
const modalCenter = document.querySelector('.modal-window-center');
const modalCancelBtn = document.querySelector('#cancel-btn');
const modalReportBtn = document.querySelector('#report-btn');

// 중앙 모달창 열기
modalReport.addEventListener('click', () => {
  modalCenter.classList.remove('hidden');

// 중앙 모달창 닫기
  closeModalCenter();
})

// 하단 모달창 닫기
function closeModalBottom () {
    modalCloseBar.addEventListener('click', () => {
        modalBg.classList.add('hidden');
        modalBottom.classList.add('hidden');
    }) 
  }
closeModalBottom(); 

// 중앙 모달창 닫기
function closeModalCenter () {
modalCancelBtn.addEventListener('click', () => {
    modalCenter.classList.add('hidden');
    modalBg.classList.add('hidden');
    modalBottom.classList.add('hidden');
})
modalReportBtn.addEventListener('click', () => {
    modalCenter.classList.add('hidden');
    modalBg.classList.add('hidden');
    modalBottom.classList.add('hidden');
})
}