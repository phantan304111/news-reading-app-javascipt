"use strict";

const pagesizeInput = document.getElementById("input-page-size");

const categoryInput = document.getElementById("input-category");
const submitBtn = document.getElementById("btn-submit");
//////////////////
const KEY = "USER_ARRAY";
const CURRENT_USER = "CURRENT_USER";
let userArr = JSON.parse(getFromStorage(KEY));
/////////kiem tra nguoi dung co login
let checkLogIn = false;
let currentUser = JSON.parse(getFromStorage(CURRENT_USER));
//
if (userArr === null) userArr = [];
if (currentUser === null) checkLogIn = false;
else checkLogIn = true;
//////
const userArray = [];
const currentUserSetting = parseUser(currentUser);
for (let i = 0; i < userArr.length; i++) {
  userArray.push(parseUser(userArr[i]));
}
const vt = matchUser(currentUserSetting, userArray);

submitBtn.addEventListener("click", function () {
  if (checkLogIn == true) {
    if (pagesizeInput.value == "") alert("hay nhap vao so page");
    else {
      //save settings
      currentUserSetting.pagesetting = pagesizeInput.value;
      currentUserSetting.categorysetting = categoryInput.value;
      saveToStorage(CURRENT_USER, JSON.stringify(currentUserSetting));
      console.log(currentUserSetting);
      userArr[vt].pagesetting = pagesizeInput.value;
      userArr[vt].categorysetting = categoryInput.value;
      saveToStorage(KEY, JSON.stringify(userArr));
      console.log(userArray);
      pagesizeInput.value = "";
    }
  }
});
//tim vi tri user hien tai trong chuoi
function matchUser(user, arr) {
  for (let i = 0; i < arr.length; i++)
    if (arr[i].username == user.username) {
      return i;
    }
  return false;
}
