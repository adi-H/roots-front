import { Class } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class ClassService {
  public static async getAll() {
    return (await axiosInstance.get<Class[]>("/class")).data;
  }
}
