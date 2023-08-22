"use strict";
//thau tom components/buttons
const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
// lay du lieu tu local
const KEY = "USER_ARRAY";
const CURRENT_USER = "CURRENT_USER";
let userArr = JSON.parse(getFromStorage(KEY));
let currentUser = JSON.parse(getFromStorage(CURRENT_USER));
let userTodoList = JSON.parse(getFromStorage("USERTASKS"));
let checkLogIn = false;
if (userArr === null) userArr = [];
if (userTodoList === null) userTodoList = [];
//kiem tra user hien tai co null
if (currentUser === null) checkLogIn = false;
else checkLogIn = true;
//xoa bang lan dau
todoList.innerHTML = "";
/////////
////////Ham kiem tra user hien tai co task nao khong
const checkUserTasks = function () {
  for (let j = 0; j < userTodoList.length; j++) {
    if (userTodoList[j].owner == currentUser.username) {
      userTodoList[j].owner == currentUser.username;
      return j;
    }
  }
  return false;
};

//kiem tra xem user hien tai co task nao khong
let vt = checkUserTasks();
const renderList = function () {
  if (checkLogIn == true) {
    vt = checkUserTasks();
    if (checkLogIn != false) {
      if (vt !== false)
        // tao dong todo theo chuoi todo cua user
        for (let i = 0; i < userTodoList.length; i++) {
          if (userTodoList[i].owner == currentUser.username) {
            todoList.innerHTML += `<li class='${
              userTodoList[i].isDone ? "checked" : ""
            }'><span onclick="doneTask(${i})">  ${
              userTodoList[i].task
            }</span><span class="close"  onclick="delTask(${i})" style="z-index:999">×</span></li>`;
          }
        }
    }
  }
};
//xoa task tai vi tri:vt
const delTask = function (vt) {
  if (confirm("Are you sure?")) {
    console.log(vt);
    userTodoList.splice(vt, 1);
    saveToStorage("USERTASKS", JSON.stringify(userTodoList));
    todoList.innerHTML = "";
    renderList();
  }
};
//check task tai vi tri:vt
const doneTask = function (vt) {
  userTodoList[vt].isDone = !userTodoList[vt].isDone;
  saveToStorage("USERTASKS", JSON.stringify(userTodoList));
  todoList.innerHTML = "";
  renderList();
  // document.querySelector(`#todo-list li:nth-child(${i - vt + 1})`).classList.toggle("checked");
};
//them su kien nhap task moi
addBtn.addEventListener("click", function () {
  if (checkLogIn === true) {
    if (taskInput.value === "") alert("vui long nhap task moi");
    else {
      const newTask = new Task(taskInput.value, currentUser.username);
      userTodoList.push(newTask);
      // userArr.push(userData);
      saveToStorage("USERTASKS", JSON.stringify(userTodoList));
      todoList.innerHTML = "";
      renderList();
      taskInput.value === "";
    }
  }
});
//ve task list  lan dau
renderList();
