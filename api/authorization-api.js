export const fetchAndAuthorization = ({ name, login, password }) => {
	return fetch("https://webdev-hw-api.vercel.app/api/user", {
		method: "POST",
		body: JSON.stringify({
			name,
			login,
			password,
		})
	})
		.then((response) => {
			if (response.status === 400) {
				throw new Error("User with such data already exists");
			}
			return response.json();
		})
}

export const fetchAndAddLike = ({ id, token }) => {
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