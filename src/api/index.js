import axios from "axios";

// const host = "http://localhost:5005";
const host = "https://pacific-retreat-18434.herokuapp.com";

const API = axios.create({ baseURL: host });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signin = (userData) => API.post(host + "/user/signin", userData);

export const signup = (userData) => API.post(host + "/user/signup", userData);

// route.get("/forgot", forgot);
export const forgot = (userData) => API.post(host + "/user/forgot", userData);

// route.post("/reset", reset);
export const reset = (userData) => API.post(host + "/user/reset", userData);

// route.get("/getuser", auth, getuserinfo);
export const userinfo = (postData) =>
  API.post(host + "/user/getuser", postData);

// route.get("/", getusers);
export const getusers = () => API.get(host + "/user");

//route.post("/getusersbyids", getusersbyids);
export const getusersbyids = (postData) =>
  API.post(host + "/user/getusersbyids", postData);

// route.post("/followuser", auth, followuser);
// const { followid } = req.body;
export const followuser = (postData) =>
  API.post(host + "/user/followuser", postData);

// route.post("/followers", getfollowers);
// const { followid } = req.body;
// export const getfollowers = (postData) =>
//   API.post(host + "/user/followers", postData);

// route.post("/following", getfollowings);
// const { followid } = req.body;
// export const getfollowings = (postData) =>
//   API.post(host + "/user/following", postData);

// route.post("/clearuser", auth, clearuserinfo);
export const clearuser = () => API.post(host + "/user/clearuser");

//route.get("/", getAnswers);
export const getanswers = () => API.get(host + "/answer");

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
export const getanswersbytopic = (topicid) =>
  API.get(host + `/answer/answersbytopic/${topicid}`);

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

//route.get("/", getQuestions);
export const getquestions = () => API.get(host + "/question");

// route.get("/creator/:creator", getQuestionsbyCreator);
export const getquestionsbycreator = (creator) =>
  API.get(host + `/question/creator/${creator}`);

// route.get("/follow/:followid", getQuestionsbyfollow);
export const getquestionsbyfollow = (followid) =>
  API.get(host + `/question/questionbyfollow/${followid}`);

// route.get("/questionbytopic/:topicid", getQuestionsbyTopic);
export const getquestionsbytopic = (topicid) =>
  API.get(host + `/question/questionbytopic/${topicid}`);

// route.get("/:questionid", getCertainQuestion);
export const getcertainquestion = (questionid) =>
  API.get(host + `/question/${questionid}`);

// route.post("/", auth, createQuestion);
// body: content: String,  follow: [],
export const createquestion = (postData) =>
  API.post(host + "/question", postData);

// route.patch("/:id", auth, updateQuestion);
// const { content } = req.body;
export const updatequestion = (questionid, postData) =>
  API.patch(host + `/question/${questionid}`, postData);

// route.delete("/:id", auth, deleteQuestion);
export const deletequestion = (questionid) =>
  API.delete(host + `/question/${questionid}`);

// route.patch("/follow/:id", auth, followQuestion);
export const followquestion = (questionid) =>
  API.patch(host + `/question/follow/${questionid}`);

// route.get("/", getAllComments);

// route.get("/:postid", getCertainComments);
export const getcertaincomments = (postid) =>
  API.get(host + `/comment/${postid}`);

export const getcommentsbypostids = (postids) =>
  API.post(host + `/comment/postids`, postids);

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

// app.use("/topics", topicroute);
// route.get("/", getAllTopics);
export const getalltopics = () => API.get(host + "/topics");

// route.get("/:topicid", getCertainTopic);
export const getcertaintopic = (topicid) =>
  API.get(host + `/topics/${topicid}`);
