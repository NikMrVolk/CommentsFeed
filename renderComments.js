import { comments } from "./api.js";
import { delay } from "./utils.js";

const renderComments = (element, getListComments) => {
	const commentsHTML = comments
		.map((comment, index) => getListComments(comment, index)).join("");
	element.innerHTML = commentsHTML;
	addCommentLike();
	answerComment();
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
				renderComments(commentsList, getListComments);
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
			renderComments(commentsList, getListComments);
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

export { renderComments, getListComments, addCommentLike }