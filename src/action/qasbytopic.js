import {
  getquestionsbytopic,
  getanswersbytopic,
  getusersbyids,
  getcommentsbypostids,
} from "../api";

export const getQAsbyTopic = async (
  topicid,
  answerdispatch,
  questiondispatch,
  persondispatch,
  commentdispatch
) => {
  try {
    //api
    const questions = (await getquestionsbytopic(topicid)).data;
    const answers = (await getanswersbytopic(topicid)).data;

    const personidsforanswers = answers.map((answer) => answer.creator._id);
    const personidsforquestions = questions.map(
      (question) => question.creator._id
    );

    const uniquepersonids = [
      ...new Set([...personidsforanswers, ...personidsforquestions]),
    ];

    const persons = (await getusersbyids({ ids: uniquepersonids })).data;

    const answerids = answers.map((answer) => answer._id);
    const questionids = questions.map((question) => question._id);

    const comments = (
      await getcommentsbypostids({ postids: [...answerids, ...questionids] })
    ).data;

    //dispatch

    persondispatch({ type: "getfollowers", payload: persons });

    commentdispatch({ type: "getall", payload: comments });

    answerdispatch({ type: "getallanswers", payload: answers });
    questiondispatch({ type: "getallquestions", payload: questions });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};
