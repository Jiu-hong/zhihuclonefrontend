import { getallforperson, followperson } from "../api/person";
import { logout } from "../action/user";

export const getAllforPerson = async (
  personid,
  answerdispatch,
  questiondispatch,
  persondispatch,
  commentdispatch
) => {
  console.log("personid:", personid);
  try {
    console.log("personid in action/person:", personid);
    const { data } = await getallforperson({ personid: personid });
    console.log("data for getallforperson: ", data);
    //dispatch

    const { answers, questions, persons, comments } = data;

    persondispatch({ type: "getfollowers", payload: persons });

    commentdispatch({ type: "getall", payload: comments });

    questiondispatch({ type: "getallquestions", payload: questions });

    answerdispatch({ type: "getallanswers", payload: answers });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};

const handleJwtexpire = (error, handler) => {
  if (error.response?.data?.error == "jwt expired") {
    logout(handler);
  }
};

export const followPerson = async (postData, persondispatch, userdispatch) => {
  try {
    //api
    const { data } = await followperson(postData);
    // const { person, user } = data;
    console.log("data in followperson:", data);
    //dispatch
    persondispatch({ type: "updateperson", payload: data });

    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);

    return false;
  }
};
