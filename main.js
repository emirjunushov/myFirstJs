//!===============================================================================
let name = document.querySelector(".task-name");
let email = document.querySelector(".task-email");
let image = document.querySelector(".task-image");
let phone = document.querySelector(".task-phone");
let button = document.querySelector(".btnka");
let ulka = document.querySelector(".ulka");
//!===================================================слущатель для button
console.log(image.value);
button.addEventListener("click", () => {
  if (
    (!name.value.trim(),
    !email.value.trim(),
    !image.value.trim(),
    !phone.value.trim())
  ) {
    alert("заполните поле");
    return;
  }
  let obj = {
    name: name.value,
    email: email.value,
    image: image.value,
    phone: phone.value,
  };
  setobjToLocal(obj);
  crearElement();
  name.value = "";
  email.value = "";
  image.value = "";
  phone.value = "";
});
//!================================================local
function setobjToLocal(param) {
  if (!localStorage.getItem("tasks-data")) {
    localStorage.setItem("tasks-data", "[]");
  }
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  data.push(param);
  localStorage.setItem("tasks-data", JSON.stringify(data));
}
//!================================================creat
crearElement();

function crearElement(element) {
  if (!localStorage.getItem("tasks-data")) {
    localStorage.setItem("tasks-data", "[]");
  }
  let newData = JSON.parse(localStorage.getItem("tasks-data"));

  ulka.innerHTML = "";
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    li.style.listStyleType = "none";
    li.style.marginBottom = "30px";
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    btnEdit.classList.add("btnEdit");
    btnDelete.classList.add("btnDelete");

    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img style="border-radius: 100%; width:100px; height:100px;" src=${item.image} alt="img">
     <li style="color: white; list-style-type: none; margin-bottom:12px;">${item.name}</li>
    <li style="color: white; list-style-type: none; margin-bottom:12px;">${item.phone}</li>
   
    <li style="color: white; list-style-type: none; margin-bottom:12px;">${item.email}</li>
  
    `;
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";

    card.append(btnDelete);
    card.append(btnEdit);
    ulka.append(card);
    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
  });
}

// //!==========================================удаление
function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  data.splice(index, 1);
  localStorage.setItem("tasks-data", JSON.stringify(data));
  crearElement();
}

// //!==========================================modal
let mainModal = document.querySelector(".main-modal");
let inpEdit1 = document.querySelector(".inp-edit1");
let inpEdit2 = document.querySelector(".inp-edit2");
let inpEdit3 = document.querySelector(".inp-edit3");
let inpEdit4 = document.querySelector(".inp-edit4");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save1");

function editElement(index) {
  mainModal.style.display = "block";

  let data = JSON.parse(localStorage.getItem("tasks-data"));
  inpEdit1.value = data[index].name;
  inpEdit2.value = data[index].email;
  inpEdit3.value = data[index].image;
  inpEdit4.value = data[index].phone;
  inpEdit1.setAttribute("id", index);
  inpEdit2.setAttribute("id", index);
  inpEdit3.setAttribute("id", index);
  inpEdit4.setAttribute("id", index);
}

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});
//!========= слушатель событий  для сохранения элемента который был отредиктирован
btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("tasks-data"));

  let index = inpEdit1.id;

  if (!inpEdit1.value.trim()) {
    alert("заполните");
    return;
  }

  let editedTask = {
    name: inpEdit1.value,
    email: inpEdit2.value,
    image: inpEdit3.value,
    phone: inpEdit4.value,
  };
  data.splice(index, 1, editedTask);
  localStorage.setItem("tasks-data", JSON.stringify(data));
  mainModal.style.display = "none";
  crearElement();
});
