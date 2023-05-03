import { renderApp, getListComments, getApp } from "./renderComments.js";
import { fetchAndLoadingComments, fetchAndAddComment } from "./api.js";
import { addNewComment, deleteLastComment } from "./addAndDeleteComments.js";

export const container = document.getElementById("container");

fetchAndLoadingComments();
renderApp(container, getListComments, getApp);