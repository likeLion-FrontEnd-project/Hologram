const productImg = document.querySelector('#product-img');
let filename = '';
const productName = document.querySelector('#product-name-input');
const productPrice = document.querySelector('#price-input');
const errorMsg = document.querySelector('.error-msg');
const saveBtn = document.querySelector('.nav-btn.save');

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
  checkInputState();
}

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
}

// 이름 유효성 검사
function checkName() {
  // 글자수에 맞는지 체크
  if (productName.value.length < 2 || productName.value.length > 16) {
    errorMsg.style.display = 'block';
    productName.classList.add('error');
    disabledBtn();
    checkInputState();
  } else {
    errorMsg.style.display = 'none';
    productName.classList.remove('error');
    activateBtn();
    checkInputState();
  }
}

// 가격 - 숫자 입력, 콤마
function checkPrice(e) {
  let resultPrice = e.target.value.replace(/[^0-9]/g, '');
  e.target.value = resultPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  checkInputState();
}

// input의 값의 유무와 에러메세지 유무에 따른 버튼 활성/비활성
function checkInputState() {
  if (
    productName.value &&
    errorMsg.style.display === 'none' &&
    productPrice.value &&
    filename
  ) {
    activateBtn();
  } else {
    disabledBtn();
  }
}

// 버튼 활성화
const activateBtn = () => {
  saveBtn.disabled = false;
  saveBtn.classList.add('enabled');
};

// 버튼 비활성화
const disabledBtn = () => {
  saveBtn.disabled = true;
  saveBtn.classList.remove('enabled');
};

// 상품 등록
async function registProduct() {
  const token = localStorage.getItem('token');
  const numPrice = parseInt(productPrice.value.replaceAll(',', ''));
  try {
    const resRegistProduct = await fetch(`${url}/product`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        product: {
          itemName: productName.value,
          price: numPrice,
          link: './404.html',
          itemImage: productImg.src,
        },
      }),
    });
    const resRegitProductJson = await resRegistProduct.json();
    console.log(resRegitProductJson);
    location.href = './profile.html';
  } catch (err) {
    console.log(err);
  }
}

saveBtn.addEventListener('click', registProduct);
