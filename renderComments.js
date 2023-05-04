import { container } from "./main.js";
import { comments, fetchAndLoadingComments, fetchAndLogin, fetchAndAddLike } from "./api.js";
import { delay } from "./utils.js";
import { addNewComment, deleteLastComment } from "./addAndDeleteComments.js";
import { renderLoginComponent, yourName } from "./components/login-component.js";

let token = null;
token = localStorage.getItem("myUserToken");


const renderApp = (element, getListComments, getApp) => {
	if (!token) {
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
		.addEventListener("click", () => {
			localStorage.removeItem("myUserToken");
			localStorage.removeItem("yourName");
			token = null;
			renderApp(container, getListComments, getApp);
		});
}

const renderComments = (element, getLoaderComments, getListComments) => {
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

const getListComments = (comment, index) => {
	return `<li class="comment" data-index="${index}">
	<div class="comment-header">
		<div>${comment.userName.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")}</div>
		<div>${comment.commentDate}</div>
	</div>
	<div class="comment-body">
		<div class="comment-text">
			${comment.commentText.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>")}
		</div>
	</div> 
	<div class="comment-footer">
		<div class="likes">
			<span class="likes-counter">${comment.likesCounter}</span>
			<button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}" data-likes="${comment.likesCounter}"></button>
		</div>
	</div>
</li>`
}

const getLoaderComments = () => {
	return `<div id="loader-comments-feed">Пожалуйста подождите, загружаю комментарии...</div>`
}

const getApp = (commentsHTML) => {
	return `<ul class="comments" id="commentsList">
	${commentsHTML}</ul>
	<div id="loader-add-comment" class="loader-add-comment">Комментарий загружается...</div>
	<div id="add-form" class="add-form">
		<input type="text" class="add-form-name" placeholder="Введите ваше имя" id="nameInput" />
		<textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
			id="textInput"></textarea>
		<div class="add-form-row">
			<button class="add-form-button" id="buttonAddComments">Написать</button>
		</div>
	</div>
	<button class="add-form-button" id="buttonDeleteLastComment">Удалить последний комментарий</button>
	<button class="add-form-button" id="buttonLogout">Выйти из учётной записи</button>`
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