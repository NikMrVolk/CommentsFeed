import { container } from "./main.js";
import { comments } from "./api.js";
import { delay } from "./utils.js";
import { addNewComment, deleteLastComment } from "./addAndDeleteComments.js";



const renderApp = (element, getListComments, getApp) => {

	const commentsHTML = comments
		.map((comment, index) => getListComments(comment, index)).join("");

	const appHTML = getApp(commentsHTML);

	element.innerHTML = appHTML;

	addCommentLike();
	answerComment();

	document.getElementById("buttonAddComments")
		.addEventListener("click", addNewComment);

	document.getElementById("buttonDeleteLastComment")
		.addEventListener("click", deleteLastComment);
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
			<button class="like-button ${comment.likeInfo ? "-active-like" : ""}" data-index="${index}" data-likes="${comment.likesCounter}"></button>
		</div>
	</div>
</li>`
}

const getApp = (commentsHTML) => {
	return `<div id="loader-comments-feed">Пожалуйста подождите, загружаю комментарии...</div>
	<ul class="comments" id="commentsList">
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
	<button class="add-form-button" id="buttonDeleteLastComment">Удалить последний комментарий</button>`
}


const addCommentLike = () => {
	const commentsLikes = document.querySelectorAll(".like-button");
	for (const commentsLike of commentsLikes) {
		commentsLike.addEventListener("click", (event) => {
			event.stopPropagation();
			const index = commentsLike.dataset.index;
			commentsLike.classList.add("-loading-like");
			delay(2000).then(() => {
				comments[index].likesCounter = comments[index].likeInfo ? comments[index].likesCounter - 1 : comments[index].likesCounter + 1;
				comments[index].likeInfo = !comments[index].likeInfo;
				commentsLike.classList.remove("-loading-like");
				renderApp(container, getListComments, getApp);
				document.getElementById("loader-comments-feed")
					.classList.add("hidden")
				// уточнить
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

// const editComments = () => {
// 	const editCommentsButtons = document.querySelectorAll(".edit-button");
// 	for (const editCommentsButton of editCommentsButtons) {
// 		editCommentsButton.addEventListener("click", (event) => {
// 			event.stopPropagation();
// 			const index = editCommentsButton.dataset.index;
// 			if (comments[index].isEdit === true) {
// 				const textInputEditComment = document.getElementById("textInputEditComment");
// 				comments[index].commentText = textInputEditComment.value;
// 				comments[index].isEdit = false;
// 			} else {
// 				comments[index].commentText = `<textarea type="textarea" class="form-edit-comment" rows="4"
// 			id="textInputEditComment">${comments[index].commentText}</textarea>`
// 				comments[index].isEdit = true;
// 			}
// 			renderComments();
// 		});
// 	}
// }

export { renderApp, getApp, getListComments, addCommentLike }