interface Terrain {
  passable: boolean
}

export const Layout: Terrain[][] = [
  [{passable: false}, {passable: false}, {passable: true}, {passable: true}, {passable: true}],
  [{passable: false}, {passable: true}, {passable: true}, {passable: false}, {passable: true}],
  [{passable: true}, {passable: true}, {passable: true}, {passable: true}, {passable: true}],
  [{passable: true}, {passable: false}, {passable: true}, {passable: true}, {passable: false}],
  [{passable: true}, {passable: true}, {passable: true}, {passable: false}, {passable: false}]
]; 