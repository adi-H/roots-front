import { ClassAssign } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class ClassAssignService {
  public static async getWeekSchedule(date: Date) {
    return (
      await axiosInstance.get<ClassAssign[]>(
        `/classAssign/week/${date.toString()}`
      )
    ).data;
  }

  public static async getDaySchedule(date: Date) {
    return (
      await axiosInstance.get<ClassAssign[]>(
        `/classAssign/day/${date.toString()}`
      )
    ).data;
  }

  public static async getRequests() {
    return (await axiosInstance.get<ClassAssign[]>("/classAssign/requests"))
      .data;
  }

  public static async acceptRequest(classAssignId: number) {
    try {
      await axiosInstance.post("/classAssign/accept", { classAssignId });
      return true;
    } catch (e) {
      return false;
    }
  }

  public static async rejectRequest(classAssignId: number) {
    try {
      await axiosInstance.post("/classAssign/reject", { classAssignId });
      return true;
    } catch (e) {
      return false;
    }
  }

  public static async addClassAssign(classAssign: ClassAssign) {
    try {
      await axiosInstance.post("/classAssign", classAssign);
      return true;
    } catch (e) {
      return false;
    }
  }
}
