import { Unit } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class UnitService {
  public static async getAll() {
    return (await axiosInstance.get<Unit[]>("/unit")).data;
  }
}
