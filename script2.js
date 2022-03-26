(function () {
  function createAppTitle(title) {
    //создаем и возвращаем заголовок приложения
    let h1 = document.createElement("h1");
    h1.classList.add("h1");
    h1.textContent = title;
    console.log(title);
    return h1;
  }

  function createTodoItemForm() {
    //создаем и возвращаем форму для создания дела
    let form = document.createElement("form");
    let input = document.createElement("input");
    let divBtnAdd = document.createElement("div");
    let btnAdd = document.createElement("button");

    form.classList.add("input-group");

    form.classList.add("divEnter");
    // divTodo.append(form);

    input.classList.add("form-control");
    input.setAttribute("placeholder", "Enter a new note");
    form.append(input);

    divBtnAdd.classList.add("input-group-append");
    form.append(divBtnAdd);

    btnAdd.classList.add("btnAdd");
    btnAdd.classList.add("btn-primary");
    divBtnAdd.append(btnAdd);
    btnAdd.textContent = "ADD NOTE";

    return {
      form,
      input,
      btnAdd,
    };
  }

  function createTodoList() {
    //создаем и возвращаем список элементов
    let divList = document.createElement("div");
    let ul = document.createElement("ul");

    divList.classList.add("divList");
    // divTodo.append(divList);

    ul.classList.add("ul");
    // divList.appendChild(ul);

    return {
      divList,
      ul,
    };
  }

  function createTodoItems(cNotes, inputValue, container) {
    //создаем и возвращаем элемент списка
    countNotes = countNotes + 1;

    event.preventDefault();
    console.log("контейнер", container)
    let ul = container.querySelector(".ul");
    let li = document.createElement("li");
    li.setAttribute("id", `li`);
    li.classList.add(`divEnter${cNotes}`);
    ul.appendChild(li);
    li.addEventListener("click", (e) => {
      if (e.target.getAttribute("id") == "buttonDone") {
        e.target.closest("#divNote").classList.toggle("backColor");
      }
      if (e.target.getAttribute("id") == "buttonDelete") {
        if (confirmDel()) {
          countNotes -= 1;
          e.target.closest("#li").remove();
          console.log(countNotes);
          if (countNotes == 0) {
            document.querySelector("#btnDelAll").remove();
          }
        }
      }
    });

    let divNote = document.createElement("div");
    divNote.setAttribute("id", `divNote`);
    li.append(divNote);

    let p_note = document.createElement("p");
    p_note.setAttribute("id", `p_note`);
    p_note.classList.add(`${countNotes}_li`);
    p_note.classList.add(`p_note${countNotes}`);
    divNote.append(p_note);
    p_note.textContent = inputValue;

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

    // p_values.push(p_note.textContent);

    // console.log(p_values);
    console.log(countNotes);

    return {
      li,
      divNote,
      p_note,
      divButtons,
      buttonDone,
      buttonDelete,
    };
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
  function createDeleteAll(container, TodoList) {
    btnDelAll = document.createElement("button");
    //функция создания кнопки удаления всех записей

    btnDelAll.setAttribute("id", "btnDelAll");
    btnDelAll.textContent = "DELETE ALL";
    btnDelAll.classList.add("btnDelAll");
    btnDelAll.classList.add("btn-danger");
    if (container.querySelector("#btnDelAll") == null) {
      TodoList.divList.append(btnDelAll);
      btnDelAll.addEventListener("click", () => {
        if (confirmDelAll()) {
          for (let i = 0; i < countNotes; i++) {
            let liElem = document.getElementById("li");
            liElem.remove();
          }
          countNotes = 0;
          document.querySelector("#btnDelAll").remove();
        }
      });
    }
    return {
      btnDelAll,
    };
  }

  function createApp(titleName, contClass) {
    countNotes = 0;

    const container = document.querySelector(contClass);

    const h1 = createAppTitle(titleName);
    container.append(h1);

    const TodoItemForm = createTodoItemForm();
    container.append(TodoItemForm.form);

    const TodoList = createTodoList();
    container.append(TodoList.divList);
    TodoList.divList.append(TodoList.ul);

    const TodoItems = createTodoItems;

    const deleteAll = createDeleteAll;

    const delAll = createDeleteAll;

    TodoItemForm.form.addEventListener("submit", function (e) {
      event.preventDefault();
      createTodoItems(countNotes, TodoItemForm.input.value, container);
      TodoItemForm.input.value = "";
      deleteAll(container, TodoList);
      // TodoList.ul.append(TodoItems.li);
      // TodoItems.li.append(TodoItems.divNote);
      // TodoItems.divNote.append(TodoItems.p_note);
      // TodoItems.divNote.append(TodoItems.divButtons);
      // TodoItems.divButtons.append(TodoItems.buttonDone);
      // TodoItems.divButtons.append(TodoItems.buttonDelete);
    });
    // createTodoItems.li.addEventListener
  }

  // document.addEventListener("DOMContentLoaded", function () {
  //   // createApp(document.title, ".todo");
    
  // });

  window.createApp = createApp;
})();

// "use strict";
// let divTodo = document.querySelector(".todo");
// let nowDay, nowMonth, nowYear, nowDayOfWeek;
// let p_values = [];

// let btnDelAll = document.createElement("button");

// createAppTitle();
// createTodoItemForm();
// createTodoList();
// let countNotes = 0;

//

// divTodo.addEventListener("click", (event) => {
//   if (event.target.getAttribute("id") == "buttonDelete") {
//     // console.log(event.target);
//     // console.log(event.target.getAttribute('id'))
//     if (confirmDel()) {
//       countNotes -= 1;
//       event.target.closest("#li").remove();

//       let AllLi = ul.querySelectorAll("#p_note");
//       let i = 0;
//       p_values.splice(0, p_values.length);
//       for (let el of AllLi) {
//         //обновление массива массива значений после нажатия кнопки Delete
//         p_values.push(el.textContent);
//         console.log(el);
//       }
//       // console.log(p_values);

//       if (countNotes == 0) {
//         btnDelAll.remove();
//       }
//     }
//   }
//   if (event.target.className.indexOf("buttonDone") != -1) {
//     //пометка "выполнено" на записи
//     event.target.closest("#divNote").classList.toggle("backColor");
//   }
// });

// divList.addEventListener("click", (e) => {
//   // удаление всех записей из списка на странице, массива и localStorage
//   if (e.target.getAttribute("id") == "btnDelAll") {
//     if (confirmDelAll()) {
//       for (let i = 0; i < countNotes; i++) {
//         let liElem = document.getElementById("li");
//         liElem.remove();
//       }
//       countNotes = 0;
//       btnDelAll.remove();

//       p_values = [];
//     }
//   }
// });
