import type { IPosition, TDraggableShape } from "@/types";

export interface IMagnetizm {
  applyMagnetism(
    draggedShape: TDraggableShape,
    newPosition: IPosition,
    allShapes: TDraggableShape[]
  ): { position: IPosition };
}
