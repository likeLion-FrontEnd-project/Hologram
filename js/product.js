const productImg = document.querySelector('#product-img');
let filename = '';

// 이미지 업로드 시 미리보기
async function productImgShow(event) {
  let reader = new FileReader();
  reader.onload = (event) => {
    productImg.setAttribute('src', event.target.result);
    productImg.style.display = 'block';
  };
  reader.readAsDataURL(event.target.files[0]);
  // 파일명 filename에 저장
  filename = await productImgUpload(event.target);
  console.log(event.target.files[0]);
};

// 이미지 등록
async function productImgUpload(target) {
  const formData = new FormData();
  formData.append('image', target.files[0]);
  try {
    const res = await fetch(`${url}/image/uploadfile`, {
      method: 'POST',
      body: formData,
    });
    const resJson = await res.json();
    return resJson.filename;
  } catch (err) {
    console.error(err);
  }
};
