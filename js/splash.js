// 1초 후 지정한 경로로 페이지 이동
window.setTimeout(() => {
  if (localStorage.getItem('token')) {
    location.href = '/pages/home.html';
  } else {
    location.href = '/pages/intro.html';
  }
}, 1000);
