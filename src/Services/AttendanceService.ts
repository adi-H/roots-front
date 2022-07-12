import { Attendance } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class AttendanceService {
  public static async updateAttendances(attendances: Attendance[]) {
    return await axiosInstance.post("/attendance", attendances);
  }

  public static async clearTeam(teamId: number) {
    return await axiosInstance.put(`/attendance/team/${teamId}/clear`);
  } 
}
