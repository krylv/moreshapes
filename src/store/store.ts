import { create } from "zustand";
import type { TDraggableShape } from "../types";

interface StoreState {
    shapes:TDraggableShape[]
    selectedShape:TDraggableShape | null
    addShape:(shape:TDraggableShape) => void
    selectShape:(shape:TDraggableShape | null) => void
}
export const useShapeStore = create<StoreState>((set) => ({
    shapes:[],
    selectedShape:null,
    addShape(shape) {
        set((state) => ({shapes:[...state.shapes,shape]}))
    },
    selectShape(shape) {
        set(() => ({selectedShape:shape}))
    },
}))