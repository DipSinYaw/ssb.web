import {getAllProducts, likeProduct, unlikeProduct} from "./api.js";
import {getCookie} from './cookie.js';

function generateSize() {
  return parseInt((Math.floor(Math.random() * 4) + 1) * 100);
}

function getPicSumImage() {
  return `https://picsum.photos/${generateSize()}/${generateSize()}`;
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

export async function divPhoto(product, productId, photo, productName, likes) {
  product
      .getElementsByClassName("pro-image")[0]
      .getElementsByTagName("img")[0].src = photo;
  product
      .getElementsByClassName("pro-title")[0]
      .getElementsByTagName("h5")[0].innerHTML = productName;

  const likeProductBtn = product
      .getElementsByClassName("btn-like")[0];
  const productLikes = likeProductBtn
      .getElementsByTagName("h5")[0];
  productLikes.innerHTML = `${likes.length}`;

  let userDetailId = await JSON.parse(getCookie("userDetail")).id;
  if(likes.indexOf(userDetailId)>=0){
    likeProductBtn.classList.add('like');
  }

  const likeButton = product.getElementsByClassName("btn-like")[0];
  likeButton.addEventListener('click', async () => {
    const userId = userDetailId;
    const proId =  productId;
    const likesList = likes;
    likes = await addRemoveLikes(likeProductBtn, likesList, proId, userId)
    productLikes.innerHTML = likes.length;
  });


}

async function addRemoveLikes(likeProductBtn, likes, productId, userId) {

  const index = likes.indexOf(userId);

  if (index >= 0) {
    await unlikeProduct(productId).then( async r => {
      if(r.status < 200 && r.status >=300){
        alert(r.message);
      }
      likes.splice(index, 1);
      likeProductBtn.classList.remove('like');
    });

  } else {
    await likeProduct(productId).then( async r => {
      if(r.status < 200 && r.status >=300){
        alert(r.message);
      }
      likes.push(userId);
      likeProductBtn.classList.add('like');
    });
  }
  return likes;
}


document.addEventListener("DOMContentLoaded", async function () {
  let productDivlist = document.getElementsByClassName("product");

  const dataResult = await getAllProducts();
  const photoLength = dataResult.length;

  const imgDiv = document.getElementById("pro");
  duplicateDiv(imgDiv, photoLength-1);

  let i = 0;

  for (let product of productDivlist) {
    if (i < photoLength) {
      // console.log("check dataResult: "+JSON.stringify(dataResult[i]))
      await divPhoto(product, dataResult[i].productId, dataResult[i].photo, dataResult[i].productName, dataResult[i].userLikes);
    }
    i++;
  }
});

export function duplicateDiv(imgDiv, imgNum) {
  for (let i = 0; i < imgNum; i++) {
    let clone = imgDiv.cloneNode(true); // "deep" clone
    clone.id = "pro" + i;
    imgDiv.parentNode.appendChild(clone);
  }
}
