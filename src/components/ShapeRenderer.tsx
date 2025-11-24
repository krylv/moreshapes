import { useEffect, useState } from "react"
import { Circle, Square } from "./shapes/Shapes"
import type { IBaseShape } from "src/types"

export const ShapeRenderer = () => {
	const [shapes,setShapes] = useState<IBaseShape[]>()
	const newShape = new Square({x:200,y:20},40,'red')
	const newCircle = new Circle({x:50,y:50},40,'black')

	useEffect(() => {
		setShapes([newShape,newCircle])
	},[])
	if (!shapes) return null
	return <div style={{position:'relative',width:'100vw',height:'100vh'}}>
		{shapes.map(shape => shape.render())}
	</div>
}