import { 
	TOOL_ITEMS, 
	ARROW_LEN, } from "../constant"
import { isLineClose,getArrow } from "./Math";
import getStroke from "perfect-freehand";
import rough from 'roughjs/bin/rough';
const gen = rough.generator();

export const createElement = (id,	x1,	y1,	x2,	y2,{
		type,
		stroke,
		fill,
		size }) => {

	const element = {id,x1,y1,x2,y2,type,stroke,fill,size}
	let styles = {
		seed : id+1,
		fillStyle : 'solid',
	};

	// stroke/fill color 3 :check for it */
	if(stroke){
		styles.stroke = stroke;
	}
	if(fill){
		styles.fill = fill;
	}
	if(size){
		styles.strokeWidth = size;
	}

	// console.log("Creating element:",element,styles);

	switch (type) {
		case TOOL_ITEMS.BRUSH:
		const brushElement = {
			id,
			points : [{x:x1,y:y1}],
			path: new Path2D(getSvgPathFromStroke(getStroke([{x:x1,y:y1}]))),
			type,
			stroke,
			size
		}
		return brushElement;

		case TOOL_ITEMS.LINE:
			element.roughElement = gen.line(x1, y1, x2, y2,styles);
			return element;

		case TOOL_ITEMS.RECTANGLE:
			element.roughElement = gen.rectangle(x1,y1,x2-x1,y2-y1,styles);
			return element;

		case TOOL_ITEMS.ELLIPSE:
			element.roughElement = gen.ellipse((x1+x2)/2, (y1+y2)/2, x2-x1,y2-y1, styles);
			return element;

		case TOOL_ITEMS.ARROW:
			const {x3,y3,x4,y4} = getArrow(x1,y1,x2,y2,ARROW_LEN);
			const points = [
				[x1,y1],
				[x2,y2],
				[x3,y3],
				[x2,y2],
				[x4,y4]
			];
			element.roughElement = gen.linearPath(points, styles);
			return element;
		
		default:
			throw new Error("Unknown tool type : " + type);
	}
}

export const getSvgPathFromStroke = (stroke) => {
	if(!stroke.length) return "";

	const d = stroke.reduce(
		(acc, [x0, y0], i, arr) => {
			const [x1, y1] = arr[(i+1) % arr.length];
			acc.push(x0, y0,(x0 + x1) / 2, (y0 + y1) / 2);
			return acc;
		},
	["M", ...stroke[0], "Q"]);

	d.push("Z");
	return d.join(" ");
}

export const isNearestElement= (element, x, y) => {
	const {x1,y1,x2,y2,type} = element;
	console.log("Checking element : ",type);
	switch (type) {
		case TOOL_ITEMS.LINE:
		case TOOL_ITEMS.ARROW:
			return isLineClose(x1,y1,x2,y2,x,y,);
			
		case TOOL_ITEMS.RECTANGLE:
			return(
				isLineClose(x1,y1,x2,y1,x,y) ||
				isLineClose(x2,y1,x2,y2,x,y) ||
				isLineClose(x2,y2,x1,y2,x,y) ||
				isLineClose(x1,y2,x1,y1,x,y)
			)
		case TOOL_ITEMS.ELLIPSE:
			return(
				isLineClose(x1,y1,x2,y1,x,y) ||
				isLineClose(x2,y1,x2,y2,x,y) ||
				isLineClose(x2,y2,x1,y2,x,y) ||
				isLineClose(x1,y2,x1,y1,x,y)
			)
		case TOOL_ITEMS.BRUSH:
			const context = document.getElementById("canvas").getContext("2d");
			return context.isPointInPath(element.path,x,y);

		default:
			throw new Error("Unknown element type: " + element);
	}
	// return false;
}