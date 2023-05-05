import { renderLoginComponent } from "./login-component.js";
import { comments, fetchAndLoadingComments } from "../api/workWithComments-api.js";
import { renderApp } from "../renderApp.js";
import { container } from "../index.js";
import { getListComments, getLoaderComments, getApp } from "../assistants/gets.js"

export let token = null;
token = localStorage.getItem("myUserToken");

export const renderComments = (element, getLoaderComments, getListComments) => {
	element.innerHTML = getLoaderComments();
	let commentsHTML = comments
		.map((comment, index) => getListComments(comment, index)).join("");

	if (commentsHTML) {
		commentsHTML = commentsHTML + `
		<button id="transitionToAuthorization" class="add-form-button" >Чтобы добавить комментарий, 
		авторизуйтесь</button>`
		element.innerHTML = commentsHTML;

		document.getElementById("transitionToAuthorization")
			.addEventListener("click", () => {
				renderLoginComponent({
					element,
					setToken: (newToken) => {
						token = newToken;
					},
					fetchAndLoadingComments,
				});
			})
	}
}

export const switchUser = (token) => {
	localStorage.removeItem("myUserToken");
	localStorage.removeItem("yourName");
	token = null;
	fetchAndLoadingComments();
}