import { useCallback, useRef, useState, type MouseEvent } from "react";
import type { IBaseShape, IDraggable } from "types";
import styles from "./ShapeRenderer.module.css";
import { useShapeStore } from "@/store";
import { ContextMenu, type IContextMenu } from "../ContextMenu";
import { BaseShape } from "@/lib";
import { useClickOutside } from "@/hooks";

export const ShapeRenderer = () => {
  const { selectedShape, shapes, selectShape } = useShapeStore();

  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<IContextMenu | null>(null);

  const handleMouseDown = (shape: IBaseShape & IDraggable, e: MouseEvent) => {
    if (e.button === 0) {
      shape.startDrag();
      selectShape(shape.id);
      setContextMenu(null);
      const targetChildren = e.currentTarget.children.namedItem(
        "shape"
      ) as HTMLElement;

      targetChildren.style.zIndex = "9999";
    }
    if (e.button === 2) {
      e.preventDefault();
      selectShape(shape.id);

      setContextMenu({
        position: {
          x: shape.position.x + shape.size / 2,
          y: shape.position.y + shape.size / 2,
        },
        shape: shape,
      });
    }
  };

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!selectedShape || !selectedShape.isDraggable) return;
      event.preventDefault();
      event.stopPropagation();
      const newPosition = {
        x: event.clientX - selectedShape.size / 2,
        y: event.clientY - selectedShape.size / 2,
      };

      if (selectedShape instanceof BaseShape) {
        selectedShape.move(newPosition);
        selectShape(selectedShape.id);
      }
    },
    [selectShape, selectedShape]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (selectedShape) {
        selectedShape.endDrag();
        selectShape(null);
        const targetChildren = e.currentTarget.children.namedItem(
          "shape"
        ) as HTMLElement;

        targetChildren.style.zIndex = "5";
      }
    },
    [selectedShape, selectShape]
  );

  useClickOutside(contextMenuRef, () => {
    if (!selectedShape) {
      setContextMenu(null);
    }
  });

  if (!shapes) return null;
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onMouseMove={(e) => handleMouseMove(e)}
      className={styles.shape_container}
    >
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={
            selectedShape?.id === shape.id ? styles.grabbing : styles.grab
          }
          onMouseDown={(e) => handleMouseDown(shape, e)}
          onMouseUp={(e) => handleMouseUp(e)}
        >
          {shape.render()}
        </div>
      ))}
      {contextMenu && (
        <ContextMenu
          contextMenu={contextMenu}
          contextRef={contextMenuRef}
          setContextMenu={setContextMenu}
        />
      )}
    </div>
  );
};
