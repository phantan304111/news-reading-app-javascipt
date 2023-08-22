"use strict";
//test API
//https://newsapi.org/v2/top-headlines?country=us&pageSize=30&page=1&apiKey=e91f0750e7d541afbfdf62db1267ac31
//country = my(code = us), apikey =  key cua email, tra ve tat ca cac bai viet, tao thanh nhomb = 30 trang mot pages, trang hien tai = 1
//https://newsapi.org/v2/top-headlines?country=us&category=Science&pageSize=30&page=1&apiKey=e91f0750e7d541afbfdf62db1267ac31
//https://newsapi.org/v2/everything?q=bitcoin&apiKey=e91f0750e7d541afbfdf62db1267ac31
//https://newsapi.org/v2/top-headlines?country=us&category=Science&pageSize=30&page=1&apiKey=e91f0750e7d541afbfdf62db1267ac31

/////////bat cac component, input
const news = document.getElementById("news-container");
const pagePagination = document.querySelector(".pagination");
const preBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const submitBtn = document.getElementById("btn-submit");
const searchInput = document.getElementById("input-query");

///////// lay thong tin user tu local storeage
const KEY = "USER_ARRAY";
const CURRENT_USER = "CURRENT_USER";
let userArr = JSON.parse(getFromStorage(KEY));
///////// kiem tra nguoi dung hien tai
let checkLogIn = false;
let currentUser = JSON.parse(getFromStorage(CURRENT_USER));
if (userArr === null) userArr = [];
if (currentUser === null) checkLogIn = false;
else checkLogIn = true;
let searchlist = "";
//////

/////Thiet lap setting cua user
let currentPage = 1; //trang hien tai
let pageNumEnd = 5; //trang cuoi // tinh lai trong ham

let pageNumSetting = currentUser.pagesetting || 5; // so tin trong mot trang
/////Ham

/////Hien thong tin
const renderNews = async function (dataNews, currentP, pageSetting) {
  news.innerHTML = "";
  //let cal = (currentP - 1) * pageSetting;
  for (let i = 0; i < pageSetting; i++) {
    news.innerHTML += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src=${dataNews.articles[i].urlToImage}
          class="card-img"
          alt=${dataNews.articles[i].description}>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${dataNews.articles[i].title}</h5>
          <p class="card-text">${dataNews.articles[i].description}</p>
          <a href=${dataNews.articles[i].url}
            class="btn btn-primary">View</a>
        </div>
      </div>
    </div>
    </div>
    </div>`;
  }

  // throw err;
};
const renderPagination = async function () {
  pagePagination.innerHTML =
    currentPage === 1
      ? ""
      : `<li class="page-item">
    <button class="page-link" href="#" id="btn-prev" onclick="prevPage()">Previous</button>
   </li>`;
  for (let i = 1; i <= pageNumEnd; i++) {
    if (i !== currentPage) {
      pagePagination.innerHTML += ` <li class="page-item disabled">
<a class="page-link" id="page-num">${i}</a>
</li> `;
    } else {
      pagePagination.innerHTML += ` <li class="page-item active">
<a class="page-link" id="page-num">${i}</a>
</li> `;
    }
  }
  pagePagination.innerHTML +=
    currentPage === pageNumEnd
      ? ""
      : `<li class="page-item">
<button class="page-link" id="btn-next" onclick="nextPage()">Next</button>
</li>`;
};

const getNews = async function (search, pageNumSetting, currentPage) {
  //   // lay thong tin tu API
  try {
    const resNews = await fetch(
      // `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageNumSetting}&page=${currentPage}&apiKey=e91f0750e7d541afbfdf62db1267ac31`
      `https://newsapi.org/v2/top-headlines?q=${search}&pageSize=${pageNumSetting}&page=${currentPage}&apiKey=e91f0750e7d541afbfdf62db1267ac31`
    );
    if (!resNews.ok) throw new Error("Problem getting location data");

    const dataNews = await resNews.json();

    // tinh so luong page
    if (dataNews.totalResults % pageNumSetting != 0)
      pageNumEnd = Math.trunc(dataNews.totalResults / pageNumSetting) + 1;
    else pageNumEnd = dataNews.totalResults / pageNumSetting;
    //// ve lai trang
    renderNews(dataNews, currentPage, pageNumSetting);
    renderPagination();
  } catch (err) {
    renderError(`Something went wrong here`);
  }
};
///bat su kien nut search
submitBtn.addEventListener("click", function () {
  //kiem tra du lieu truyen vao
  if (searchInput.value == "") alert("vui long dien vao muc tim kiem");
  else {
    searchlist = searchInput.value;
    getNews(searchlist, pageNumSetting, currentPage);
  }
});
// trang ke
const nextPage = function () {
  if (currentPage < pageNumEnd) {
    currentPage++;
    getNews(searchlist, pageNumSetting, currentPage);
    console.log(pageNumSetting, currentPage);
  }
};
//trang cu
const prevPage = function () {
  if (currentPage > 1) {
    currentPage--;
    getNews(searchlist, pageNumSetting, currentPage);
  }
};
