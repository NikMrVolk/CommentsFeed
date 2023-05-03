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