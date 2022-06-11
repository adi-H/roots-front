import { toast } from "react-toastify";
import { Items } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class ItemsService {
  public static async getItemsList(ownerId: number) {
    return (await axiosInstance.get<Items[]>(`/items/owner/${ownerId}`)).data;
  }

  public static async usingItemes(
    itemId: number,
    usedBy: any,
    quantity: number,
    description: string
  ) {
    try {
      // TODO: validations
      await axiosInstance.post(`/items/use`, {
        itemId,
        usedBy,
        quantity,
        description,
      });
    } catch (error) {
      toast.error("אירעה שגיאה בשליחת הבקשה");
    }
  }

  public static async deleteUsage(itemId: number) {
    try {
      // TODO: validations
      await axiosInstance.delete(`/items/usage/${itemId}`, {});
    } catch (error) {
      toast.error("אירעה שגיאה בשליחת הבקשה");
    }
  }

  public static async deleteItem(itemId: number) {
    try {
      // TODO: validations
      await axiosInstance.delete(`/items/${itemId}`, {});
    } catch (error) {
      toast.error("אירעה שגיאה בשליחת הבקשה");
    }
  }

  public static async createItem(
    ownerId: number,
    quantity: number,
    name: string
  ) {
    try {
      // TODO: validations, potential bug: when adding an item with the same name, it is returned and added to array,
      // a migration between the two identical items should be made
      return (
        await axiosInstance.put<Items>(`/items/create`, {
          owner: ownerId,
          quantity,
          name,
        })
      ).data;
    } catch (error) {
      toast.error("אירעה שגיאה בשליחת הבקשה");
    }
  }
}
