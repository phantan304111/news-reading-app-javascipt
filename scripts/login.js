"use strict";

///////////thau tom cac button/components
const userNameInput = document.getElementById("input-username");

const passWordInput = document.getElementById("input-password");
const submitBtn = document.getElementById("btn-submit");

////////////////// lay du lieu tu local storage
const KEY = "USER_ARRAY";
const CURRENT_USER = "CURRENT_USER";
let userArr = JSON.parse(getFromStorage(KEY));

/////////kiem tra nguoi dung hien tai
let checkLogIn = false;
let currentUser = JSON.parse(getFromStorage(CURRENT_USER));
if (userArr === null) userArr = [];
if (currentUser === null) checkLogIn = false;
else checkLogIn = true;

// click submit
submitBtn.addEventListener("click", function (e) {
  // kiem tra xem user co dung khong
  const vt = checkUser(userNameInput.value, passWordInput.value);
  //kiem tra xem input co rong khong
  if (userNameInput.value === "" || passWordInput.value === "") alert("Please fill all infos!");
  else if (vt === -1) alert("khong tim thay nguoi dung nay");
  else {
    //lay du lieu nguoi dung hien tai
    saveToStorage(CURRENT_USER, JSON.stringify(userArr[vt]));
    //chuyen den home page
    window.location.href = "../index.html";
  }
});

//ham kiem tra user
const checkUser = function (username, password) {
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].username == username && userArr[i].password == password) return i;
  }
  return -1;
};
