import { container } from "./main.js";
import { comments, fetchAndLoadingComments, fetchAndAddLike } from "./api/workWithComments-api.js";
import { fetchAndLogin } from "./api/authorization-api.js";
import { delay } from "./assistants/utils.js";
import { addNewComment, deleteLastComment } from "./addAndDeleteComments.js";
import { renderLoginComponent, yourName } from "./components/login-component.js";
import { token, renderComments, switchUser } from "./components/comments-component.js";
import { getListComments, getLoaderComments, getApp } from "./assistants/gets.js"


const renderApp = (element, getListComments, getApp) => {
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
const addCommentLike = () => {
	const commentsLikes = document.querySelectorAll(".like-button");
	for (const commentsLike of commentsLikes) {
		commentsLike.addEventListener("click", (event) => {
			event.stopPropagation();
			const index = commentsLike.dataset.index;
			commentsLike.classList.add("-loading-like");
			const id = comments[index].id;

			fetchAndAddLike({ id, token })
				.then((response) => {
					localStorage.setItem(`${id}`, `${response.result.isLiked}`);

				})

			delay(2000).then(() => {
				commentsLike.classList.remove("-loading-like");
				fetchAndLoadingComments();
			});
		});
	}
}

const answerComment = () => {
	const commentsBody = document.querySelectorAll(".comment");
	for (const commentBody of commentsBody) {
		commentBody.addEventListener("click", () => {
			const index = commentBody.dataset.index;
			if (comments[index].isAnswer === false) {
				textInput.value = `QUOTE_BEGIN ${comments[index].userName}:
${comments[index].commentText} QUOTE_END`
			}
			fetchAndLoadingComments();
		});
	}
}


export { renderApp, getApp, getListComments, addCommentLike, token }