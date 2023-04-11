const formComment = document.forms.comments;

formComment.name.addEventListener("focus", () => {
  formComment.name.classList.remove("border-2", "border-red-500");
});
formComment.comment.addEventListener("focus", () => {
  formComment.comment.classList.remove("border-2", "border-red-500");
});

//Массив с коментами
const arrayComments = [
  {
    id: 1,
    name: "Silantiev Maxim",
    date: "10,3,2023, 11:34",
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque placeat corporis neque consectetur necessitatibus voluptate eveniet debitis reiciendis voluptatum! Quos possimus est dolorum architecto.",
  },
  {
    id: 2,
    name: "ElenaVi",
    date: "11,3,2023, 11:34",
    comment: "Itaque placeat corporis neque consectetur necessitatibus voluptate eveniet debitis reiciendis voluptatum! Quos possimus est dolorum architecto.",
  },
  {
    id: 3,
    name: "ZOOM",
    date: "8,3,2023, 12:34",
    comment: "Itaque placeat corporis neque consectetur necessitatibus voluptate eveniet debitis reiciendis voluptatum! Quos possimus est dolorum architecto.",
  },
];

// Получение данных из формы и добавление их в массив
formComment.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = formComment.name.value;
  const comment = formComment.comment.value;
  const date = dateConversion(formComment.date.value);

  if (toError(name, comment)) {
    return;
  }

  arrayComments.push({ id: arrayComments.length + 1, name, date, comment });
  generalComments(arrayComments[arrayComments.length - 1]);
});

//Обработка ошибок
const toError = (name, comment) => {
  const inputName = formComment.name;
  const inputComment = formComment.comment;

  if (!name && !comment) {
    inputName.classList += " border-2 border-red-500";
    inputComment.classList += " border-2 border-red-500";
    return true;
  } else if (!name) {
    inputName.classList += " border-2 border-red-500";
    return true;
  } else if (!comment) {
    inputComment.classList += " border-2 border-red-500";
    return true;
  }
  return false;
};

// приоброзование даты
const dateConversion = (date) => {
  let resultDate = new Date(date);
  const newDate = new Date();
  if (!date) {
    resultDate = newDate;
  }
  const time = `${newDate.getHours()}:${newDate.getMinutes()}`;
  return [resultDate.getDate(), resultDate.getMonth() + 1, resultDate.getFullYear(), time].join(",");
};

// UI для комента
const commentUI = (name, date, comment, id) => {
  const getCommentDiv = document.querySelector("#comments");
  const wrapperDiv = document.createElement("li");
  const wrapperNameAndDate = document.createElement("div");
  const nameDiv = document.createElement("div");
  const dateDiv = document.createElement("div");
  const commentDiv = document.createElement("div");
  const buttonsDiv = document.createElement("div");
  const btnLikeDiv = document.createElement("div");
  const btnDeleteDiv = document.createElement("div");

  wrapperDiv.classList = "bg-gray-300 py-2 px-4 border rounded-lg mb-5";
  wrapperNameAndDate.classList = "flex items-center";
  nameDiv.classList = "text-slate-900 font-bold text-xl";
  dateDiv.classList = "ml-2 text-sm";
  commentDiv.classList = "text-lm tracking-tighter";
  buttonsDiv.classList = "flex items-center justify-between mt-2";
  btnLikeDiv.classList = "cursor-pointer";
  btnDeleteDiv.classList = "text-red-600 cursor-pointer";

  nameDiv.textContent = name;
  dateDiv.textContent = date;
  commentDiv.textContent = comment;
  btnLikeDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>`;
  btnDeleteDiv.dataset.click = "delete";
  btnDeleteDiv.id = id;
  btnDeleteDiv.textContent = "delete";
  getCommentDiv.append(wrapperDiv);
  wrapperDiv.append(wrapperNameAndDate);
  wrapperDiv.append(commentDiv);
  wrapperDiv.append(buttonsDiv);
  wrapperNameAndDate.append(nameDiv);
  wrapperNameAndDate.append(dateDiv);
  buttonsDiv.append(btnLikeDiv);
  buttonsDiv.append(btnDeleteDiv);
};

//Добавление коментов на страницу
const generalComments = (array) => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();

  const dateToString = (d) => {
    const splitDaye = d.split(",");
    if (+splitDaye[2] === year && +splitDaye[1] === month) {
      if (+splitDaye[0] === date) {
        return `сегодня, ${splitDaye[3]}`;
      }
      if (+splitDaye[0] === date - 1) {
        return `вчера, ${splitDaye[3]}`;
      }
      return d;
    } else {
      return d;
    }
  };

  resetInput();

  if (typeof array === "object" && !Array.isArray(array) && array !== null) {
    commentUI(array.name, dateToString(array.date), array.comment, array.id);
    // deleteComment(array.id);
    return;
  }

  for (let i = 0; i < array.length; i++) {
    commentUI(array[i].name, dateToString(array[i].date), array[i].comment, array[i].id);
    // deleteComment(array[i].id);
  }
};

// лайк
const onClickBtn = () => {
  const comments = document.querySelector("#comments");

  comments.onclick = function (event) {
    let target = event.target;
    if (target.tagName != "svg" && target.dataset.click != "delete") {
      return;
    } else {
      if (target.style.color === "red") {
        return (target.style.color = "");
      } else {
        target.style.color = "red";
      }
      if (target.dataset.click === "delete") {
        const id = target.id;
        // generalComments(arrayComments)
        const el = document.getElementById(id);
        el.closest("li").remove();
        console.log(el);
      }
    }
  };
};

//Сброс полей ввода
const resetInput = () => {
  formComment.name.value = "";
  formComment.comment.value = "";
  formComment.date.value = "";
};

generalComments(arrayComments);
onClickBtn();
