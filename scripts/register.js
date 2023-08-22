"use strict";
///// thau tom cac button/components
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");

const passWordInput = document.getElementById("input-password");
const passWordConfirmInput = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");
// //

//////////////////  tao cac du lieu tu local storage

const KEY = "USER_ARRAY";
let userArr = JSON.parse(getFromStorage(KEY));
//kiem tra du lieu co rong
if (userArr === null) userArr = [];

//////////////////
// Cac ham

// click submit
submitBtn.addEventListener("click", function (e) {
  // Khoi tao doi tuong can nhap

  let userData = new User(
    firstNameInput.value,
    lastNameInput.value,
    userNameInput.value,
    passWordInput.value
  ); // Check Validate
  if (
    firstNameInput.value === "" ||
    lastNameInput.value === "" ||
    userNameInput.value === "" ||
    passWordInput.value === "" ||
    passWordConfirmInput.value === ""
  )
    // kiem tra xem du lieu co dien day du/ username co trung/ password co trung/ do dai maut khau
    alert("Please fill all infos!");
  else if (!checkId(userNameInput.value)) alert("Da co nguoi dung nay!");
  else if (passWordInput.value !== passWordConfirmInput.value)
    alert("Password va Confirm password khong trung");
  else if (passWordInput.value.length < 9) alert("Mat khau phai co hon 8 ki tu");
  // Co the nhap doi tuong
  else {
    userArr.push(userData);
    // luu du lieu vao local storage

    saveToStorage(KEY, JSON.stringify(userArr));
    //chuyen den login
    window.location.href = "../pages/login.html";
  }
});

///kiem tra username co trung
const checkId = function (id) {
  if (userArr !== null) {
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].username === id) return false;
    }
  }
  return true;
};
