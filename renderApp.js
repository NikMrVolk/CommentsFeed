import { container } from "./index.js";
import { comments, fetchAndLoadingComments, fetchAndAddLike } from "./api/workWithComments-api.js";
import { fetchAndLogin } from "./api/authorization-api.js";
import { delay } from "./assistants/utils.js";
import { renderLoginComponent, yourName } from "./components/login-component.js";
import { token, renderComments, switchUser } from "./components/comments-component.js";
import { getListComments, getLoaderComments, getApp } from "./assistants/gets.js"
import { addNewComment } from "./functional/addComments.js";
import { deleteLastComment } from "./functional/deleteComments.js";
import { addCommentLike } from "./functional/addLike.js";
import { answerComment } from "./functional/answerComment.js";

export const renderApp = (element, getListComments, getApp) => {
	if (!token) {
		renderComments(container, getLoaderComments, getListComments)
		return;
	}
	if (!localStorage.getItem("myUserToken")) {
		renderComments(container, getLoaderComments, getListComments)
		return;
	}
	const commentsHTML = comments
		.map((comment, index) => getListComments(comment, index)).join("");
	const appHTML = getApp(commentsHTML);
	element.innerHTML = appHTML;

	const nameInput = document.getElementById("nameInput");
	if (localStorage.getItem("yourName")) {
		nameInput.value = localStorage.getItem("yourName");
	} else {
		nameInput.value = yourName;
	}
	nameInput.disabled = true;

	addCommentLike();
	// answerComment();

	document.getElementById("buttonAddComments")
		.addEventListener("click", addNewComment);
	document.getElementById("buttonDeleteLastComment")
		.addEventListener("click", deleteLastComment);
	document.getElementById("buttonLogout")
		.addEventListener("click", switchUser);
}

export { token }
