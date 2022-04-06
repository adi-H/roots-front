import { Class, Unit } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class AttendanceService {
  public static async clear() {
    return (await axiosInstance.get<Unit>("/attendance/clear")).data;
  }
}
