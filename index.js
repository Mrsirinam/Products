import { createPtoductCard, collectForm, addProduct } from "./js/function.js";

//получаем товары
const data = localStorage.getItem("band-fruits"); //строка с данными или null / Вывели date в отдельную переменную для удобства
// const goods = (data && data[0] === "[" && data[1] === "{")
// ? JSON.parce(data)
//: []; - тоже самое, что ниже

let goods = data?.[0] === "[" && data?.[1] === "{" ? JSON.parse(data) : [];

//создаем продукт
const pr = {
  name: "Огурец",
  price: 67,
  cnt: 100,
};

const goodsEl = document.querySelector(".goods");
const addForm = document.forms.add;

//проверяем есть ли товары. Если есть в LS то отобразить, если нет то добавить огурец (он как заглушка)
// Есть товары в LS ? Если есть отобразить, если нет - добавить огурец и отобразить

if (!goods.length) {
  pr.id = 1;
  goods.push(pr);
  localStorage.setItem("band-fruits", JSON.stringify(goods));
}
// для каждого товара создаем карточку
goods.forEach((el) => createPtoductCard(el, goodsEl));

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const body = collectForm(addForm);
  goods = addProduct(body, goodsEl, goods);
  addForm.reset(); //очистить форму после того, как товар боавился
});
