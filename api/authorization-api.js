export const fetchAndLogin = ({ login, password }) => {
	return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
		method: "POST",
		body: JSON.stringify({
			login,
			password,
		})
	})
		.then((response) => {
			if (response.status === 400) {
				throw new Error("Entered not true login or password");
			}
			return response.json();
		})
}

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