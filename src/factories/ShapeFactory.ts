import { Circle, Square } from "../components/shapes/Shapes";
import type { TDraggableShape, TShapeTypes } from "../types";
import type { IShapeFactoryConfig } from "./ShapeFactoryTypes";

export class ShapeFactory {

    static createShape(type:TShapeTypes,config:IShapeFactoryConfig):TDraggableShape {
        switch(type) {
            case 'circle': 
                return new Circle({x:100,y:100},config.size,config.color)
            case 'square':
                return new Square({x:100,y:100},config.size,config.color)
        }
    }

}