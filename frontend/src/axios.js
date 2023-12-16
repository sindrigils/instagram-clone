import axios from "axios";

const baseURL = "http://localhost:8000/";

const tokens = JSON.parse(localStorage.getItem("jwtTokens"));
let accessToken = "";

if (tokens) {
  accessToken = tokens["accessToken"];
}
export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: accessToken ? "JWT " + accessToken : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
