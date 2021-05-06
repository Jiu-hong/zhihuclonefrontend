import { getanswers, getquestions, getusers, getalltopics } from "../api";

export const getAllforSearch = async (searchContent, searchdispatch) => {
  try {
    const answers = (await getanswers()).data.filter(
      (answer) => answer.content?.toLowerCase().indexOf(searchContent) > -1
    ); //api
    const questions = (await getquestions()).data.filter(
      (question) => question.content?.toLowerCase().indexOf(searchContent) > -1
    );

    const users = (await getusers()).data.filter(
      (person) => person.name?.toLowerCase().indexOf(searchContent) > -1
    );

    const topics = (await getalltopics()).data.filter(
      (topic) => topic.name?.toLowerCase().indexOf(searchContent) > -1
    );
    //dispatch
    searchdispatch({
      type: "getallforsearch",
      payload: [...answers, ...questions, ...users, ...topics],
    });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};
