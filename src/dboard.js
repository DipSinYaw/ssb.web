import { addProduct, updateUserById, getProductsByLike, getProductsByCreateDate } from './api.js';
import { divPhoto, duplicateDiv } from './product.js';

let resizedImageData = null;

document.getElementById('product-image').addEventListener('change', async function(event) {
  console.log("product-image on change!!!")
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      const imgElement = document.createElement('img');
      imgElement.src = e.target.result;
      imgElement.onload = async function() {
        const canvas = document.createElement('canvas');
        const rt = 1000 * 70 / imgElement.src.length;
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
        resizedImageData = canvas.toDataURL('image/jpeg', rt);

        const imgDisplayElement = document.getElementById('uploaded-image');
        imgDisplayElement.src = resizedImageData;
        imgDisplayElement.style.display = 'block';
        imgDisplayElement.style.width = "280px";
        imgDisplayElement.style.height = "420px";
        imgDisplayElement.style.objectFit = "cover";
      };
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please upload a valid image file.');
  }
});

export async function updatePassword() {
  let oldPassword = document.getElementById("old-password");
  let newPassword = document.getElementById("new-password");
  let confirmNewPassword = document.getElementById("confirm-new-password");

  if (newPassword.value !== confirmNewPassword.value) {
    alert("Confirm password does not match!!");
    return;
  }

  const obj = {password: newPassword.value};

  const response = await updateUserById(obj);

  if (response) {
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
  }
}

class Product {
  constructor(name, spec, price, category, image) {
    this.productName = name;
    this.spec = spec;
    this.price = price;
    this.category = category;
    this.photo = image;
  }
}

export async function addProductBtn() {

  let name = document.getElementById("product-name");
  let spec = document.getElementById("product-spec");
  let price = document.getElementById("product-price");
  let category = document.getElementById("product-category");

  let productDetail = new Product(
      name.value,
      spec.value,
      price.value,
      category.value,
      resizedImageData,
  );

  if (productDetail) {
    const response = await addProduct(productDetail);

    if(response){
      alert(`${productDetail.productName} added successful!!`);
    }
  }

  // let addPD = document.getElementById("add-product-form");

  name.value = "";
  spec.value = "";
  price.value = "";
  category.value = "";
  document.getElementById("product-image").value = "";
  document.getElementById("uploaded-image").style.display = 'none';

  alert("Photo added successfully!!");
}

async function addLocalStorageProduct(product) {
  let productsKey = "products-local-storage";

  let products = JSON.parse(localStorage.getItem(productsKey));
  products.unshift(product);

  localStorage.setItem(productsKey, JSON.stringify(products));
}

async function addGallery(endpoint) {
  // Remove existing gallery content
  const existingGallery = document.getElementById('pro-gallery');
  if (existingGallery) {
    existingGallery.remove();
  }

  // Fetch the products
  let dataResult;
  switch (endpoint) {
    case 'getProductsByLike':
      dataResult = await getProductsByLike();
      break;
    case 'getProductsByCreateDate':
      dataResult = await getProductsByCreateDate();
      break;
    default:
      dataResult = await getProductsByCreateDate();
      break;
  }
  const photoLength = dataResult.length;

  // Add the gallery HTML
  const galleryHTML = `
    <div class="container">
      <div class="pro-gallery" id="pro-gallery">
        <div id="pro" class="product">
          <div class="pro-image">
            <img src="" alt="product photo">
          </div>
          <div class="pro-icon">
            <div class="pro-title">
              <h5>Logo</h5>
            </div>
            <div class="pro-likes" >
                <a class="btn-like" href="#like" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" fill="currentColor"
                        class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                        <path
                            d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                    </svg>
                    <h5></h5>
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementsByClassName('pro-user-gallery')[0].insertAdjacentHTML('afterend', galleryHTML);

  // Duplicate the #pro div
  const imgDiv = document.getElementById("pro");
  duplicateDiv(imgDiv, photoLength - 1);

  // Populate each duplicated div with product data
  let productDivlist = document.getElementsByClassName("product");
  for (let i = 0; i < photoLength; i++) {
    let product = productDivlist[i];
    await divPhoto(product, dataResult[i].productId, dataResult[i].photo, dataResult[i].productName, dataResult[i].userLikes);
  }

  // Load the CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'css/product.css';
  document.head.appendChild(link);
}

document.getElementById('sort-by-like-btn').addEventListener('click', () => addGallery('getProductsByLike'));
document.getElementById('sort-by-date-btn').addEventListener('click', () => addGallery('getProductsByCreateDate'));



window.addProductBtn = addProductBtn;
window.updatePassword = updatePassword;