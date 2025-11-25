import { create } from "zustand";
import type { IStoreState } from "./storeTypes";
import { persist } from "zustand/middleware";
import { ShapeFactory } from "@/factories";

export const useShapeStore = create<IStoreState>()(
  persist(
    (set) => ({
      shapes: [],

      selectedShape: null,
      addShape(shape) {
        set((state) => ({ shapes: [...state.shapes, shape] }));
      },
      selectShape(shapeId) {
        set((state) => ({
          selectedShape: state.shapes.find((s) => s.id === shapeId),
        }));
      },
      changeColor(shape, newColor) {
        shape.changeColor(newColor);
        set((state) => ({ shapes: [...state.shapes] }));
      },
      changeSize(shape, newSize) {
        shape.resize(newSize);
        set((state) => ({
          shapes: [...state.shapes],
        }));
      },
      removeShape(shapeId) {
        set((state) => ({
          shapes: state.shapes.filter((s) => s.id !== shapeId),
        }));
      },
    }),
    {
      name: "shapesData",
      partialize: (state) => ({
        shapes: state.shapes.map((shape) => ({ ...shape })),
      }),
      onRehydrateStorage() {
        return (state) => {
          if (!state) return;
          state.shapes = state.shapes.map((shape) => {
            return ShapeFactory.createShape(shape.type, { ...shape });
          });
        };
      },
    }
  )
);
