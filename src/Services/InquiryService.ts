import { Inquiry, Recipient } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class InquiryService {
  public static async send(inquiry: Inquiry) {
    return (await axiosInstance.post("/inquiry", inquiry));
  }
}
