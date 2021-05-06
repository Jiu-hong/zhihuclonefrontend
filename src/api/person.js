import { API, host } from "./index";

// route.post("/getallforperson", getallforperson);
export const getallforperson = (postData) =>
  API.post(host + "/person/getallforperson", postData);

// route.post("/followperson", auth, followperson);
// const { followid } = req.body;
export const followperson = (postData) =>
  API.post(host + "/person/followperson", postData);
