import { renderApp } from "../renderApp.js";
import { container } from "../index.js";
import { getListComments, getApp } from "../assistants/gets.js"
import { format } from "date-fns";

export let comments = [];

export const fetchAndLoadingComments = () => {
	return fetch("https://webdev-hw-api.vercel.app/api/v2/nikita-zavadskiy/comments", {
		method: "GET",
	}).then((response) => {
		return response.json()

	})
		.then((responseData) => {
			const commentData = responseData.comments;
			commentData.forEach(element => {
				let keys = Object.keys(localStorage);
				for (let key of keys) {
					if (element.id === key) {
						if (localStorage.getItem(key) === "true") {
							element.isLiked = true;
						} else {
							element.isLiked = false;
						}
					}
				}
			});

			const appComments = commentData.map((comment) => {
				return {
					userName: comment.author.name,
					commentDate: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
					commentText: comment.text,
					likesCounter: comment.likes,
					isLiked: comment.isLiked,
					isAnswer: comment.isLiked,
					id: comment.id,
				};
			});

			comments = appComments;
			renderApp(container, getListComments, getApp);
		});
}

export const fetchAndAddComment = ({ text, token }) => {

	const loaderAddComment = document.getElementById("loader-add-comment")
	const addForm = document.getElementById("add-form");
	const nameInput = document.getElementById("nameInput");
	let textInput = document.getElementById("textInput");

	const addStyleAddFormAndSaveInputValue = () => {
		loaderAddComment.classList.remove("block");
		loaderAddComment.classList.add("hidden");
		addForm.classList.remove("hidden");
		addForm.classList.add("block");
		nameInput.classList.add("name-input-return");
		textInput.classList.add("text-input-return");

		nameInput.value = valueNameInput;
		textInput.value = valueTextInput;
	}

	const valueNameInput = nameInput.value;
	const valueTextInput = textInput.value;

	return fetch("https://webdev-hw-api.vercel.app/api/v2/nikita-zavadskiy/comments", {
		method: "POST",
		body: JSON.stringify({
			text,
			// forceError: true,
		}),
		headers: {
			Authorization: token,
		},
	})
		.then((response) => {
			if (response.status === 400) {
				throw new Error("not enough symbols");
			}
			if (response.status === 500) {
				throw new Error("something broke");
			}
			return fetchAndLoadingComments();
		})
		.then((response) => {
			addStyleAddFormAndSaveInputValue();
			nameInput.value = "";
			textInput.value = "";
			return response;
		})
		.catch((error) => {
			switch (error.message) {
				case "not enough symbols":
					alert("Имя и комментарий не должны быть короче 3-х символов");
					addStyleAddFormAndSaveInputValue();
					break;
				case "something broke":
					addStyleAddFormAndSaveInputValue();
					fetchAndAddComment();
					break;
				case "Failed to fetch":
					alert("Проблема с интернетом, попробуйте позже");
					addStyleAddFormAndSaveInputValue();
					break;
				default:
					alert("Что-то пошло не так, попробуйте позже");
					addStyleAddFormAndSaveInputValue();
					break;
			}
		})
}

export const fetchAndAddLike = ({ id, token }) => {
	return fetch(`https://webdev-hw-api.vercel.app/api/v2/nikita-zavadskiy
			/comments/${id}/toggle-like`, {
		method: "POST",
		headers: {
			Authorization: token,
		},
	})
		.then((response) => {
			return response.json();
		})
}