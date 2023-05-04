export const fetchAndLoadingComments = () => {
	return fetch("https://webdev-hw-api.vercel.app/api/v2/nikita-zavadskiy/comments", {
		method: "GET",
	}).then((response) => {
		return response.json()
	})
}

export const fetchAndAddComment = ({ text, token }) => {
	return fetch("https://webdev-hw-api.vercel.app/api/v2/nikita-zavadskiy/comments", {
		method: "POST",
		body: JSON.stringify({
			text,
			// forceError: true,
		}),
		headers: {
			Authorization: token,
		},
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
	}

	const fetchAndAddLike = ({ id, token }) => {
		return fetch(`https://webdev-hw-api.vercel.app/api/v2/nikita-zavadskiy
			/comments/${id}/toggle-like`, {
			method: "POST",
			headers: {
				Authorization: token,
			},
		})
			.then((response) => {
				return response.json();
			})
	}