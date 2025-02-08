import {loginUser, logoutUser, registerUser} from './api.js';
import {getCookie, setCookie, delCookie} from './cookie.js';

document.addEventListener("DOMContentLoaded", function () {
    avatarDisplay();

    document.getElementById("submit-login").addEventListener("click", async function (event) {
        event.preventDefault();
        await handleLogin();
    });
});

document.addEventListener("submit", function (event) {
    event.preventDefault();

    let targetName = event.target.getAttribute("name");

    if (targetName === "logoutForm") {
        logout();
        avatarDisplay();
    } else if (targetName === "registerForm") {
        create();
        avatarDisplay();
    } else if (targetName === "loginForm") {
        handleLogin();
    }

    for (let frm of document.getElementsByClassName("modal-content")) {
        frm.reset();
    }

    closeLoginPop();
});

async function handleLogin() {
    let userJson = await login();
    if (userJson) {
        let st = JSON.stringify(userJson.data);
        setCookie("userDetail", st, 10);
        avatarDisplay();
        alert("Login successful!!");
    } else {
        alert("Username not exist!!");
    }
}

function displayPage(form, show = "none") {
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
        logoutForm.getElementsByTagName("b")[0].innerHTML = `Do you want to log out, ${user.name}?`;
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
    const user = "userDetail";
    let cookieObj = getCookie(user);
    let avatarA = document.getElementById("div-id-avatar-a-img");
    let avatarImg = document.getElementById("div-id-avatar-img");
    let loginButton = document.getElementById("div-id-avatar-a");
    let titleAvatar = document.getElementsByClassName("title-avatar")[0];

    if (cookieObj) {
        let avatarObj = JSON.parse(cookieObj);
        avatarImg.src = avatarObj.avatar;
        avatarA.style.display = "block";
        avatarImg.style.display = "block";
        loginButton.style.display = "none";
        displayPage("logout");
        return true;
    } else {
        loginButton.style.display = "block";
        avatarA.style.display = "none";
        avatarImg.style.display = "none";
        displayPage("login");
        return false;
    }
}

// function hashPassword(password) {
//   return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
// }

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
    if (document.getElementById("register-password").value !== document.getElementById("register-confirm").value) {
        alert("Passwords do not match!!");
        return;
    }

    let userName = document.getElementById("register-username").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;
    let createTime = Date.now().toString();

    let avatarName = userName.replace(" ", "+");
    let avatar = `https://ui-avatars.com/api/?name=${avatarName}&background=ffffff&color=ff0000`;
    let user = new UserObject(userName, email, password, avatar, [], createTime);

    if (user.email !== "") {
        try {
            let res = await registerUser(user);
            alert("Register successful!!");
            console.log(res)
        } catch (e) {
            alert(e);
        }
    }
}

function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let respList = loginUser(
        {
            email: email,
            password: password,
        }
    );

    return respList;
}

async function logout() {
    const res = await logoutUser();
    console.log("check res: " + JSON.stringify(res));
}

window.displayPage = displayPage;
window.avatarDisplay = avatarDisplay;
window.closeLoginPop = closeLoginPop;
window.create = create;
