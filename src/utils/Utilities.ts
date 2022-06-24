import { Roles } from "../enums/Roles";
import { User } from "../types/types";

export class Utilities {
  public static getFormattedDate(date: Date) {
    return `${this.addZ(date.getDate())}/${this.addZ(
      date.getMonth() + 1
    )}/${this.addZ(date.getFullYear())}`;
  }

  public static getFormattedTime(date: Date) {
    return `${this.addZ(date.getHours())}:${this.addZ(date.getMinutes())}`;
  }

  public static addZ(n: number) {
    return n < 10 ? "0" + n : "" + n;
  }

  public static getFullName(user: User) {
    return `${user.firstName} ${user.lastName}`;
  }
}
