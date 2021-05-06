import { getalltopics } from "../api/topic";

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
