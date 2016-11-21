import { TileType, Tile } from './interfaces';
import { turns } from './gameTurns';

export const testLayout: Tile[][] = [
  [
    {passable: false, type: TileType.rock},
    {passable: false, type: TileType.rock},
    {passable: true, type: TileType.dirt, turn: turns[1]},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt}
  ],
  [
    {passable: false, type: TileType.rock},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt},
    {passable: false, type: TileType.water},
    {passable: true, type: TileType.dirt, turn: turns[2]}
  ],
  [
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt, turn: turns[0]},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt}
  ],
  [
    {passable: true, type: TileType.dirt},
    {passable: false, type: TileType.water},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt, turn: turns[5]},
    {passable: false, type: TileType.rock}
  ],
  [
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt},
    {passable: false, type: TileType.rock},
    {passable: false, type: TileType.rock}
  ]
];