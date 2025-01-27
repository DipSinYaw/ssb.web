import { loginUser, registerUser, fetchUserDetailsByToken } from './api.js';

document.addEventListener("DOMContentLoaded", function () {
  avatarDisplay();
});

document.addEventListener("submit", function (event) {
  event.preventDefault();

  const targetName = event.target.getAttribute("name");

  if (targetName === "logoutForm") {
    logout();
  } else if (targetName === "registerForm") {
    create();
  } else if (targetName === "loginForm") {
    login();
  }

  resetForms();
  closeLoginPop();
});

function displayPage(form, show = "none") {
  const registerForm = document.querySelector(".register-form");
  const loginForm = document.querySelector(".login-form");
  const logoutForm = document.querySelector(".logout-form");

  registerForm.style.display = form === "create" ? "block" : "none";
  loginForm.style.display = form === "login" ? "block" : "none";
  logoutForm.style.display = form === "logout" ? "block" : "none";

  if (form === "logout") {
    const user = JSON.parse(getCookie("userDetail"));
    logoutForm.querySelector("b").innerText = `Do you want to log out, ${user.userName}?`;
  }

  document.querySelector(".modal").style.display = show;
}

function avatarDisplay() {
  const authToken = getCookie("authToken");
  const avatarA = document.getElementById("div-id-avatar-a-img");
  const avatarImg = document.getElementById("div-id-avatar-img");
  const loginButton = document.getElementById("div-id-avatar-a");

  if (authToken) {
    const cookieObj = getCookie("userDetail");
    if (!cookieObj) {
      fetchUserDetailsByToken(authToken).then(userDetails => {
        if (userDetails) {
          setCookie("userDetail", JSON.stringify(userDetails), 10);
          updateAvatar(userDetails.avatar);
        }
      });
    } else {
      const avatarObj = JSON.parse(cookieObj);
      updateAvatar(avatarObj.avatar);
    }
  } else {
    loginButton.style.display = "block";
    avatarA.style.display = "none";
    avatarImg.style.display = "none";
    displayPage("login");
  }
}

function updateAvatar(avatarUrl) {
  const avatarA = document.getElementById("div-id-avatar-a-img");
  const avatarImg = document.getElementById("div-id-avatar-img");
  const loginButton = document.getElementById("div-id-avatar-a");

  avatarImg.src = avatarUrl;
  avatarA.style.display = "block";
  avatarImg.style.display = "block";
  loginButton.style.display = "none";
  displayPage("logout");
}

function hashPassword(password) {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

function closeLoginPop() {
  displayPage();
}

function UserObject(userName, email, password, avatar, productIds, createTime) {
  this.userName = userName;
  this.email = email;
  this.password = password;
  this.avatar = avatar;
  this.productIds = productIds;
  this.createTime = createTime;
}

async function create() {
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!!");
    return;
  }

  const userName = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const createTime = Date.now().toString();
  const avatarName = userName.replace(" ", "+");
  const avatar = `https://ui-avatars.com/api/?name=${avatarName}&background=ffffff&color=ff0000`;
  const user = new UserObject(userName, email, password, avatar, [], createTime);

  if (user.email !== "") {
    try {
      const response = await registerUser(user);
      console.log("User registered:", response);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user. Please try again.");
    }
  }
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const userData = { email, password };

  try {
    const response = await loginUser(userData);
    if (response) {
      const { user, token } = response;
      delete user.password;
      setCookie("userDetail", JSON.stringify(user), 10);
      setCookie("authToken", token, 10);
      avatarDisplay();
      alert("Login successful!!");
    } else {
      alert("Username not exist!!");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    alert("Error logging in user. Please try again.");
  }
}

function logout() {
  delCookie("userDetail");
  delCookie("authToken");
  avatarDisplay();
  alert("Logout successful!!");
}

function resetForms() {
  document.querySelectorAll(".modal-content").forEach(form => form.reset());
}