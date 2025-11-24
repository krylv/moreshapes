import type { JSX } from "react";
import type { IPosition } from "types/types";

export abstract class BaseShape implements IBaseShape,IDraggable {
	private static idCounter:number = 0
	
	public id:number
	public color:string
	public position: IPosition;
	public size: number;
	public type: TShapeTypes;
	public isDraggable: boolean;

	constructor(type:TShapeTypes,position:IPosition,size:number,color:string) {
		this.id = BaseShape.idCounter++
		this.color = color
		this.position = position
		this.size = size
		this.type = type
		this.isDraggable = false
	}

	public abstract render():JSX.Element

	public move(newPosition:IPosition):void {
		this.position = newPosition
	}

	public resize (newSize:number):void {
		this.size = newSize
	}

	startDrag(): void {
		this.isDraggable = true
	}

	endDrag(): void {
		this.isDraggable = false
	}
	
}