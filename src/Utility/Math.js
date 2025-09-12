import { RANGE } from "../constant"

export const getArrow=(x1,y1,x2,y2,arrowLength) =>{
	const angle = Math.atan2(y2 - y1, x2 - x1);
	const x3 =x2-arrowLength*Math.cos(angle-Math.PI/4);
	const y3=y2-arrowLength*Math.sin(angle-Math.PI/4);
	const x4=x2-arrowLength*Math.cos(angle+Math.PI/ 4);
	const y4 =y2-arrowLength*Math.sin(angle+Math.PI/4);
	return {x3,y3,x4,y4};
};

export const pointDistance = (x1,y1,x2,y2) => {
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

export const isLineClose = (x1,y1,x2,y2,x,y,) => {
	const disTostart = pointDistance(x1,y1,x,y);
	const disToEnd = pointDistance(x2,y2,x,y);
	const lineLen = pointDistance(x1,y1,x2,y2);
		return(Math.abs(disToEnd+disTostart-lineLen)< RANGE.LINE)
}