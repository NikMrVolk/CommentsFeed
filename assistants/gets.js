export const getListComments = (comment, index) => {
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

export const getLoaderComments = () => {
	return `<div id="loader-comments-feed">Пожалуйста подождите, загружаю комментарии...</div>`
}

export const getApp = (commentsHTML) => {
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