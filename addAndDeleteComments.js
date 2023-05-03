import {
	loaderAddComment, addForm, nameInput,
	textInput, buttonDeleteLastComment
} from "./main.js";
import { fetchAndAddComment } from "./api.js";
import { renderComments, getListComments } from "./renderComments.js";

const addNewComment = () => {

	loaderAddComment.classList.add("block");
	addForm.classList.add("hidden");

	// Код для фиксации текущих даты и времени к каждому новому комментарию
	let myDate = new Date().toLocaleString();

	// Сценарий пустых полей ввода
	if (nameInput.value === "") {
		nameInput.classList.add("empty-place");
		return;
	} else {
		nameInput.classList.remove("empty-place");
	}
	if (textInput.value === "") {
		textInput.classList.add("empty-place");
		return;
	} else {
		textInput.classList.remove("empty-place");
	}

	fetchAndAddComment();
	renderComments(commentsList, getListComments);

	nameInput.value = "";
	textInput.value = "";
}


// Функционал закрытия кнопки при пустых полях ввода
// buttonAddComments.disabled = "true";

// const validateForm = () => {
// 	if (nameInput.value.trim() === "") {
// 		buttonAddComments.disabled = true;
// 		return;
// 	}
// 	if (textInput.value.trim() === "") {
// 		buttonAddComments.disabled = true;
// 		return;
// 	}
// 	buttonAddComments.disabled = false;
// }

// nameInput.addEventListener("input", validateForm);
// textInput.addEventListener("input", validateForm);


// Добавление комментария при нажатии на Enter
// document.addEventListener("keyup", e => {
// 	if (e.key === "Enter") {
// 		addNewComment();
// 	}
// });

// Удаление крайнего комментария

const deleteLastComment = () => {
	commentsList.lastChild.remove();
}


export { addNewComment, deleteLastComment }