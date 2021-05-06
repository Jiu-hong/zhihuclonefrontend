// import User from "../../../server/models/User";
import {
  getanswers,
  getanswersbycreator,
  getanswersbylike,
  getcertainanswers,
  createanswer,
  getcertainanswer,
  deleteanswer,
  updateanswer,
  likeanswer,
  getanswersbytopic,
  getusersbyids,
  getcommentsbypostids,
} from "../api";

import { logout } from "./user";

export const getAnswersWithCreatorsComments = async (
  answerdispatch,
  persondispatch,
  commentdispatch
) => {
  try {
    //api get answers first
    const answers = (await getanswers()).data;

    const personids = answers.map((answer) => answer.creator._id);
    const uniquepersonids = [...new Set(personids)];

    //api get persons secondly
    // export const getusersbyids = (postData) =>
    // API.post(host + "/user/getusersbyids", postData);
    const persons = (await getusersbyids({ ids: uniquepersonids })).data;

    const answerids = answers.map((answer) => answer._id);

    const comments = (await getcommentsbypostids({ postids: answerids })).data;

    //   export const getcommentsbypostids = (postids) =>
    // API.post(host + `/comment/postids`, postids);

    //dispatch

    persondispatch({ type: "getfollowers", payload: persons });

    commentdispatch({ type: "getall", payload: comments });

    answerdispatch({ type: "getallanswers", payload: answers });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};

// export const getanswersbycreator = (creator) =>
//   API.get(host + `/answer/creator/${creator}`);

export const getAnswersbyCreator = async (creator, answerdispatch) => {
  try {
    //api
    const { data } = await getanswersbycreator(creator);
    //dispatch
    answerdispatch({ type: "getanswersbycreator", payload: data });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};

// export const getanswersbylike = (likeid) =>
//   API.get(host + `/answer/answersbylike/${likeid}`);
export const getAnswersbyLike = async (likeid, answerdispatch) => {
  try {
    //api
    const { data } = await getanswersbylike(likeid);
    //dispatch
    answerdispatch({ type: "getanswersbylike", payload: data });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};

// export const getanswersbytopic = (topicid) =>
//   API.get(host + `/answer/answersbytopic/${topicid}`);
export const getAnswersbyTopic = async (topicid, answerdispatch) => {
  try {
    //api
    const { data } = await getanswersbytopic(topicid);

    //dispatch
    answerdispatch({ type: "getallanswers", payload: data });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};

export const getCertainAnswers = async (questionid, answerdispatch) => {
  try {
    //api
    const { data } = await getcertainanswers(questionid);
    //dispatch
    answerdispatch({ type: "getallanswers", payload: data });
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

export const getCertainAnswer = async (answerid, answerdispatch) => {
  try {
    const { data } = await getcertainanswer(answerid);
    console.log("data in action/answer: ", data);

    answerdispatch({ type: "update", payload: data });

    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);

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
