import { renderComments } from "./renderComments.js";
// import { getListComments } from "./getListComments.js";
const commentsLoadingText = document.getElementById("loader-comments-feed");
const commentsList = document.getElementById("commentsList");
const buttonAddComments = document.getElementById("buttonAddComments");
const buttonDeleteLastComment = document.getElementById("buttonDeleteLastComment");
const nameInput = document.getElementById("nameInput");
const loaderAddComment = document.getElementById("loader-add-comment");
const addForm = document.getElementById("add-form");
let textInput = document.getElementById("textInput");
export let comments = [];
// import { fetchAndLoadingComments } from "./api.js";

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
				};
			});
			comments = appComments;

			commentsLoadingText.classList.add("hidden")

			renderComments(commentsList, getListComments);
		});
}

const fetchAndAddComment = () => {
	const addStyleAddFormAndSaveInputValue = () => {
		loaderAddComment.classList.remove("block")
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



// export const renderComments = (element, getListComments) => {
// 	const commentsHTML = comments.map((comment, index) => getListComments(comment, index)).join("");
// 	element.innerHTML = commentsHTML;
// 	addCommentLike();
// 	// answerComment();
// }

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
			<button class="like-button ${comment.likeInfo ? "-active-like" : ""}" data-index="${index}" data-likes="${comment.likesCounter}"></button>
		</div>
	</div>
</li>`
}

function delay(interval = 300) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, interval);
	});
}

export const addCommentLike = () => {
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

			// if (comments[index].likeInfo === true) {
			// 	comments[index].likesCounter -= 1;
			// 	comments[index].likeInfo = false;
			// } else {
			// 	comments[index].likesCounter += 1;
			// 	comments[index].likeInfo = true;
			// }
			// renderComments();
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

// 	const answerComment = () => {
// 		const commentsBody = document.querySelectorAll(".comment");
// 		for (const commentBody of commentsBody) {
// 			commentBody.addEventListener("click", () => {
// 				const index = commentBody.dataset.index;
// 				if (comments[index].isAnswer === false) {
// 					textInput.value = `QUOTE_BEGIN ${comments[index].userName}:
// ${comments[index].commentText} QUOTE_END`
// 				}
// 				renderComments();
// 			});
// 		}
// 	}

// =====================================================================================================================
// Код, не позволяющий добавить комментарий и окрашивающий кнопку в серый, пока содержимое
// полей ввода пустое

// buttonAddComments.disabled = "true";

// const validateForm = () => {
// 	if (nameInput.value.trim() === "") {
// 		buttonAddComments.disabled = true;
// 		return;
// 	}
// 	if (textInput.value.trim() === "") {
// 		buttonAddComments.disabled = true;
// 		return;
// 	}
// 	buttonAddComments.disabled = false;
// }

// nameInput.addEventListener("input", validateForm);
// textInput.addEventListener("input", validateForm);
// =====================================================================================================================

fetchAndLoadingComments();
renderComments(commentsList, getListComments);


const addNewComment = () => {

	loaderAddComment.classList.add("block");
	addForm.classList.add("hidden");

	// Код для фиксации текущих даты и времени к каждому новому комментарию
	let myDate = new Date().toLocaleString();

	// Сценарий пустых полей ввода
	if (nameInput.value === "") {
		nameInput.classList.add("empty-place");
		return;
	} else {
		nameInput.classList.remove("empty-place");
	}
	if (textInput.value === "") {
		textInput.classList.add("empty-place");
		return;
	} else {
		textInput.classList.remove("empty-place");
	}

	fetchAndAddComment();
	renderComments(commentsList, getListComments);

	nameInput.value = "";
	textInput.value = "";
}


buttonAddComments.addEventListener("click", addNewComment);

// Добавление комментария при нажатии на Enter
// document.addEventListener("keyup", e => {
// 	if (e.key === "Enter") {
// 		addNewComment();
// 	}
// });

// Удаление крайнего комментария
buttonDeleteLastComment.addEventListener("click", () => {
	commentsList.lastChild.remove();
});