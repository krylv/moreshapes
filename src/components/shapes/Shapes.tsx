import type { IPosition } from "types";
import { BaseShape } from "./BaseShape";
import type { JSX } from "react";

export class Square extends BaseShape {
  constructor(position: IPosition, size: number, color: string) {
    super("square", position, size, color);
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          position: "absolute",
          left: `${this.position.x}px`,
          top: `${this.position.y}px`,
          width: `${this.size}px`,
          height: `${this.size}px`,
          backgroundColor: this.color,
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
        style={{
          position: "absolute",
          left: `${this.position.x}px`,
          top: `${this.position.y}px`,
          width: `${this.size}px`,
          height: `${this.size}px`,
          backgroundColor: this.color,
          borderRadius: "50%",
        }}
      />
    );
  }
}
