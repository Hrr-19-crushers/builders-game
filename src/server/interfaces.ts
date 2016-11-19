import { Board } from './board';

export interface Location {
  x: number;
  y: number;
}

export enum TileType {
  cliff, dirt, grass, rock, sand, tree, water
}

export interface Tile {
  passable: boolean,
  scenario?: any,
  type?: TileType,
}