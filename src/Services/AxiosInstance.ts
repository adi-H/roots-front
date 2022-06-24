import axios from "axios";
import config from "../config/config";
import { AuthorityError } from "../enums/AuthorityError";

const axiosInstance = axios.create({
  baseURL: `${config.serverUrl}/api`,
  timeout: 2000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    handleDates(response.data);
    return response;
  },
  (error: any) => {
    if (
      error?.response?.status === 401 &&
      error?.response?.data === AuthorityError.AUTHENTICATION.toString()
    ) {
      window.location.href = "/login";
    }
  }
);

const isoDateFormat =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;
  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = new Date(value);
    else if (typeof value === "object") handleDates(value);
  }
}

export { axiosInstance };
