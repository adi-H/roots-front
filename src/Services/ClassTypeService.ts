import { Class, ClassType } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class ClassTypeService {
  public static async getAll() {
    return (await axiosInstance.get<ClassType[]>("/classType")).data;
  }
}
