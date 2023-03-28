let url;
const productList = [];
const content = document.getElementById("content");

const productAPI = async () => {
  url = new URL("https://fakestoreapi.com/products");
  const res = await fetch(url);
  const data = await res.json();
  productList.push(...data);
  productRender();
};
productAPI();

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

const apis = () => {
  baseURL = "https://fakestoreapi.com";
  return {};
};
