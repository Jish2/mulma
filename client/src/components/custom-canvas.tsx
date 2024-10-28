import Konva from "konva";
import { useState } from "react";
import { Stage, Layer, Star, Circle, Rect } from "react-konva";

const SHAPE_BUTTONS = ["square", "circle", "star"] as const;

type Shape = (typeof SHAPE_BUTTONS)[number];

function generateShape(shape: Shape, i: number) {
	return {
		type: shape,
		id: i.toString(),
		x: Math.random() * window.innerWidth,
		y: Math.random() * window.innerHeight,
		isDragging: false,
		fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
		// rotation: Math.random() * 180,
	};
}

function generateShapes() {
	return [...Array(10)].map((_, i) => {
		const index = Math.floor(Math.random() * SHAPE_BUTTONS.length);
		const type = SHAPE_BUTTONS[index];
		return generateShape(type, i);
	});
}

const INITIAL_STATE = generateShapes();

export const CustomCanvas = () => {
	const [shapes, setShapes] = useState(INITIAL_STATE);

	const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
		const id = e.target.id();
		setShapes((prevShapes) => prevShapes.map((shape) => ({ ...shape, isDragging: shape.id === id })));
	};

	const handleDragEnd = () => {
		setShapes((prevShapes) => prevShapes.map((shape) => ({ ...shape, isDragging: false })));
	};

	const handleCreateShape = (shape: Shape) => {
		const nextIndex = shapes.length;
		const newShape = generateShape(shape, nextIndex);
		setShapes((prevShapes) => [...prevShapes, newShape]);
	};

	return (
		<>
			<div className="flex gap-2 p-2 absolute top-0 left-0 z-10">
				{SHAPE_BUTTONS.map((shape) => (
					<button key={shape} onClick={() => handleCreateShape(shape)}>
						create {shape}
					</button>
				))}
				<button onClick={() => setShapes([])}>clear shapes</button>
			</div>

			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
					{shapes.map((shape) => {
						const shapeProps = {
							key: shape.id,
							id: shape.id,
							x: shape.x,
							y: shape.y,
							fill: shape.fill,
							opacity: 0.8,
							draggable: true,
							// rotation: shape.rotation,
							shadowColor: "black",
							shadowBlur: 10,
							shadowOpacity: 0.6,
							shadowOffsetX: shape.isDragging ? 10 : 5,
							shadowOffsetY: shape.isDragging ? 10 : 5,
							scaleX: shape.isDragging ? 1.2 : 1,
							scaleY: shape.isDragging ? 1.2 : 1,
							onDragStart: handleDragStart,
							onDragEnd: handleDragEnd,
							onMouseEnter: () => {
								window.document.body.style.cursor = "pointer";
							},
							onMouseLeave: () => {
								window.document.body.style.cursor = "default";
							},
						};

						switch (shape.type) {
							case "star":
								return <Star {...shapeProps} numPoints={5} innerRadius={25} outerRadius={50} />;
							case "circle":
								return <Circle {...shapeProps} radius={50} />;
							case "square":
								return <Rect {...shapeProps} width={100} height={100} />;
						}
					})}
				</Layer>
			</Stage>
		</>
	);
};
