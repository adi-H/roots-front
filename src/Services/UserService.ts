import { Quiz } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class UserService {
  public static async updateRole(userId: number, roleId: number) {
    await axiosInstance.put(`/user/updateRole`, { userId, roleId });
  }
}
