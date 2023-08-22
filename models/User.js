"use strict";
class User {
  constructor(firstname, lastname, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
  }
}

class Task {
  constructor(task, owner) {
    this.task = task;
    this.owner = owner;
    this.isDone = false;
  }
}
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );
  return user;
}
