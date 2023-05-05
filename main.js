import { renderApp, getListComments, getApp } from "./renderApp.js";
import { fetchAndLoadingComments, fetchAndAddComment } from "./api/workWithComments-api.js";
import { addNewComment, deleteLastComment } from "./addAndDeleteComments.js";

export const container = document.getElementById("container");

fetchAndLoadingComments();
renderApp(container, getListComments, getApp);