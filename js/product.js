const productImg = document.querySelector('#product-img');
let filename = '';
const productName = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');

productName.addEventListener('input', checkName);
productPrice.addEventListener('input', checkPrice);

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

// 이름 유효성 검사
function checkName() {
  const errorMsg = document.querySelector(".error-msg");
  // 글자수에 맞는지 체크
  if (productName.value.length < 2 || productName.value.length > 16) {
    errorMsg.style.display = 'block';
    productName.classList.add("error");
    // form 제출안되게 하기 
  } else {
    errorMsg.style.display = 'none'
    productName.classList.remove("error");
  }
}

// 가격 - 숫자 입력, 콤마
function checkPrice (e) {
  let resultPrice = e.target.value.replace(/[^0-9]/g,'');
  e.target.value = resultPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}