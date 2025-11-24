import { useCallback, useEffect, useState } from "react"
import type { IBaseShape, IDraggable, TDraggableShape } from "types"
import { BaseShape } from "./shapes/BaseShape"
import { useShapeStore } from "../store"

export const ShapeRenderer = () => {
	const {selectedShape,shapes,selectShape} = useShapeStore()
	console.log(shapes);
	
	const handleMouseDown = (shape:IBaseShape & IDraggable) => {
		shape.startDrag()
		selectShape(shape)
		
	}

	 const handleMouseMove = useCallback((event: MouseEvent) => {
        if (!selectedShape) return;
        
        const newPosition = {
            x: event.clientX - selectedShape.size / 2,
            y: event.clientY - selectedShape.size / 2
        };
        
        if (selectedShape instanceof BaseShape) {
            selectedShape.move(newPosition);
			selectShape(selectedShape);
        }
        
        
    }, [selectedShape])

    const handleMouseUp = useCallback(() => {
        if (selectedShape) {
            selectedShape.endDrag(); 
            selectShape(null);
        }
    }, [selectedShape])



	 useEffect(() => {
        if (selectedShape) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }
        }
    }, [selectedShape, handleMouseMove, handleMouseUp])
	if (!shapes) return null
	return <div style={{position:'relative',width:'100vw',height:'100vh'}}>
		{shapes.map(shape => <div key={shape.id} style={{cursor:selectedShape?.id === shape.id?'grabbing':'grab'}} onMouseDown={() => handleMouseDown(shape)
		}>
			{shape.render()}
		</div>)}
	</div>
}