const productImg = document.querySelector('#product-img');
let filename = '';
const productName = document.querySelector('#product-name-input');
const productPrice = document.querySelector('#price-input');
const errorMsg = document.querySelector('.error-msg');
const saveBtn = document.querySelector('.nav-btn.save');

productName.addEventListener('input', checkName);
productPrice.addEventListener('input', checkPrice);
saveBtn.addEventListener('click', editProduct);

// 상품 데이터 받아오기
const productId = location.search.replace("?", "").split("=")[1];
getProductData(productId);

async function getProductData(productId) {
  const token = localStorage.getItem('token');
  try {
    const resRegistProduct = await fetch(`${url}/product/detail/${productId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      }
    });
    const resRegitProductJson = await resRegistProduct.json();
    const productData = resRegitProductJson.product;
    setProduct(productData);
  } catch (err) {
    console.log(err);
  }
}

function setProduct(productData) {
  productImg.src = productData.itemImage;
  filename = productData.itemImage;
  productName.value = productData.itemName;
  productPrice.value = 
    productData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (productImg.src) {
    productImg.style.display = 'block';
  }
}

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
    return `${url}/${resJson.filename}`;
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
    (productName.value.length < 16 && productName.value.length > 1)  &&
    (filename || productName.value.length || productPrice.value.length)
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

async function editProduct() {
  const token = localStorage.getItem('token');
  const numPrice = parseInt(productPrice.value.replaceAll(',', ''));

  try {
    const resRegistProduct = await fetch(`${url}/product/${productId}`, {
      method: 'PUT',
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
    if (resRegitProductJson.type === 'entity.too.large') {
      alert('이미지의 용량이 너무 큽니다. 이미지를 변경해주세요.');
    } else {
      location.href = './profile.html';
    }
  } catch (err) {
    console.log(err);
  }
}

