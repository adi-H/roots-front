import { Recipient } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class RecipientService {
  public static async getAll() {
    return (await axiosInstance.get<Recipient[]>("/recipient")).data;
  }
}
