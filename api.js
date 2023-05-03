import { renderApp, getListComments, getApp } from "./renderComments.js";

let comments = [];

const fetchAndLoadingComments = () => {
	return fetch("https://webdev-hw-api.vercel.app/api/v1/nikita-zavadskiy/comments", {
		method: "GET",
	}).then((response) => {
		return response.json()
	})
		.then((responseData) => {
			const appComments = responseData.comments.map((comment) => {
				return {
					userName: comment.author.name,
					commentDate: new Date(comment.date).toLocaleString(),
					commentText: comment.text,
					likesCounter: comment.likes,
					likeInfo: false,
					isAnswer: false,
				};
			});
			comments = appComments;
			renderApp(container, getListComments, getApp);
			document.getElementById("loader-comments-feed")
				.classList.add("hidden")
			// уточнить
		});
}

const fetchAndAddComment = () => {

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

	return fetch("https://webdev-hw-api.vercel.app/api/v1/nikita-zavadskiy/comments", {
		method: "POST",
		body: JSON.stringify({
			text: textInput.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
			name: nameInput.value,
			forceError: true,
		})
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

export { comments, fetchAndLoadingComments, fetchAndAddComment }