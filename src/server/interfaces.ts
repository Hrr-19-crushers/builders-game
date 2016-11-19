import { Board } from './board';

export interface Location {
  x: number;
  y: number;
}

enum TileType {
  cliff, dirt, grass, rock, sand, tree
}

export interface Tile {
  passable: boolean,
  scenario?: any
  type?: TileType,
}