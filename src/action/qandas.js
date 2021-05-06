import {
  getcertainquestion,
  getcertainanswers,
  getusersbyids,
  getcommentsbypostids,
} from "../api";

export const getQuestionAndAnswers = async (
  questionid,
  answerdispatch,
  questiondispatch,
  persondispatch,
  commentdispatch
) => {
  try {
    //api
    const question = (await getcertainquestion(questionid)).data;
    const answers = (await getcertainanswers(questionid)).data;

    let personids = answers.map((answer) => answer.creator._id);

    personids.push(question.creator._id);
    const uniquepersonids = [...new Set(personids)];

    const persons = (await getusersbyids({ ids: uniquepersonids })).data;

    const qandasids = answers.map((answer) => answer._id);
    qandasids.push(questionid);

    const comments = (await getcommentsbypostids({ postids: qandasids })).data;

    //dispatch

    persondispatch({ type: "getfollowers", payload: persons });

    commentdispatch({ type: "getall", payload: comments });

    answerdispatch({ type: "getallanswers", payload: answers });
    questiondispatch({ type: "getallquestions", payload: [question] });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};
