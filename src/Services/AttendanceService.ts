import { Attendance, Class, Unit } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class AttendanceService {
  public static async addAttendances(attendances: Attendance[]) {
    return await axiosInstance.post("/attendance", attendances);
  }

  public static async clear() {
    return await axiosInstance.get("/attendance/clear");
  }

  public static async delete(id: string) {
    return await axiosInstance.delete(`/attendance/${id}`);
  }
}
