import type { IPosition, TDraggableShape } from "@/types";
import type { Dispatch, RefObject, SetStateAction } from "react";

export interface IContextMenu {
  position: IPosition;
  shape: TDraggableShape;
}

export interface IContextMenuProps {
  setContextMenu: Dispatch<SetStateAction<IContextMenu | null>>;
  contextRef: RefObject<HTMLDivElement | null>;
  contextMenu: IContextMenu | null;
}
