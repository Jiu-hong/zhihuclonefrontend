import { getalltopics, getcertaintopic } from "../api";

export const getAllTopics = async (topicdispatch) => {
  try {
    //api
    const { data } = await getalltopics();
    //dispatch
    topicdispatch({ type: "getalltopics", payload: data });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};

export const getCertainTopic = async (topicid, topicdispatch) => {
  try {
    //api
    const { data } = await getcertaintopic(topicid);
    //dispatch
    topicdispatch({ type: "getcertaintopic", payload: data });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};
