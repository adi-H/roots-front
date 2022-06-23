import { Item } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class ItemsService {
  public static async getItemsList(ownerId: number) {
    return (await axiosInstance.get<Item[]>(`/items/owner/${ownerId}`)).data;
  }

  public static async deleteItem(itemIdToDelete: number) {
    await axiosInstance.delete(`/items/${itemIdToDelete}`);
  }

  public static async createItem(itemToCreate: Item) {
    await axiosInstance.post<Item>(`/items`, itemToCreate);
  }
}
