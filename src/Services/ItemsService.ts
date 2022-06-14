
import { toast } from "react-toastify";
import { Items } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class ItemsService {
  public static async getItemsList(ownerId: number) {
    return (await axiosInstance.get<Items[]>(`/items/owner/${ownerId}`)).data;
  }
  
  public static async deleteItem(itemId: number) {
    await axiosInstance.delete(`/items/${itemId}`, {});
  }

  public static async createItem(ownerId: number, item: any) {
    await axiosInstance.post<Items>(`/items/create`, { owner: ownerId, item })
  }
}
