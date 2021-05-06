import { API, host } from "./index";

//route.get("/", getQuestions);
export const getquestions = () => API.get(host + "/question");

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
