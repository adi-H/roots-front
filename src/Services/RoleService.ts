import { Role } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class RoleService {
  public static async getAll() {
    return (await axiosInstance.get<Role[]>("/role")).data;
  }
}
