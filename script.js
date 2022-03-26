"use strict";
let divTodo = document.querySelector(".todo");
let nowDay, nowMonth, nowYear, nowDayOfWeek;
let p_values = [];

let divEnter = document.createElement("form");
let input = document.createElement("input");
let divBtnAdd = document.createElement("div");
let btnAdd = document.createElement("button");
let divList = document.createElement("div");
let ul = document.createElement("ul");

let btnDelAll = document.createElement("button");

function createAppTitle() {
  //создаем и возвращаем заголовок приложения
  let h1 = document.createElement("h1");
  h1.classList.add("h1");
  h1.textContent = "TODO-LIST";
  divTodo.append(h1);
}

function createTodoItemForm() {
  //создаем и возвращаем форму для создания дела
  // form = document.createElement("form");
  // form.classList.add("input-group");
  // divTodo.append(form);

  divEnter.classList.add("divEnter");
  divTodo.append(divEnter);

  input.classList.add("form-control");
  input.setAttribute("placeholder", "Enter a new note");
  divEnter.append(input);

  divBtnAdd.classList.add("input-group-append");
  divEnter.append(divBtnAdd);

  btnAdd.classList.add("btnAdd");
  btnAdd.classList.add("btn-primary");
  divBtnAdd.append(btnAdd);
  btnAdd.textContent = "ADD NOTE";
}

function createTodoList() {
  //создаем и возвращаем список элементов

  divList.classList.add("divList");
  divTodo.append(divList);

  ul.classList.add("ul");
  divList.appendChild(ul);
}

function createTodoItems() {
  //создаем и возвращаем элемент списка
  countNotes = countNotes + 1;

  event.preventDefault();

  let li = document.createElement("li");
  li.setAttribute("id", `li`);
  li.classList.add(`divEnter${countNotes}`);
  // ul = document.querySelector('.ul');
  ul.appendChild(li);

  let divNote = document.createElement("div");
  divNote.setAttribute("id", `divNote`);
  // divNote.classList.add(`divNote`);
  li.append(divNote);

  let p_note = document.createElement("p");
  p_note.setAttribute("id", `p_note`);
  p_note.classList.add(`${countNotes}_li`);
  p_note.classList.add(`p_note${countNotes}`);
  divNote.append(p_note);
  p_note.textContent = input.value;

  let divButtons = document.createElement("div");
  divButtons.setAttribute("id", `divButtons`);
  divButtons.classList.add(`divButtons${countNotes}`);
  divNote.append(divButtons);

  let buttonDone = document.createElement("button");
  buttonDone.setAttribute("id", `buttonDone`);
  buttonDone.classList.add(`buttonDone${countNotes}`);
  buttonDone.classList.add("btn-success");
  divButtons.append(buttonDone);
  buttonDone.textContent = "Done";

  let buttonDelete = document.createElement("button");
  buttonDelete.setAttribute("id", `buttonDelete`);
  buttonDelete.classList.add(`buttonDelete${countNotes}`);
  buttonDelete.classList.add("btn-danger");
  divButtons.append(buttonDelete);
  buttonDelete.textContent = "Delete";

  input.value = "";

  p_values.push(p_note.textContent);

  console.log(p_values);
}

function confirmDel() {
  // функция подтверждения удаления записи

  if (confirm("Вы действительно хотите удалить запись?")) {
    return true;
  } else {
    return false;
  }
}

function confirmDelAll() {
  // функция подтверждения удаления всех записей

  if (confirm("Вы действительно хотите удалить ВСЕ записи?")) {
    return true;
  } else {
    return false;
  }
}

function createDeleteAll() {
  //функция создания кнопки удаления всех записей
  if (divTodo.querySelector("#btnDelAll") == null) {
    btnDelAll.setAttribute("id", "btnDelAll");
    btnDelAll.textContent = "DELETE ALL";
    btnDelAll.classList.add("btnDelAll");
    btnDelAll.classList.add("btn-danger");

    divList.append(btnDelAll);
  }
}


createAppTitle();
createTodoItemForm();
createTodoList();
let countNotes = 0;

divEnter.addEventListener("submit", function (e) {
  //событие, добавляющее запись при нажатии на кнопку/enter

  e.preventDefault();
  if (input.value != "") {
    createDeleteAll();
    createTodoItems();
    console.log(countNotes);
  }
});

divTodo.addEventListener("click", (event) => {
  if (event.target.getAttribute("id") == "buttonDelete") {
    // console.log(event.target);
    // console.log(event.target.getAttribute('id'))
    if (confirmDel()) {
      countNotes -= 1;
      event.target.closest("#li").remove();

      let AllLi = ul.querySelectorAll("#p_note");
      let i = 0;
      p_values.splice(0, p_values.length);
      for (let el of AllLi) {
        //обновление массива массива значений после нажатия кнопки Delete
        p_values.push(el.textContent);
        console.log(el);
      }
      // console.log(p_values);

      if (countNotes == 0) {
        btnDelAll.remove();
      }
    }
  }
  if (event.target.className.indexOf("buttonDone") != -1) {
    //пометка "выполнено" на записи
    event.target.closest("#divNote").classList.toggle("backColor");
  }
});

divList.addEventListener("click", (e) => {
  // удаление всех записей из списка на странице, массива и localStorage
  if (e.target.getAttribute("id") == "btnDelAll") {
    if (confirmDelAll()) {
      for (let i = 0; i < countNotes; i++) {
        let liElem = document.getElementById("li");
        liElem.remove();
      }
      countNotes = 0;
      btnDelAll.remove();

      p_values = [];
    }
  }
});
