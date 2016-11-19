export interface Location {
  x: number;
  y: number;
}

export interface Tile {
  passable: boolean,
  type?: string,
  scenario?: any
}