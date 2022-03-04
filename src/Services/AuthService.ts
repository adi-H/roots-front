import { AxiosError } from "axios";
import { Class } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class AuthService {
  public static async login(userId: string, password: string) {
    try {
      await axiosInstance.post("/auth/login", { userId, password });
      return true;
    } catch (e) {
      return false;
    }
  }
}
