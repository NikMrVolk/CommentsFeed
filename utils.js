export function delay(interval = 300) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, interval);
	});
}

// Функционал закрытия кнопки при пустых полях ввода из добавления и удаления комментариев
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


// Добавление комментария при нажатии на Enter из добавления и удаления комментариев
// document.addEventListener("keyup", e => {
// 	if (e.key === "Enter") {
// 		addNewComment();
// 	}
// });

// из рендера приложения
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