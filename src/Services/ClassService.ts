import { Class } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class ClassService {
  public static async getAll() {
    return (await axiosInstance.get<Class[]>("/class")).data;
  }

  public static getAvailableClasses = async (
    startDate: Date,
    endDate: Date,
    classTypeId: number
  ) => {
    return (
      await axiosInstance.get<Class[]>(
        `/class/available/${startDate}/${endDate}/${classTypeId}`
      )
    ).data;
  };
}
