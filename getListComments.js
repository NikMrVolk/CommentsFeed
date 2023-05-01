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

export { getListComments }