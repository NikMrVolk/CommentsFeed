import { renderApp } from "./renderApp.js";
import { fetchAndLoadingComments, fetchAndAddComment } from "./api/workWithComments-api.js";
import { getListComments, getApp } from "./assistants/gets.js";
import { addNewComment } from "./functional/addComments.js";
import { deleteLastComment } from "./functional/deleteComments.js";


export const container = document.getElementById("container");

fetchAndLoadingComments();
renderApp(container, getListComments, getApp);