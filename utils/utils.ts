export const ROWS = 30;
export const COLS = 50;

export const createEmptyGrid = () => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

// Note: Origin = [0, 0]
export const DIRECTIONS = [
  [0, 1], // Right
  [1, 1], // Down-Right
  [1, 0], // Down
  [1, -1], // Down-Left
  [0, -1], // Left
  [-1, -1], // Up-Left
  [-1, 0], // Up
  [-1, 1], // Up-Right
];

export interface Rule {
  label: string;
  description: string;
}

export const RULES: Rule[] = [
  {
    label: "Birth rule:",
    description:
      "An empty, or “dead,” cell with precisely three “live” neighbors (full cells) becomes live.",
  },
  {
    label: "Death rule:",
    description:
      "A live cell with zero or one neighbors dies of isolation; a live cell with four or more neighbors dies of overcrowding.",
  },
  {
    label: "Survival rule:",
    description: "A live cell with two or three neighbors remains alive.",
  },
];
