"use strict";
//bat cac DOM button, components
const loginBtns = document.querySelectorAll(".btn-block");
const loginText = document.getElementById("login-modal");

const logoutBtn = document.getElementById("btn-logout");
//Goi du lieu tu local storage
const KEY = "USER_ARRAY";
const CURRENT_USER = "CURRENT_USER";
let userArr = JSON.parse(getFromStorage(KEY));
/////////
let checkLogIn = false;
let currentUser = JSON.parse(getFromStorage(CURRENT_USER));
if (userArr === null) userArr = [];
//kiem tra nguoi dung hien tai
if (currentUser === null) checkLogIn = false;
else checkLogIn = true;


//homepage, hien logout neu nguoi dung da dang nhap, va login/regis neu nguoi dung chua dang nhap
if (checkLogIn) {
  loginText.textContent = `welcome back ${currentUser.firstname}`;
} else {
}

//su kien nut logout
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem(CURRENT_USER);
  window.location.href = "./pages/login.html";
});
