export interface Class {
  id: number;
  name: string;
  building: Building;
  owner: Unit;
}

export interface Building {
  id: number;
  name: string;
}

export interface Unit {
  id: number;
  name: string;
  parent: Unit;
}

export interface User {
  id: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  team: Unit;
  role?: Role;
}

export interface Role {
  id: string;
  name: string;
}