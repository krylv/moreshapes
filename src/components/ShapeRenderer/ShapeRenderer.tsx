import { useCallback, useRef, useState, type MouseEvent } from "react";
import type { IBaseShape, IDraggable, IPosition, TDraggableShape } from "types";
import { BaseShape } from "../shapes/BaseShape";
import { useShapeStore } from "../../store";
import styles from "./ShapeRenderer.module.css";
import { useClickOutside } from "../../hooks";

interface IContextMenu {
  position: IPosition;
  shape: TDraggableShape;
}

export const ShapeRenderer = () => {
  const { selectedShape, shapes, selectShape, changeColor } = useShapeStore();
  const [contextMenu, setContextMenu] = useState<IContextMenu | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (shape: IBaseShape & IDraggable, e: MouseEvent) => {
    if (e.button === 0) {
      shape.startDrag();
      selectShape(shape);
      setContextMenu(null);
    }
    if (e.button === 2) {
      e.preventDefault();

      setContextMenu({
        position: {
          x: shape.position.x + shape.size / 2,
          y: shape.position.y + shape.size / 2,
        },
        shape: shape,
      });
      selectShape(shape);
    }
  };

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!selectedShape || !selectedShape.isDraggable) return;

      const newPosition = {
        x: event.clientX - selectedShape.size / 2,
        y: event.clientY - selectedShape.size / 2,
      };

      if (selectedShape instanceof BaseShape) {
        selectedShape.move(newPosition);
        selectShape(selectedShape);
      }
    },
    [selectShape, selectedShape]
  );

  const handleMouseUp = useCallback(() => {
    if (selectedShape) {
      selectedShape.endDrag();
      selectShape(null);
    }
  }, [selectedShape, selectShape]);

  useClickOutside(contextMenuRef, () => {
    if (!selectedShape) {
      setContextMenu(null);
    }
  });

  if (!shapes) return null;
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => handleMouseMove(e)}
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      {shapes.map((shape) => (
        <div
          key={shape.id}
          style={{
            cursor: selectedShape?.id === shape.id ? "grabbing" : "grab",
          }}
          onMouseDown={(e) => handleMouseDown(shape, e)}
        >
          {shape.render()}
        </div>
      ))}
      {contextMenu && (
        <div
          ref={contextMenuRef}
          style={{
            left: `${contextMenu.position.x}px`,
            top: `${contextMenu.position.y}px`,
          }}
          className={styles.context_menu}
        >
          <div className={styles.context_item}>
            <p>Изменить цвет</p>
            <input
              style={{
                position: "absolute",
                opacity: 0,
                inset: 0,
                width: "100%",
                height: "100%",
              }}
              type="color"
              onInput={(e) =>
                changeColor(contextMenu.shape, e.currentTarget.value)
              }
            />
          </div>
          <button className={styles.context_item}>Изменить размер</button>
        </div>
      )}
    </div>
  );
};
