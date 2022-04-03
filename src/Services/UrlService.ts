import { Url } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class UrlService {
  public static async getBroshUrl() {
    return (await axiosInstance.get<Url>("/url/brosh")).data;
  }
}
