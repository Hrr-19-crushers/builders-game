import { TileType, Tile } from './interfaces';

export const testLayout: Tile[][] = [
  [
    {passable: false, type: TileType.rock},
    {passable: false, type: TileType.rock},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt}
  ],
  [
    {passable: false, type: TileType.rock},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt},
    {passable: false, type: TileType.water},
    {passable: true, type: TileType.dirt}
  ],
  [
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt}
  ],
  [
    {passable: true, type: TileType.dirt},
    {passable: false, type: TileType.water},
    {passable: true, type: TileType.dirt},
    {passable: true, type: TileType.dirt},
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