import {getAllProducts, likeProduct, unlikeProduct} from "./api.js";
import {getCookie} from './cookie.js';

let imgNum = 100;
let user = {
  userId: 1,
};
let productObj = {
  usersLike: [1, 2, 3, 4, 5],
};

function generateSize() {
  return parseInt((Math.floor(Math.random() * 4) + 1) * 100);
}

function getPicSumImage() {
  return `https://picsum.photos/${generateSize()}/${generateSize()}`;
  // return `https://picsum.photos/200/300`;
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
  }
}

async function checkUpdate() {
  let updateTimeKey = "products-load-time";
  let update = localStorage.getItem(updateTimeKey);
  if (undefined == update || undefined == update.updateTime || update.updateTime < new Date().getTime()) {
    let oneHour = 60 * 60 * 1000;
    let updateTimeObj = {
      updateTime: oneHour + new Date().getTime(),
    };
    localStorage.setItem(updateTimeKey, updateTimeObj);
    return true;
  }
  return false;
}

// async function getLocalStorageProduct() {
//   let productsKey = "products-local-storage";
//
//   let products = JSON.parse(localStorage.getItem(productsKey));
//   if (
//     undefined == products ||
//     products.length == 0 ||
//     checkUpdate()
//   ) {
//     products = await getJson(productBase,null,"?q={}&sort=createTime&dir=-1");
//     // products = products.reverse();
//     localStorage.setItem(productsKey, JSON.stringify(products));
//   }
//   return products;
// }

async function divPhoto(product, productId, photo, productName, likes) {
  product
      .getElementsByClassName("pro-image")[0]
      .getElementsByTagName("img")[0].src = photo;
  product
      .getElementsByClassName("pro-title")[0]
      .getElementsByTagName("h5")[0].innerHTML = productName;
  const productLikes = product
      .getElementsByClassName("btn-like")[0]
      .getElementsByTagName("h5")[0];
  productLikes.innerHTML = `${likes.length}`;

  let userDetail = await JSON.parse(getCookie("userDetail"));

  const likeButton = product.getElementsByClassName("btn-like")[0];
  likeButton.addEventListener('click', async () => {
    const userId = userDetail.id;
    const proId =  productId;
    const likesList = likes;
    likes = await addRemoveLikes(likesList, proId, userId)
    productLikes.innerHTML = likes.length;
  });


}

async function addRemoveLikes(likes, productId, userId) {

  const index = likes.indexOf(userId);

  if (index > -1) {
    await unlikeProduct(productId).then( async r => {
      if(r.status < 200 && r.status >=300){
        alert(r.message);
      }
      likes.splice(index, 1);
      console.log("check cut likes: "+likes + " cut id:"+ userId);
    });

  } else {
    await likeProduct(productId).then( async r => {
      if(r.status < 200 && r.status >=300){
        alert(r.message);
      }
      likes.push(userId);
      console.log("check add likes: "+likes + " add id:"+ userId);
    });
  }
  // console.log("check end likesStore: "+likes);
  return likes;
}


document.addEventListener("DOMContentLoaded", async function () {
  console.log("check addEventListener!")
  let productDivlist = document.getElementsByClassName("product");
  console.log("check load product!")

  const dataResult = await getAllProducts();
  const photoLength = dataResult.length;

  // let products = await getLocalStorageProduct();

  const imgDiv = document.getElementById("pro");
  duplicateDiv(imgDiv, photoLength-1);

  let i = 0;

  for (let product of productDivlist) {
    if (i < photoLength) {
      // console.log("check dataResult: "+JSON.stringify(dataResult[i]))
      await divPhoto(product, dataResult[i].productId, dataResult[i].photo, dataResult[i].productName, dataResult[i].userLikes);
    }
    // else {
    //   let url = getPicSumImage();
    //   product
    //       .getElementsByClassName("pro-image")[0]
    //       .getElementsByTagName("img")[0].src = url;
    //   product
    //       .getElementsByClassName("pro-title")[0]
    //       .getElementsByTagName("h5")[0].innerHTML = getPrdoctName(url);
    //   product
    //       .getElementsByClassName("btn-like")[0]
    //       .getElementsByTagName("h5")[0].innerHTML = "+" + (generateSize() / 10 + generateSize() / 100);
    // }
    i++;
  }
});

function likeBtn(likeList, userId) {
  let a = [];
  a.includes();

  if (likeList.includes(userId)) {
    likeList;
  }
  likeList.innerHTML = "";
  for (let userId of productObj.usersLike) {
    let tr = document.createElement("tr");
    let tdLike = document.createElement("td");
    tdLike.textContent = userId;
    tr.appendChild(tdLike);
    likeList.appendChild(tr);
  }
}

function duplicateDiv(imgDiv, imgNum) {
  for (let i = 0; i < imgNum; i++) {
    let clone = imgDiv.cloneNode(true); // "deep" clone
    clone.id = "pro" + i;
    // or clone.id = ""; if the divs don't need an ID
    imgDiv.parentNode.appendChild(clone);
  }
}

// function getPrdoctName(url) {
//   let code = url.split("/");
//   // console.log("check "+(`${(code[3]/100)}${(code[4]/100)}`));
//   let productCode = `${code[3] / 100}${code[4] / 100}`;
//   // console.log("check" + productCode);
//
//   switch (Number(productCode)) {
//     case 11:
//       return "ADIDAS";
//     case 12:
//       return "NIKE";
//     case 13:
//       return "PUMA";
//     case 14:
//       return "NEW BALANCE";
//     case 21:
//       return "GAP";
//     case 22:
//       return "CALVIN KLEIN";
//     case 23:
//       return "FILA";
//     case 24:
//       return "ELLESSE";
//     case 31:
//       return "COTTON";
//     case 32:
//       return "FILA";
//     case 33:
//       return "CHERRY";
//     case 34:
//       return "SKETCHES";
//     case 41:
//       return "UNDER ARMOUR";
//     case 42:
//       return "BATA";
//     case 43:
//       return "H&M";
//     case 44:
//       return "GAP";
//   }
// }
