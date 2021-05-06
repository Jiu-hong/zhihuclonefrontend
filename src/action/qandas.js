import { getcertainquestion } from "../api/question";

export const getQuestionAndAnswers = async (
  questionid,
  answerdispatch,
  questiondispatch,
  persondispatch,
  commentdispatch
) => {
  try {
    //api

    const { data } = await getcertainquestion(questionid);
    const { question, answers, persons, comments } = data;
    //dispatch

    persondispatch({ type: "getfollowers", payload: persons });

    commentdispatch({ type: "getall", payload: comments });

    answerdispatch({ type: "getallanswers", payload: answers });

    questiondispatch({ type: "getallquestions", payload: [question] });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};
