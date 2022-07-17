export interface Class {
  id: number;
  name: string;
  building: Building;
  owner: Unit;
  type: ClassType;
}

export interface Role {
  id: number;
  name: string;
}

export interface Quiz {
  id: number;
  name: string;
  url: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  team: Unit;
  role: Role;
  attendance: Attendance;
}

export interface ClassAssign {
  id: number;
  title: string;
  assignedClass: Class;
  startDate: Date;
  endDate: Date;
  createdBy: User;
  isApproved: boolean;
}

export interface Building {
  id: number;
  name: string;
}

export interface Unit {
  id: number;
  name: string;
  parent: Unit;
  children: Unit[];
  teamCadets?: User[];
}

export interface Url {
  id: number;
  name: string;
  url: string;
}

export interface Item {
  id: number;
  name: string;
  totalQuantity: number;
  unUseableQuantity: number;
  description: string;
  owner: Unit;
  usedBy: Unit;
  borrowedByMe: ItemToBorrow[];
}

export interface ItemToBorrow {
  itemId: number;
  user: number;
  quantity: number;
  description: string;
}

export interface Attendance {
  userId: number;
  reason: string | null;
  inAttendance: boolean | null;
}
export interface ClassType {
  id: number;
  name: string;
}

export interface Recipient {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
}

export interface Inquiry {
  id?: number;
  to: Recipient;
  from: User;
  title: string;
  content: string;
}
