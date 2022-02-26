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
