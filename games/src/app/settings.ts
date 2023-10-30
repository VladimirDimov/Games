export interface Settings {
  tetris: {
    board: {
      width: number;
      height: number;
    };
    interval: number;
  };
}

export const settings: Settings = {
  tetris: {
    board: {
      width: 18,
      height: 18,
    },
    interval: 1000,
  },
};
