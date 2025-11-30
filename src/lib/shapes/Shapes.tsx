import type { IPosition, IShapeDisplayConfig } from "types";
import type { JSX } from "react";
import { BaseShape } from "./base/BaseShape";
import styles from './Shapes.module.css'

export class Square extends BaseShape {
  constructor(position: IPosition, size: number, color: string) {
    super("square", position, size, color);
  }

  public render(displayConfig:IShapeDisplayConfig): JSX.Element {
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
          zIndex: this.isDraggable ? "9999" : this.zIndex,
        }}
      >
        <div className={styles.shape_settings}>
          {displayConfig.showLayer && <p className={styles.item_class}>{`zIndex:${this.zIndex}`}</p>}
        </div>
      </div>
    );
  }
}

export class Circle extends BaseShape {
  constructor(position: IPosition, size: number, color: string) {
    super("circle", position, size, color);
  }

  public render(displayConfig:IShapeDisplayConfig): JSX.Element {
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
          zIndex: this.isDraggable ? "9999" : this.zIndex,
        }}
      >
        <div className={styles.shape_settings}>
          {displayConfig.showLayer && <p className={styles.item_class}>{`zIndex:${this.zIndex}`}</p>}
        </div>
      </div>
    );
  }
}
