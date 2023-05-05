import { comments, fetchAndLoadingComments, fetchAndAddLike } from "../api/workWithComments-api.js";
import { delay } from "../assistants/utils.js";
import { token } from "../components/comments-component.js";

export const addCommentLike = () => {
	const commentsLikes = document.querySelectorAll(".like-button");
	for (const commentsLike of commentsLikes) {
		commentsLike.addEventListener("click", (event) => {
			event.stopPropagation();
			const index = commentsLike.dataset.index;
			commentsLike.classList.add("-loading-like");
			const id = comments[index].id;

			fetchAndAddLike({ id, token })
				.then((response) => {
					localStorage.setItem(`${id}`, `${response.result.isLiked}`);

				})

			delay(2000).then(() => {
				commentsLike.classList.remove("-loading-like");
				fetchAndLoadingComments();
			});
		});
	}
}