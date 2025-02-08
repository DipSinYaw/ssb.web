import { addProduct, updateUserById } from './api.js';
// import { getCookie } from "./cookie";

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

        console.log("check resizedImageData: "+JSON.stringify(resizedImageData))

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

// function getLoginUser() {
//   const loginCookie = "userDetail";
//   let userCookie = getCookie(loginCookie);
//   console.log("check userCookie: " + userCookie);
//   if (!userCookie) {
//     return null;
//   }
//
//   let user = JSON.parse(userCookie);
//   return user.userName;
// }

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
  }

  let addPD = document.getElementById("add-product-form");

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

window.addProductBtn = addProductBtn;
window.updatePassword = updatePassword;