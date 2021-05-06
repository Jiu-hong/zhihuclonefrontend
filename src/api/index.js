import axios from "axios";

// export const host = "http://localhost:5005";
export const host = "https://pacific-retreat-18434.herokuapp.com";

export const API = axios.create({ baseURL: host });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
