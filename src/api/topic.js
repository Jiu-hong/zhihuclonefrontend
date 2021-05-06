import { API, host } from "./index";

// app.use("/topics", topicroute);
// route.get("/", getAllTopics);
export const getalltopics = () => API.get(host + "/topics");
