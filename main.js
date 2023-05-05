import { renderApp } from "./renderApp.js";
import { fetchAndLoadingComments, fetchAndAddComment } from "./api/workWithComments-api.js";
import { addNewComment, deleteLastComment } from "./addAndDeleteComments.js";
import { getListComments, getApp } from "./assistants/gets.js"

export const container = document.getElementById("container");

fetchAndLoadingComments();
renderApp(container, getListComments, getApp);