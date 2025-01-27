// Assuming api.js exports these functions
// import { getUser, createUser, updateUser, createProduct } from './src/api.js';


document.addEventListener("submit", function (event) {
  event.preventDefault();
  let updatePW = document.getElementById("update-password-form");
  let addPD = document.getElementById("add-product-form");

  // let targetName = event.target.getAttribute("name");
  // console.log("check targetName2: "+targetName)
  // if (targetName == "updatePasswordForm") {
  //   // updatePassword();
  //   updatePW.reset();
  // } else if ((targetName = "addProductForm")) {
  //   // let addresp = addProduct();
  //   // console.log("check addresp: " + addresp);
  //   addPD.reset();
  // }
});

async function updatePassword() {
  let oldPassword = document.getElementById("old-password").value;
  let newPassword = document.getElementById("new-password").value;
  let confirmNewPassword = document.getElementById("confirm-new-password").value;
  let user = getLoginUser();
  if (undefined == user) {
    alert("You have not login!!");
    return;
  }

  let id = user["_id"];

  let userDetail = await getUser(id);

  if (userDetail.password !== oldPassword) {
    alert("password authentication fail!! ");
    return;
  }

  if (newPassword !== confirmNewPassword) {
    alert("Confirm new password do not match!!");
    return;
  }

  userDetail.password = newPassword;

  let resp = await updateUser(id, userDetail);

  oldPassword = "";
  newPassword = "";
  confirmNewPassword = "";
  alert("Password updated successfully!");
}

function getLoginUser() {
  const loginCookie = "userDetail";
  let userCookie = getCookie(loginCookie);
  if (!userCookie){
    return null;
  }

  let user = JSON.parse(userCookie);
  return user;
}

class Product {
  constructor(name, spec, price, category, image, imgLink, customerId, likes) {
    this.name = name;
    this.spec = spec;
    this.price = price;
    this.category = category;
    this.image = image;
    this.imgLink = imgLink;
    this.customerId = customerId;
    this.likes = likes;
    this.createTime = new Date().getTime()
  }
}

async function addProduct() {
  let user = getLoginUser();
  if(undefined == user){
    alert("You have not login!!");
    return;
  }

  let name = document.getElementById("product-name");
  let spec = document.getElementById("product-spec");
  let price = document.getElementById("product-price");
  let category = document.getElementById("product-category");
  let imageLink = document.getElementById("product-image");

  let productDetail = new Product(
    name.value,
    spec.value,
    price.value,
    category.value,
    user["_id"],
    imageLink.value,
    "",
    []
  );

  // console.log("check productDetail: " + JSON.stringify(productDetail));
  if (productDetail) {
    let resp = await createJson(productBase, productDetail);
    addLocalStorageProduct(productDetail);
    productDetail = undefined;
    // console.log("check resp: " + resp);
  }

  let addPD = document.getElementById("add-product-form");

  name.value = "";
  spec.value = "";
  price.value = "";
  category.value = "";
  imageLink.value = "";
  
  alert("Photo added successful!!");
}

async function addLocalStorageProduct(product) {
  let productsKey = "products-local-storage";

  let products = JSON.parse(localStorage.getItem(productsKey));
  products.unshift(product);

  localStorage.setItem(productsKey, JSON.stringify(products));
}
