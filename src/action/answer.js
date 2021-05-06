import {
  getanswers,
  createanswer,
  deleteanswer,
  updateanswer,
  likeanswer,
} from "../api/answer";

import { logout } from "./user";

export const getAnswersWithCreatorsComments = async (
  answerdispatch,
  persondispatch,
  commentdispatch
) => {
  try {
    const { data } = await getanswers();

    const { answers, persons, comments } = data;

    persondispatch({ type: "getfollowers", payload: persons });

    commentdispatch({ type: "getall", payload: comments });

    answerdispatch({ type: "getallanswers", payload: answers });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};

const handleJwtexpire = (error, handler) => {
  console.log("error.response.data", error.response.data.error);
  if (error.response?.data?.error == "jwt expired") {
    logout(handler);
  }
};

export const createAnswer = async (
  questionid,
  answerData,
  answerdispatch,
  userdispatch
) => {
  try {
    const { data } = await createanswer(questionid, answerData);

    answerdispatch({ type: "create", payload: data });

    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);

    return false;
  }
};

export const updateAnswer = async (
  answerid,
  answerData,
  answerdispatch,
  userdispatch
) => {
  try {
    const { data } = await updateanswer(answerid, answerData);

    answerdispatch({ type: "update", payload: data });

    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);

    return false;
  }
};

export const likeAnswer = async (answerid, answerdispatch, userdispatch) => {
  try {
    const { data } = await likeanswer(answerid);
    answerdispatch({ type: "update", payload: data });

    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);

    return false;
  }
};

export const deleteAnswer = async (answerid, answerdispatch, userdispatch) => {
  try {
    await deleteanswer(answerid);

    answerdispatch({ type: "delete", payload: answerid });
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);
  }
};
