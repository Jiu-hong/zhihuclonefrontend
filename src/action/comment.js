import {
  createcomment,
  likecomment,
  updatecomment,
  deletecomment,
} from "../api/comment";

import { logout } from "./user";

const handleJwtexpire = (error, handler) => {
  if (error.response?.data?.error == "jwt expired") {
    logout(handler);
  }
};

export const createComment = async (
  postid,
  postData,
  commentdispatch,
  userdispatch
) => {
  try {
    //api
    const { data } = await createcomment(postid, postData);

    //dispatch
    commentdispatch({ type: "create", payload: data });

    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);

    return false;
  }
};

export const updateComment = async (
  commentid,
  postData,
  commentdispatch,
  userdispatch
) => {
  try {
    //api
    const { data } = await updatecomment(commentid, postData);
    //dispatch
    commentdispatch({ type: "update", payload: data });

    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);

    return false;
  }
};

export const likeComment = async (commentid, commentdispatch, userdispatch) => {
  try {
    //api
    const { data } = await likecomment(commentid);

    //dispatch
    commentdispatch({ type: "update", payload: data });
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);
  }
};

export const deleteComment = async (
  commentid,
  commentdispatch,
  userdispatch
) => {
  try {
    //api
    await deletecomment(commentid);

    //dispatch
    commentdispatch({ type: "delete", payload: commentid });
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);
  }
};
