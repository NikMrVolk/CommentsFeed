import { fetchAndLogin, fetchAndAuthorization } from "../api.js";

export let yourName = null;
let user = null;

export const renderLoginComponent = ({ element, setToken, fetchAndLoadingComments }) => {

	let isLoadingForm = true;

	const renderForm = () => {
		const appHTML =
			`<div class="add-form form-registration">
				<div class="form-registration__title">Форма ${isLoadingForm ? "входа" : "регистрации"}</div>
				${isLoadingForm ? "" : `<input id="name-form" class="form-registration__input" type="text" placeholder="Введите имя">`}
				<input id="login-form" class="form-registration__input" type="text" placeholder="Введите логин">
				<input id="password-form" class="form-registration__input" type="password" placeholder="Введите пароль">
				<button id="login-button" class="add-form-button form-registration__button">${isLoadingForm ? "Войти" : "Зарегистрироваться"}</button>
				<button id="switching-button" class="add-form-button form-registration__button">${isLoadingForm ? "Зарегистрироваться" : "Войти"}</button>
			</div>`

		element.innerHTML = appHTML;

		document.getElementById("login-button")
			.addEventListener("click", () => {
				if (isLoadingForm) {
					const login = document.getElementById("login-form");
					const password = document.getElementById("password-form");

					// if (!login.value) {
					// 	alert("Enter login");
					// 	return;
					// }
					// if (!password.value) {
					// 	alert("Enter password");
					// 	return;
					// }

					fetchAndLogin({
						// login: login.value,
						// password: password.value,
						login: "admin",
						password: "admin",
					})
						.then((user) => {
							setToken(`Bearer ${user.user.token}`);
							yourName = user.user.name;
							localStorage.setItem('myUserToken', `Bearer ${user.user.token}`);
							localStorage.setItem("yourName", yourName);
							fetchAndLoadingComments();

						})
					// .catch((error) => {
					// 	alert("You entered not true login or password")
					// 	console.log(error);
					// })
				} else {
					const name = document.getElementById("name-form");
					const login = document.getElementById("login-form");
					const password = document.getElementById("password-form");

					if (!name.value) {
						alert("Enter name");
					}
					if (!login.value) {
						alert("Enter login");
					}
					if (!password.value) {
						alert("Enter password");
					}

					fetchAndAuthorization({
						name: name.value,
						login: login.value,
						password: password.value,
					})
						.then((user) => {
							setToken(`Bearer ${user.user.token}`);
							yourName = user.user.name;
							localStorage.setItem('myUserToken', `Bearer ${user.user.token}`);
							localStorage.setItem("yourName", yourName);
							fetchAndLoadingComments();
						})
						.catch((error) => {
							alert("User with such data already exists")
							console.log(error);
						})
				}
			})
		document.getElementById("switching-button")
			.addEventListener("click", () => {
				isLoadingForm = !isLoadingForm;
				renderForm();
			})
	}
	renderForm();

}