document.addEventListener("DOMContentLoaded", function () {
  avatarDisplay();
});

document.addEventListener("submit", function (event) {
  event.preventDefault();

  let submitLogout = document.getElementById("submit-logout");
  let submitRegister = document.getElementById("submit-register");
  let submitLogin = document.getElementById("submit-login");
  let targetName = event.target.getAttribute("name");

  const user = "userDetail";
  if (targetName == "logoutForm") {
    // console.log("logoutForm");
    submitLogout.addEventListener("click", logout());
    avatarDisplay();
  } else if (targetName == "registerForm") {
    // console.log("registerForm, targetName: " + targetName);
    submitRegister.addEventListener("click", create());
    avatarDisplay();
  } else if (targetName == "loginForm") {
    // console.log("loginForm");
    submitLogin.addEventListener(
      "click",
      login().then((respList) => {
        if (respList) {
          let userJson = respList[0];
          // console.log("check id: " + respList[0]["_id"]);
          if (undefined != userJson) {
            delete userJson.password;
            delete userJson.email;
            let st = JSON.stringify(userJson);

            // console.log("check login obj:" + st);
            setCookie(user, st, 10);
            avatarDisplay();
            alert("Login successful!!");
          }else{
            alert("Username not exist!!");
          }
        } else {
          alert("Username not exist!!");
        }
      })
    );
  }

  for (let frm of document.getElementsByClassName("modal-content")) {
    frm.reset();
  }

  closeLoginPop();
});

function diplayPage(form, show = "none") {
  // console.log("diplayPage");
  let registerForm = document.getElementsByClassName("register-form")[0];
  let loginForm = document.getElementsByClassName("login-form")[0];
  let logoutForm = document.getElementsByClassName("logout-form")[0];

  if (form === "login") {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    logoutForm.style.display = "none";
    document.getElementsByClassName("modal")[0].style.display = show;
  } else if (form === "logout") {
    registerForm.style.display = "none";
    loginForm.style.display = "none";
    logoutForm.style.display = "block";
    let userCookie = getCookie("userDetail");
    let user = JSON.parse(userCookie);
    logoutForm.getElementsByTagName("b")[0].innerHTML = `Do you want to log out, ${user.userName}?`;
    document.getElementsByClassName("modal")[0].style.display = show;
  } else if (form === "create") {
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    logoutForm.style.display = "none";
    document.getElementsByClassName("modal")[0].style.display = show;
  } else {
    registerForm.style.display = "none";
    loginForm.style.display = "none";
    logoutForm.style.display = "none";
    document.getElementsByClassName("modal")[0].style.display = show;
  }
}

function avatarDisplay() {
  // console.log("avatarDisplay");
  const user = "userDetail";
  let cookieObj = getCookie(user);
  let avatarA = document.getElementById("div-id-avatar-a-img");
  let avatarImg = document.getElementById("div-id-avatar-img");
  let loginButton = document.getElementById("div-id-avatar-a");
  let titleAvatar = document.getElementsByClassName("title-avatar")[0];

  if (cookieObj) {
    // console.log("check avatarDisplay has cookie: " + cookieObj);
    let avatarObj = JSON.parse(cookieObj);
    // console.log("check avatar: " + avatarObj.avatar);
    avatarImg.src = avatarObj.avatar;
    // avatarLogin.getElementsByTagName("img")[0].src = avatarObj.avatar;

    avatarA.style.display = "block";
    avatarImg.style.display = "block";

    loginButton.style.display = "none";

    diplayPage("logout");

    return true;
  } else {
    // console.log("check avatarDisplay not cookie: " + cookieObj);
    loginButton.style.display = "block";

    avatarA.style.display = "none";
    avatarImg.style.display = "none";

    diplayPage("login");
    return false;
  }
}

// password encryption
function hashPassword(password) {
  // console.log("hashPassword");
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

function closeLoginPop() {
  // console.log("closeLoginPop");
  diplayPage();
}

function UserObject(userName, email, password, avatar, productIds, createTime) {
  // console.log("UserObject");
  this.userName = userName;
  this.email = email;
  this.password = password;
  this.avatar = avatar;
  this.productIds = productIds;
  this.createTime = createTime;
}

function create() {
  // console.log("create");
  if (
    document.getElementById("register-password").value !==
    document.getElementById("register-confirm").value
  ) {
    alert("Passwords do not match!!");
    return;
  }

  let userName = document.getElementById("register-username").value;
  let email = document.getElementById("register-email").value;
  let password = hashPassword(
    document.getElementById("register-password").value
  );
  let createTime = Date.now().toString();

  let avatarName = userName.replace(" ", "+");
  let avatar = `https://ui-avatars.com/api/?name=${avatarName}&background=ffffff&color=ff0000`;
  let user = new UserObject(userName, email, password, avatar, [], createTime);
  // console.log("check: " + user);
  if (user.email !== "") {
    createJson("customer", user);
  }
}

function login() {
  // console.log("login");
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  let respList = getJson(
    customerBase,
    null,
    `?q={"$and": [{"email":"${email}"}, {"password":"${hashPassword(
      password
    )}"}]}`
  );

  return respList;
}

function logout() {
  // console.log("logout");
  const user = "userDetail";
  delCookie(user);
}
