import { comments } from "./main.js";

const renderComments = (element, getListComments) => {
	const commentsHTML = comments
		.map((comment, index) => getListComments(comment, index)).join("");
	element.innerHTML = commentsHTML;
	// addCommentLike();
	// answerComment();
}

export { renderComments }