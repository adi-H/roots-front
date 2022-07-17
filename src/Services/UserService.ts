import { User } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class UserService {
  public static async getUsersByPlugaId(plugaId: number) {
    return (await axiosInstance.get<User[]>(`/unit/allUsersInCompany/${plugaId}`)).data;
  }

  public static async updateRole(userId: number, roleId: number) {
    await axiosInstance.put(`/user/updateRole`, { userId, roleId });
  }
}
