// создаем товар
const createPtoductCard = (obj, parentTag) => {
  const productCard = document.createElement("div");
  //задаем класс
  productCard.className = "product";
  const del = document.createElement("button");
  del.innerHTML = "Удалить";
  del.addEventListener("click", () => {
    delProduct(obj.id);
  });
  const upd = document.createElement("button");
  upd.innerHTML = "Изменить";
  upd.addEventListener("click", () => {
    productCard.classList.add("active");
  });
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.innerHTML = "Отмена";
  cancel.addEventListener("click", () => {
    productCard.classList.remove("active");
  });

  // задаем теги
  productCard.innerHTML = `
		<div class="row">
			<span>${obj.name}</span>
			<span>${obj.price}</span>
			<span>${obj.cnt}</span>
		</div>
		<form class="form">
			<input type="text" name="name" required value="${obj.name}">
			<input type="number" name="price" value="${obj.price}">
			<input type="number" min="1" max="1000" value="${obj.cnt}" name="cnt">
			<button type="submit">Добавить на склад</button>
		</form>
		<span data-id=${obj.id}>
		</span>
		`;
  parentTag.append(productCard);
  // После того, как карточка уже находится в DOM, получить ее последнего ребёнка и добавить туда кнопочку
  productCard.lastElementChild.append(upd);
  productCard.lastElementChild.append(del);
  let form = productCard.querySelector("form");
  form.append(cancel);

  // при нажатии на отправку формы мы вызываем функцию collectForm , получаем новый объект для этого же id, заменяем объект в LS и перезагружаем страницу
};
//собираем данные формы
const collectForm = (form) => {
  const body = {};
  const inputs = Array.from(form.elements); // делает из htmlFormCollection массив
  inputs.forEach((el) => {
    if (el.name) {
      body[el.name] = el.type === "number" ? +el.value : el.value;
    }
  });
  return body;
};

// сохранить товар в LS и отобразить товар на странице
// obj - новый продукт
// tag - родительсикй тег
// data - массив с товарами
// sName - имя LS если работаем с несколькими

const addProduct = (obj, tag, data, sName = "band-fruits") => {
  console.log(data);
  data.sort((b, a) => {
    // a - текущий элемент массива
    // b - следующий элемент массив
    return b.id - a.id;
  });
  console.log(data[data.length - 1]);
  // получить id последнего элемента
  obj.id = data[data.length - 1].id + 1;
  data.push(obj);
  localStorage.setItem(sName, JSON.stringify(data));
  createProductCard(obj, tag);
  return data;
};

const delProduct = (id) => {
  console.log(id);
  let data = JSON.parse(localStorage.getItem("band-fruits"));
  data = data.filter((el) => el.id !== id);
  localStorage.setItem("band-fruits", JSON.stringify(data));
  // перезагрузить страницу - самый плохой код в этом проекте =(
  location.reload();
};

export { createPtoductCard, collectForm, addProduct };
