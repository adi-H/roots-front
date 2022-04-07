import Swal from "sweetalert2";
import { Items } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class ItemsService {
  public static async getItemsList(ownerId: number) {
    return (await axiosInstance.get<Items[]>(`/items/owner/${ownerId}`)).data;
  }

  public static async usingItemes(itemId: number, usedBy: any, quantity: number, description: string) {
    try {
      // TODO: validations
      await axiosInstance.post(`/items/use`, {itemId, usedBy, quantity, description})
    } catch (error) {
      Swal.fire({ title: "קרתה שגיאה בשליחת הבקשה", icon: "error" });
    }
  }

  public static async deleteUsage(itemId: number) {
    try {
      // TODO: validations
      alert(itemId)
      await axiosInstance.delete(`/items/${itemId}`, {})
    } catch (error) {
      Swal.fire({ title: "קרתה שגיאה בשליחת הבקשה", icon: "error" });
    }
  }

  public static async createItem(ownerId: number, quantity: number, name: string) {
    try {
      // TODO: validations
      await axiosInstance.put(`/items/create`, {owner: ownerId, quantity, name})
    } catch (error) {
      Swal.fire({ title: "קרתה שגיאה בשליחת הבקשה", icon: "error" });
    }
  }
}
