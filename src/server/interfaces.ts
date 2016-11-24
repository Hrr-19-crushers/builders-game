import { Board } from './board';
import { Turn } from '../client/reducers/gameReducer';

export interface Location {
  x: number;
  y: number;
}

export interface Tile {
  p: boolean, // passable
  t: number, // tile art
  d?: boolean, // door
  e?: boolean, // enemy
  f?: boolean, // fairy
  h?: boolean, // heart
  i?: number // triforce piece
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