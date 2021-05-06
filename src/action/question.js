import {
  getquestions,
  getcertainquestion,
  createquestion,
  updatequestion,
  followquestion,
  deletequestion,
} from "../api/question";

import { logout } from "./user";

export const getQuestions = async (questiondispatch) => {
  try {
    const { data } = await getquestions(); //api

    //dispatch
    questiondispatch({ type: "getallquestions", payload: data });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};

export const getCertainQuestion = async (questionid, questiondispatch) => {
  try {
    //api
    const { data } = await getcertainquestion(questionid); //api

    //dispatch
    questiondispatch({ type: "getcentainquestion", payload: data });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};

const handleJwtexpire = (error, handler) => {
  if (error.response?.data?.error == "jwt expired") {
    logout(handler);
  }
};

export const createQuestion = async (
  postData,
  questiondispatch,
  userdispatch
) => {
  try {
    //api
    const { data } = await createquestion(postData);

    //dispatch
    questiondispatch({ type: "create", payload: data });
    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);

    return false;
  }
};

export const updateQuestion = async (
  questionid,
  postData,
  questiondispatch,
  userdispatch
) => {
  try {
    //api
    const { data } = await updatequestion(questionid, postData);
    //dispatch
    questiondispatch({ type: "update", payload: data });
    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);

    return false;
  }
};

export const followQuestion = async (
  questionid,
  questiondispatch,
  userdispatch
) => {
  try {
    //api
    const { data } = await followquestion(questionid);

    //dispatch
    questiondispatch({ type: "update", payload: data });
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);
  }
};

export const deleteQuestion = async (
  questionid,
  questiondispatch,
  userdispatch
) => {
  try {
    //api
    await deletequestion(questionid);

    //dispatch
    questiondispatch({ type: "delete", payload: questionid });
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);
  }
};
