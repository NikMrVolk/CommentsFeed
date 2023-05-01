import { renderComments, getListComments } from "./renderComments.js";
import { fetchAndLoadingComments, fetchAndAddComment } from "./api.js";
import { addNewComment, deleteLastComment } from "./addAndDeleteComments.js";

export const commentsLoadingText = document.getElementById("loader-comments-feed");
const commentsList = document.getElementById("commentsList");
export const loaderAddComment = document.getElementById("loader-add-comment");
export const addForm = document.getElementById("add-form");
export const nameInput = document.getElementById("nameInput");
export let textInput = document.getElementById("textInput");
const buttonAddComments = document.getElementById("buttonAddComments");
export const buttonDeleteLastComment = document.getElementById("buttonDeleteLastComment");

fetchAndLoadingComments();
renderComments(commentsList, getListComments);

buttonAddComments.addEventListener("click", addNewComment);
buttonDeleteLastComment.addEventListener("click", deleteLastComment);