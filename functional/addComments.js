import { fetchAndAddComment } from "../api/workWithComments-api.js";
import { renderApp } from "../renderApp.js";
import { getListComments, getLoaderComments, getApp } from "../assistants/gets.js"
import { token } from "../renderApp.js";

export const addNewComment = () => {
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

	textInput.value = "";
}
