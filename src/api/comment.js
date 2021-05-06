import { API, host } from "./index";

// route.get("/", getAllComments);

// route.post("/:postid", auth, createComment);
export const createcomment = (postid, postData) =>
  API.post(host + `/comment/${postid}`, postData);

// route.patch("/:commentid", auth, updateComment);
//const { content } = req.body;
export const updatecomment = (commentid, postData) =>
  API.patch(host + `/comment/${commentid}`, postData);

// route.patch("/like/:commentid", auth, likeComment);
export const likecomment = (commentid) =>
  API.patch(host + `/comment/like/${commentid}`);

// route.delete("/:commentid", auth, deleteComment);
export const deletecomment = (commentid) =>
  API.delete(host + `/comment/${commentid}`);
