/*
TODO
  1. apis()로 작업해보기
  2. 객체 잘 활용하기 중요!
  3. 관심사의 분리가 약함
    - Render는 Render만 해야함
*/

const productList = {};
const categoryList = {};
const content = document.getElementById("content");
const categoryArea = document.getElementById("categoryArea");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const paginationList = document.getElementById("paginationList");

const apis = () => {
  const baseURL = "https://fakestoreapi.com";
  return {
    get: async (url) => {
      const res = await fetch(`${baseURL}/${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    },
  };
};

apis()
  .get("products")
  .then((data) => {
    productList.items = data;
    productRender();
    pagination();
  });

apis()
  .get("products/categories")
  .then((data) => {
    categoryList.items = data;
    categoryRender();
    pagination();
  });

const productRender = () => {
  content.innerHTML = null;
  productList.items.forEach((items) => {
    const divEl = document.createElement("div");
    divEl.innerHTML = `
    <div class="contentBox" id="contentBox">
            <img id="contentImg" src="${items.image}"></img>
            <div>${items.title}</div>
            <div>${items.price}</div>
    <div class="contentBox">`;
    content.appendChild(divEl);
  });
};

const categoryRender = () => {
  let categoryHTML = "";
  categoryList.items.forEach((items, idx) => {
    categoryHTML += `<div id=${idx} class="category">${items}</div>`;
  });
  categoryArea.innerHTML = categoryHTML;
  const categories = document.querySelectorAll(".category");
  categories.forEach((c) => {
    c.addEventListener("click", onCategoryMoveEvent);
  });
};

async function onCategoryMoveEvent(e) {
  const { innerText } = e.target;
  const data = await apis().get(`products/category/${innerText}`);
  productList.items = data;
  productRender();
}

const searchRender = () => {
  console.log(productList.items);
  productList.items.find((item) => {
    item.title.includes("F");
  });
};

searchInput.addEventListener("click", () => (searchInput.value = ""));
searchBtn.addEventListener("click", (keyword) => {
  const searchValue = searchInput.value;
  keyword = searchValue;
});

function pagination() {
  const pageGroup = Math.ceil(page / 3 + 1) - 1;
  const lastPage = pageGroup * 3;
  const firstPage = lastPage - 2;
  let paginationHTML = ``;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
        <li class="page-item"><a class="page-link" href="#">${i}</a></li>
    `;
  }
  paginationList.innerHTML = paginationHTML;
}
