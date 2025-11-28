import { useShapeStore } from "@/store";
import type { TDraggableShape } from "@/types";
import { useState, type ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { IContextMenuProps } from "./ContextMenuTypes";
import styles from "./ContextMenu.module.css";

export const ContextMenu = ({
  setContextMenu,
  contextRef,
  contextMenu,
}: IContextMenuProps) => {
  const { changeColor, changeSize, removeShape,changeIndex } = useShapeStore();
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [visibleInput, setVisibleInput] = useState<"color" | "size" | null>(
    null
  );
  const debouncedChangeColor = useDebouncedCallback(
    (shape: TDraggableShape, e: ChangeEvent<HTMLInputElement>) => {
      changeColor(shape, e.target.value);
    },
    300
  );
  const debouncedChangeSize = useDebouncedCallback(
    (shape: TDraggableShape, value: number) => {
      if (value <= 14) {
        setSizeError("*Больше 14");
        return;
      }
      if (value > window.innerHeight || value > window.innerWidth) {
        setSizeError("Экран меньше фигуры");
        return;
      }

      setSizeError(null);
      changeSize(shape, value);
      setContextMenu((prev) =>
        prev
          ? {
              ...prev,
              position: {
                x: shape.position.x + value / 2,
                y: shape.position.y + value / 2,
              },
            }
          : null
      );
    },
    300
  );

  const handleRemoveShape = (shapeId: number) => {
    removeShape(shapeId);
    setContextMenu(null);
    setVisibleInput(null);
  };

  const handleChangeIndex = (shape:TDraggableShape,type:'up' | 'down') => {
    changeIndex(shape,type)
    
  }

  if (!contextMenu) return;
  return (
    <div
      ref={contextRef}
      style={{
        left: `${contextMenu?.position.x}px`,
        top: `${contextMenu?.position.y}px`,
      }}
      className={styles.context_menu}
    >
      <div
        onClick={() => setVisibleInput("color")}
        className={styles.context_item}
      >
        <p>Изменить цвет</p>
        {visibleInput === "color" && (
          <input
            className={styles.color_input}
            type="color"
            defaultValue={contextMenu?.shape.color}
            onChange={(e) => debouncedChangeColor(contextMenu?.shape, e)}
          />
        )}
      </div>
      <div
        className={styles.context_item}
        onClick={() => setVisibleInput("size")}
      >
        <p>Изменить размер</p>
        {visibleInput === "size" && (
          <div className={styles.size_container}>
            <input
              name="size"
              className={styles.size_input}
              defaultValue={contextMenu.shape.size}
              onChange={(e) =>
                debouncedChangeSize(contextMenu.shape, Number(e.target.value))
              }
              type="number"
            />
            {sizeError && <p className={styles.error_text}>{sizeError}</p>}
          </div>
        )}
      </div>
      <div
        className={styles.context_item}
        onClick={() => handleChangeIndex(contextMenu.shape,'up')}
      >
        <p>Поднять на слой выше</p>
      </div>
      <div
        className={styles.context_item}
        onClick={() => handleChangeIndex(contextMenu.shape,'down')}
      >
        <p style={{wordBreak:'keep-all'}}>Опустить на слой ниже</p>
      </div>
      <div
        className={styles.context_item}
        onClick={() => handleRemoveShape(contextMenu?.shape.id)}
      >
        <p>Удалить элемент</p>
      </div>
    </div>
  );
};
