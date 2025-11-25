import type { IPosition, TDraggableShape } from "@/types";
import { getCenter, getShapeDistance } from "@/utils";
import type { IMagnetizm } from "./MagnetizmTypes";

export class Magnetizm implements IMagnetizm {
  private magnetizmRadius: number;

  constructor(radius: number = 30) {
    this.magnetizmRadius = radius;
  }

  public applyMagnetism(
    draggedShape: TDraggableShape,
    newPosition: IPosition,
    allShapes: TDraggableShape[]
  ): { position: IPosition; snappedTo: TDraggableShape | null } {
    const draggedCenter: IPosition = {
      x: newPosition.x + draggedShape.size / 2,
      y: newPosition.y + draggedShape.size / 2,
    };

    const closestShape = this.findClosestShape(
      draggedShape,
      draggedCenter,
      allShapes
    );

    if (closestShape) {
      const closestCenter: IPosition = getCenter(closestShape);

      const snappedPosition: IPosition = {
        x: closestCenter.x - draggedShape.size / 2,
        y: closestCenter.y - draggedShape.size / 2,
      };

      return {
        position: snappedPosition,
        snappedTo: closestShape,
      };
    }
    return { position: newPosition, snappedTo: null };
  }

  private findClosestShape(
    draggedShape: TDraggableShape,
    draggedCenter: IPosition,
    allShapes: TDraggableShape[]
  ): TDraggableShape | null {
    let closestShape: TDraggableShape | null = null;
    let minDistance = Infinity;

    for (const shape of allShapes) {
      if (shape.id === draggedShape.id) continue;

      const shapeCenter = getCenter(shape);

      const distance = getShapeDistance(draggedCenter, shapeCenter);

      if (distance < this.magnetizmRadius && distance < minDistance) {
        minDistance = distance;
        closestShape = shape;
      }
    }

    return closestShape;
  }
}
