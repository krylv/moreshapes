import type { JSX } from "react";

export interface IBaseShape {
  id: number;
  size: number;
  color: string;
  zIndex:number
  position: IPosition;
  type: TShapeTypes;
  move(newPosition: IPosition): void;
  changeColor(newColor: string): void;
  resize(newSize: number): void;
  render(): JSX.Element;
  changeIndex(direction:'up' | 'down'):number
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
