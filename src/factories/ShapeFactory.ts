import { Circle, Square } from "@/lib";
import type { IShapeFactoryConfig } from "./ShapeFactoryTypes";
import type { TDraggableShape, TShapeTypes } from "@/types";

export class ShapeFactory {
  static createShape(
    type: TShapeTypes,
    config: IShapeFactoryConfig
  ): TDraggableShape {
    switch (type) {
      case "circle":
        return new Circle(
          config.position
            ? config.position
            : {
                x: window.innerWidth / 2 - config.size / 2,
                y: window.innerHeight / 2 - config.size / 2,
              },
          config.size,
          config.color
        );
      case "square":
        return new Square(
          config.position
            ? config.position
            : {
                x: window.innerWidth / 2 - config.size / 2,
                y: window.innerHeight / 2 - config.size / 2,
              },
          config.size,
          config.color
        );
    }
  }
}
