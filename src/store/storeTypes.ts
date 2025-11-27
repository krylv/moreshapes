import type { TDraggableShape } from "@/types";

export interface IStoreState {
  shapes: TDraggableShape[];
  selectedShape: TDraggableShape | null;
  addShape: (shape: TDraggableShape) => void;
  selectShape: (shapeId: number | null) => void;
  changeColor: (shape: TDraggableShape, newColor: string) => void;
  changeSize: (shape: TDraggableShape, newSize: number) => void;
  removeShape: (shapeId: number) => void;
  changeIndex:(shape:TDraggableShape,type:'up' | 'down') => void 
}
