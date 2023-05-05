// Удаление ТОЛЬКО крайнего комментария
export const deleteLastComment = () => {
	commentsList.lastChild.remove();
}