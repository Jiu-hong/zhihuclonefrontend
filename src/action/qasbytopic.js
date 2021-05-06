import { getqasbytopic } from "../api/answer";

export const getQAsbyTopic = async (
  topicid,
  answerdispatch,
  questiondispatch,
  persondispatch,
  commentdispatch
) => {
  try {
    //api
    const { data } = await getqasbytopic(topicid);

    const { answers, questions, persons, comments } = data;

    //dispatch

    persondispatch({ type: "getfollowers", payload: persons });

    commentdispatch({ type: "getall", payload: comments });

    answerdispatch({ type: "getallanswers", payload: answers });

    questiondispatch({ type: "getallquestions", payload: questions });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};
