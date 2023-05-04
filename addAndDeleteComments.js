import { fetchAndAddComment } from "./api.js";
import { renderApp, getListComments, getApp, token } from "./renderComments.js";

const addNewComment = () => {
	const nameInput = document.getElementById("nameInput");
	let textInput = document.getElementById("textInput");
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

	document.getElementById("loader-add-comment")
		.classList.add("block");
	document.getElementById("add-form")
		.classList.add("hidden");

	fetchAndAddComment({
		text: textInput.value,
		token,
	})

	// document.getElementById("loader-comments-feed")
	// 	.classList.add("hidden")

	// nameInput.value = "";
	textInput.value = "";
}

// Удаление крайнего комментария
const deleteLastComment = () => {
	commentsList.lastChild.remove();
	// уточнить как работает
}


export { addNewComment, deleteLastComment }