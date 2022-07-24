const productSection = document.querySelector('.product-section');
const productList = document.querySelector('.product-list');
const productDetail = document.querySelector('#product-detail');

function setUserProduct(userProduct) {
  if (userProduct.length < 1) {
    productSection.style.display = 'none';
  } else {
    userProduct.forEach((i) => {
      const productId = i.id;

      const productItem = document.createElement('li');
      productItem.setAttribute('class', 'product-item');

      const productImg = document.createElement('img');
      productImg.setAttribute('class', 'product-img');
      productImg.setAttribute('src', i.itemImage);
      
      const productTitle = document.createElement('strong');
      productTitle.setAttribute('class', 'product-title');
      productTitle.innerText = i.itemName;
      
      const productPrice = document.createElement('span');
      productPrice.setAttribute('class', 'product-price');
      productPrice.innerText = (i.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      
      // li > img+strong+span
      productItem.appendChild(productImg);
      productItem.appendChild(productTitle);
      productItem.appendChild(productPrice);
      // ul > li
      productList.appendChild(productItem);

      // 하단 모달
      productItem.addEventListener('click', () => {
        if (i.author.accountname == localStorage.getItem('accountname')) {
          document.querySelector('#myProduct-bottom-modal').classList.remove("hidden");
          
          // 수정을 눌렀을 떄
          document.querySelector('#product-modify-btn').addEventListener('click', () => {
            location.href = `../pages/editProduct.html?productId=${productId}`;
          })
          // 최종 삭제 모달 
          document.querySelector('#myProduct-small-delete-btn').addEventListener('click', () => {
            deleteProduct(productId);
          })
        } else {
          console.log('이건 다른 사람상품인데여');
          productDetail.classList.remove("hidden");
          
          document.querySelector('#product-detail .product-img').src = i.itemImage
          document.querySelector('#product-detail .product-title').innerText = i.itemName;
          document.querySelector('#product-detail .product-price').innerText = i.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

          document.querySelector('#product-detail .modal-bg').addEventListener('click', () => {
            productDetail.classList.add("hidden");
          });
          document.querySelector('#product-detail .cancel-btn').addEventListener('click', () => {
            productDetail.classList.add("hidden");
          })
          
        }


      })
    })
  }
}

// 모달 배경선택
document.querySelector('#myProduct-bottom-modal .modal-bg').addEventListener('click', () => {
  document.querySelector('#myProduct-bottom-modal').classList.add("hidden");
});
// 하단 모달 삭제 눌렀을 때
document.querySelector('#product-delete-btn').addEventListener('click', () => {
  document.querySelector("#myProduct-bottom-modal").classList.add("hidden");
  document.querySelector('#myProduct-small').classList.remove('hidden');
})
// 중앙 모달 배경
document.querySelector('#myProduct-small .modal-bg').addEventListener('click', () => {
  document.querySelector('#myProduct-small').classList.add("hidden");
});
document.querySelector('#myProduct-small-cancel-btn').addEventListener('click', () => {
  document.querySelector('#myProduct-small').classList.add("hidden");
})


//상품 삭제
async function deleteProduct(productId) {
  try {
    const resDelProductData = await fetch(`${url}/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(),
    });
    const resDelProductJson = await resDelProductData.json();
    location.href = `../pages/profile.html`;
  } catch (err) {
    console.error(err);
    location.href = '../pages/page404.html';
  }
}