import { renderComments } from "./main.js";
let comments = [];
const commentsLoadingText = document.getElementById("loader-comments-feed");

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
			renderComments();
		});
}

export { fetchAndLoadingComments }