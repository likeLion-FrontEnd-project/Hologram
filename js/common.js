const url="https://mandarin.api.weniv.co.kr";

/* 뒤로 가기 */
const backBtn = document.querySelector('.back-btn');
function goBack(){
  window.history.back();
}
backBtn.addEventListener('click', goBack);

// 팔로우 & 언팔로에 필요한 매개변수값들 넘겨주기
function followData(followList) {
  let btnFollow = document.querySelectorAll('.user-follow-btn');

  for (let i = 0; i < btnFollow.length; i++) {
    btnFollow[i].addEventListener('click', (e) => {
      let followUserData = followList[i];
      let followState = e.currentTarget.getAttribute('isfollow');
      let targetButton = e.currentTarget;
      checkFollow(followUserData, followState, targetButton);
    });
  }

  // 따로 isfollow값만 넘겨서 처리해줄수는없나?  
}


// 팔로우, 언팔로우 하기
async function checkFollow(followUserData, followState, targetButton) {
  let userAccountName = followUserData.accountname; 
  const token = localStorage.getItem('token');
  
  if (followState === 'true' || targetButton.classList.contains('cancel')) { // 언팔로우
    try {
      const resUnfollow = await fetch(`${url}/profile/${userAccountName}/unfollow`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });
      const resUnfollowJson = await resUnfollow.json();
      console.log('언팔로우중');
      // console.log(resUnfollowJson);
      targetButton.classList.remove('cancel');
      targetButton.textContent = '팔로우';
    } catch(err){
      console.error('err', err);
    }
  } else {  // 팔로우
    try { 
    const resFollow = await fetch(`${url}/profile/${userAccountName}/follow`, 
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
    const resFollowJson = await resFollow.json();
    console.log('널 팔로우했다');
    // console.log(resFollowJson);
    targetButton.classList.add('cancel');
    targetButton.textContent = '취소';
    } catch(err){
      console.error('err', err);
    }
  }
  // 만약 내 아이디라면 버튼을 안보여준다.
  
}
  
