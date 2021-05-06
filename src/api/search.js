import { API, host } from "./index";

// route.post("/", getAll);
export const getallforsearch = (searchContent) =>
  API.post(host + "/search", searchContent);
