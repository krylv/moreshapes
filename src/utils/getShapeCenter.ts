import type { IBaseShape, IPosition } from "@/types";

export const getCenter = (shape: IBaseShape): IPosition => {
  return {
    x: shape.position.x + shape.size / 2,
    y: shape.position.y + shape.size / 2,
  };
};
