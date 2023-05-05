export const answerComment = () => {
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