import type { JSX } from "react";

export interface IBaseShape {
  id: number;
  size: number;
  color: string;
  position: IPosition;
  type: TShapeTypes;
  move(newPosition: IPosition): void;
  changeColor(newColor: string): void;
  resize(newSize: number): void;
  render(): JSX.Element;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IDraggable {
  isDraggable: boolean;
  startDrag(): void;
  endDrag(): void;
}

export type TShapeTypes = "circle" | "square";

export type TDraggableShape = IBaseShape & IDraggable;
