import { Board } from './board';
import { Turn } from '../client/reducers/gameReducer';

export interface Location {
  x: number;
  y: number;
}

export enum TileType {
  cliff, dirt, grass, rock, sand, tree, water, bush, statue, hollow
}

export interface Tile {
  passable: boolean,
  turn?: Turn,
  type?: TileType,
}

export interface CharacterState {
  charId: number,
  charName: string,
  charLocation: Location,
  charHealth: number
}

export interface BoardState {
  boardLayout: Tile[][]
}

export interface GameState {
  gameLayout: Tile[][],
  gameBoard: Board,
  gameCharacter: CharacterState,
  gameTurnActive: boolean,
  gameCurrentTurn: Turn
}