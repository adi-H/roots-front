import { Attendance } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class AttendanceService {
  public static async updateAttendances(attendances: Attendance[]) {
    return await axiosInstance.post("/attendance", attendances);
  }

  public static async clear() {
    // return await axiosInstance.get("/attendance/clear");
  }
}
