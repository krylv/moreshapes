import type { JSX } from "react";

export interface IBaseShape {
  id: number;
  type: TShapeTypes;
  position: IPosition;
  size: number;
  move(newPosition: IPosition): void;
  resize(newSize: number): void;
  render(displayConfig:IShapeDisplayConfig): JSX.Element;
}

export interface IVisualSettings {
  color: string;
  zIndex: number;
  changeColor(newColor: string): void;
  changeIndex(direction: 'up' | 'down'): number;
}

export interface IDraggable {
  isDraggable: boolean;
  startDrag(): void;
  endDrag(): void;
}

export interface IShapeDisplayConfig  {
  showLayer?:boolean
}

export interface IPosition {
  x: number;
  y: number;
}

export type TShapeTypes = "circle" | "square";

export type TVisualShape = IBaseShape & IVisualSettings;
export type TDraggableShape = IBaseShape & IVisualSettings & IDraggable;