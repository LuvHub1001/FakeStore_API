let url;
let productList;
const content = document.getElementById("content");

const productAPI = async () => {
  url = new URL("https://fakestoreapi.com/products");
  const res = await fetch(url);
  const data = await res.json();
  productList = data;

  productRender();
};
productAPI();

const productRender = () => {
  let productHTML = "";
  productList.forEach((items) => {
    return (productHTML += `
    <div class="contentBox">
        <div class="contentCotainer">
            <img id="contentImg" src="${items.image}"></img>
            <div>${items.title}</div>
            <div>${items.price}</div>
        </div>
    <div class="contentBox">
    `);
  });
  content.innerHTML = productHTML;
};

productRender();
