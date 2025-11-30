import { useCallback, useMemo, useRef, useState, type MouseEvent } from "react";
import type { TDraggableShape } from "types";
import styles from "./ShapeRenderer.module.css";
import { useShapeStore } from "@/store";
import { ContextMenu, type IContextMenu } from "../ContextMenu";
import { BaseShape, Magnetizm } from "@/lib";
import { useClickOutside } from "@/hooks";

export const ShapeRenderer = () => {
  const { selectedShape, shapes, selectShape,displayConfig } = useShapeStore();

  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<IContextMenu | null>(null);
  const magnetizm = useMemo(() => new Magnetizm(), []);

  const handleMouseDown = (
    shape: TDraggableShape,
    e: MouseEvent<HTMLElement>
  ) => {
    selectShape(shape.id);
    switch (e.button) {
      case 0:
        shape.startDrag();
        setContextMenu(null);
        break;
      case 2:
        e.preventDefault();
        setContextMenu({
          position: {
            x: shape.position.x + shape.size / 2,
            y: shape.position.y + shape.size / 2,
          },
          shape: shape,
        });
        break;
      default:
        return;
    }
  };

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!selectedShape || !selectedShape.isDraggable) return;

      const newPosition = {
        x: event.clientX - selectedShape.size / 2,
        y: event.clientY - selectedShape.size / 2,
      };

      const { position: magnetizedPosition } = magnetizm.applyMagnetism(
        selectedShape,
        newPosition,
        shapes
      );

      if (selectedShape instanceof BaseShape) {
        selectedShape.move(magnetizedPosition);
        selectShape(selectedShape.id);
      }
    },
    [selectShape, selectedShape, magnetizm, shapes]
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
      onMouseLeave={handleMouseUp}
      id="here"
      className={styles.shape_container}
    >
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={
            selectedShape?.id === shape.id ? styles.grabbing : styles.grab
          }
          onMouseDown={(e) => handleMouseDown(shape, e)}
        >
          {shape.render(displayConfig)}
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
