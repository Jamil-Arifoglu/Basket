let titles = document.querySelectorAll(".title");
document.addEventListener("DOMContentLoaded", function () {
  let basketStr = localStorage.getItem("basket");
  let basket = JSON.parse(basketStr);

  if (!basket || !basket.length) {
    localStorage.setItem("basket", JSON.stringify([]));
  } else {
    ShowProductCount(basket);
    ShowTotalPrice(basket);
  }
});

titles.forEach((title) => {
  title.setAttribute("data-title", title.innerText);
  if (title.innerText.length > 15) {
    title.innerText = title.innerText.substring(0, 15) + "...";
  }
});

let buttons = document.querySelectorAll(".shop");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      localStorage.setItem("basket", JSON.stringify([]));
      basket = JSON.parse(localStorage.getItem("basket"));
    }
    let product = GetProductDatas(this);
    let existedProduct = basket.find((pro) => {
      return pro.id == product.id;
    });
    if (!existedProduct) {
      basket.push(product);
    } else {
      existedProduct.count++;
    }
    ShowProductCount(basket);
    ShowTotalPrice(basket);
    Arrayappend();
    ShowTotallPrice(basket);
    let basketStr = JSON.stringify(basket);
    localStorage.setItem("basket", basketStr);
  });
});

function GetProductDatas(product) {
  let parent = product.parentElement.parentElement.parentElement;
  let id = parent.getAttribute("data-id");
  let price = parent.querySelector(".price").innerText;
  let title = parent.querySelector(".title").getAttribute("data-title");
  let desc = parent.querySelector("p").innerText;
  let src = parent.querySelector("img").src;

  let result = { id, price, title, desc, src, count: 1 };

  return result;
}

function ShowProductCount(basket) {
  let basketCount = document.querySelector(".basket-count");
  basketCount.innerText = basket.reduce((total, product) => {
    return (total += product.count);
  }, 0);
}

function ShowTotalPrice(basket) {
  let total = document.querySelector(".total-price");
  total.innerText = basket.reduce((total, product) => {
    return (total += parseInt(product.price * product.count));
  }, 0);
}
let men = document.querySelector(".menu");
let but = document.querySelector(".icon");
let ul = document.querySelector(".ule");
let divv = document.querySelector(".buton");
but.addEventListener("click", function () {
  men.classList.toggle("d-none");
  divv.classList.toggle("d-none");
});
function Arrayappend() {
  let basket = JSON.parse(localStorage.getItem("basket"));
  ul.innerHTML = "";
  basket.forEach((e) => {
    let Html = `
    <li class="liu">
            <img src="${e.src}" alt="">
            <div class="infor">
            <b>Quantity:</b><span>${e.count}</span>
                <h3>${e.title}</h3>
               
                <b>Price :</b><span>${e.price}</span>
            </div>

            
            <i class="fa-solid fa-trash  " id="clear"></i>
           </li>
           <hr> `;
    ul.innerHTML += Html;
   
  });
}
function ShowTotallPrice(basket) {
  let total = document.querySelector(".totall-price");
  total.innerText = basket.reduce((total, product) => {
    return (total += parseInt(product.price * product.count));
  }, 0);
}
 let clear = document.querySelector("#clear");
console.log(clear);
let li = document.querySelectorAll(".liu");
clear.addEventListener("click", function () {
  clear.parentElement.remove();
});
