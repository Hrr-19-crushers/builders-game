import { Tile } from './interfaces';

export const testLayout: Tile[][] = [
  [{passable: false}, {passable: false}, {passable: true}, {passable: true}, {passable: true}],
  [{passable: false}, {passable: true}, {passable: true}, {passable: false}, {passable: true}],
  [{passable: true}, {passable: true}, {passable: true}, {passable: true}, {passable: true}],
  [{passable: true}, {passable: false}, {passable: true}, {passable: true}, {passable: false}],
  [{passable: true}, {passable: true}, {passable: true}, {passable: false}, {passable: false}]
];