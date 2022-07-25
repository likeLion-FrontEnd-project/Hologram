// 좋아요 
async function likePost () {
    const likePath = `/post/${postId}/heart`;
    const reqInfo = {
      method : 'POST',
      headers : {
        Authorization : `Bearer ${token}`,
        'Content-type' : 'application/json',
      },
    }
    const res = await fetch(url + likePath, reqInfo)
                      .then((response) => {
                        return response;
                      })
    const json = await res.json();
    console.log(json);
  }
  
  likePost();

  async function cancelLikePost () {
    const likeCancelPath = `/post/${postId}/unheart`;
    const reqInfo = {
      method : 'DELETE',
      headers : {
        Authorization : `Bearer ${token}`,
        'Content-type' : 'application/json',
      },
    }
    const res = await fetch(url + likeCancelPath, reqInfo)
                      .then((response) => {
                        return response;
                      })
    const json = await res.json();
    console.log(json);
  }
    cancelLikePost();

    async function handleLikeBtn () {
      let data = {};
      if(json.posts.hearted === false) {
        likeBtn.classList.remove('clicked');
        data = await cancelLikePost();
        likeNum.textContent = POSTS.heartCount;
        return;
      } else if (POSTS.hearted === true) {
        likeBtn.classList.add('clicked');
        data = await likePost();
        likeNum.textContent = POSTS.heartCount;
        return
      }
    }
    handleLikeBtn();