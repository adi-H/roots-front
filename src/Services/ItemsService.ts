import { Item, ItemToBorrow } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class ItemsService {
  public static async getItemsList(ownerId: number) {
    return (await axiosInstance.get<Item[]>(`/items/owner/${ownerId}`)).data;
  }

  public static async deleteItem(itemIdToDelete: number) {
    await axiosInstance.delete(`/items/${itemIdToDelete}`);
  }

  public static async createItem(itemToCreate: Item): Promise<Item> {
    return (await axiosInstance.post<Item>(`/items`, itemToCreate)).data;
  }

  public static async editItem(itemToEdit: Item) {
    await axiosInstance.put<Item>(`/items`, itemToEdit);
  }

  public static async borrowItem(itemToBorrom: ItemToBorrow) {
    await axiosInstance.post<ItemToBorrow>(`/items/borrow`, itemToBorrom);
  }
}
