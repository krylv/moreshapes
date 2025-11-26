import type { IPosition } from "types";
import type { JSX } from "react";
import { BaseShape } from "./base/BaseShape";

export class Square extends BaseShape {
  constructor(position: IPosition, size: number, color: string) {
    super("square", position, size, color);
  }

  public render(): JSX.Element {
    return (
      <div
        id="shape"
        style={{
          position: "absolute",
          left: `${this.position.x}px`,
          top: `${this.position.y}px`,
          width: `${this.size}px`,
          height: `${this.size}px`,
          backgroundColor: this.color,
          boxShadow: this.isDraggable ? "0 0 0 0 rgba(0, 150, 255, 0.7)" : "",
          animation: this.isDraggable ? "pulse 1s infinite" : "",
          zIndex: this.isDraggable ? "9999" : "0",
        }}
      ></div>
    );
  }
}

export class Circle extends BaseShape {
  constructor(position: IPosition, size: number, color: string) {
    super("circle", position, size, color);
  }

  public render(): JSX.Element {
    return (
      <div
        id="shape"
        style={{
          position: "absolute",
          left: `${this.position.x}px`,
          top: `${this.position.y}px`,
          width: `${this.size}px`,
          height: `${this.size}px`,
          backgroundColor: this.color,
          boxShadow: this.isDraggable ? "0 0 0 0 rgba(0, 150, 255, 0.7)" : "",
          animation: this.isDraggable ? "pulse 1s infinite" : "",
          borderRadius: "50%",
          zIndex: this.isDraggable ? "9999" : "0",
        }}
      />
    );
  }
}
