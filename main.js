/*
TO_DO
1. apis() 만들기
2. 객체 잘 활용하기
3. api와 render의 구분 (실행 순서 고민)
*/

const productList = [];
const categoryList = [];
const content = document.getElementById("content");
const categoryArea = document.getElementById("categoryArea");

const productAPI = async () => {
  const url = new URL("https://fakestoreapi.com/products");
  const res = await fetch(url);
  const data = await res.json();
  productList.push(...data);
  productRender();
};
productAPI();

const categoryAPI = async () => {
  const url = "https://fakestoreapi.com/products/categories";
  const res = await fetch(url);
  const categoryData = await res.json();
  categoryList.push(...categoryData);
  categoryRender();
};
categoryAPI();

const productRender = () => {
  productList.forEach((items) => {
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
  categoryHTML = "";
  categoryList.forEach((items, idx) => {
    categoryHTML += `<div id=${idx}>${items}</div>`;
  });
  categoryArea.innerHTML = categoryHTML;
};

categoryArea.addEventListener("click", (event) => {
  moveToCategory(event);
});

const moveToCategory = async (event) => {
  const categoryVal = event.target.textContent;
  const url = new URL(
    `https://fakestoreapi.com/products/category/${categoryVal}`
  );
  productAPI();
};

// const apis = () => {
//     baseURL = "https://fakestoreapi.com";
//     return {};
//   };
