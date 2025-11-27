import type { JSX } from "react";
import type { IBaseShape, IDraggable, IPosition, TShapeTypes } from "types";

export abstract class BaseShape implements IBaseShape, IDraggable {
  private static idCounter: number = 0;

  public id: number;
  public color: string;
  public position: IPosition;
  public size: number;
  public type: TShapeTypes;
  public isDraggable: boolean;
  public zIndex:number

  constructor(
    type: TShapeTypes,
    position: IPosition,
    size: number,
    color: string
  ) {
    this.id = BaseShape.idCounter++;
    this.color = color;
    this.position = position;
    this.size = size;
    this.type = type;
    this.isDraggable = false;
    this.zIndex = 0
  }

  public abstract render(): JSX.Element;

  public move(newPosition: IPosition): void {
    this.position = newPosition;
  }

  public resize(newSize: number): void {
    this.size = newSize;
  }

  public changeColor(newColor: string): void {
    this.color = newColor;
  }

  public startDrag(): void {
    this.isDraggable = true;
  }

  public endDrag(): void {
    this.isDraggable = false;
  }

public changeIndex(direction: "up" | "down"): number {
  this.zIndex += direction === 'up' ? 1 : -1;
  return this.zIndex;
}
}
