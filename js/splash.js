// 1초 후 지정한 경로로 페이지 이동

// 토큰 검증
async function checkToken() {
  const url = 'https://mandarin.api.weniv.co.kr';
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${url}/user/checktoken/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    window.setTimeout(() => {
      if (resJson.isValid) {
        location.href = '/pages/home.html';
      } else {
        location.href = '/pages/intro.html';
      }
    }, 1000);
  } catch (err) {
    console.error(err);
  }
}

checkToken();
