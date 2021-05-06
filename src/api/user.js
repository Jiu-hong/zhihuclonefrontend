import { API, host } from "./index";

export const signin = (userData) => API.post(host + "/user/signin", userData);

export const signup = (userData) => API.post(host + "/user/signup", userData);

// route.get("/forgot", forgot);
export const forgot = (userData) => API.post(host + "/user/forgot", userData);

// route.post("/reset", reset);
export const reset = (userData) => API.post(host + "/user/reset", userData);
