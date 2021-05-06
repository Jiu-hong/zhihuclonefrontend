import { getallforsearch } from "../api/search";

export const getAllforSearch = async (searchContent, searchdispatch) => {
  try {
    const { data } = await getallforsearch(searchContent);

    //dispatch
    searchdispatch({
      type: "getallforsearch",
      payload: data,
    });
  } catch (error) {
    if (error.response) console.log(error.response.data);
  }
};
