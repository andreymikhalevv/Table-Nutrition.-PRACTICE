// src/data/rows.js
export function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Snickers", 100, 15.0, 50, 6.0),
];
