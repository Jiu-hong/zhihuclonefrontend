import { API, host } from "./index";
//route.get("/", getAnswers);
export const getanswers = () => {
  console.log("host:", host);
  return API.get(host + "/answer");
};

// route.get("/creator/:creator", getAnswersbyCreator);
export const getanswersbycreator = (creator) =>
  API.get(host + `/answer/creator/${creator}`);

// route.get("/:questionid", getCertainAnswers);
export const getcertainanswers = (questionid) =>
  API.get(host + `/answer/${questionid}`);

//route.get("/answersbylike/:likeid", getAnswersbyLike);
export const getanswersbylike = (likeid) =>
  API.get(host + `/answer/answersbylike/${likeid}`);

// route.get("/answersbytopic/:topicid", getAnswersbyTopic);
export const getqasbytopic = (topicid) =>
  API.get(host + `/answer/qasbytopic/${topicid}`);

// route.get("/:answerid", getAnswer);
export const getcertainanswer = (answerid) =>
  API.get(host + `/answer/answer/${answerid}`);

//route.post("/:questionid", auth, createAnswer);
export const createanswer = (questionid, answerData) =>
  API.post(host + `/answer/${questionid}`, answerData);

// route.patch("/:id", auth, updateAnswer);
export const updateanswer = (answerid, answerData) =>
  API.patch(host + `/answer/${answerid}`, answerData);

// route.patch("/like/:id/", auth, likeAnswer);
export const likeanswer = (answerid) =>
  API.patch(host + `/answer/like/${answerid}`);

//route.delete("/:id", auth, deleteAnswer);
export const deleteanswer = (answerid) =>
  API.delete(host + `/answer/${answerid}`);
