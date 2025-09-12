import {useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import BoardContext from "../../Store/Board/board-context";
import { 
  // TOOL_ACTION_TYPES,
  TOOL_ITEMS } from "../../constant";
import toolboxContext from "../../Store/Tool/toolbox-context";


function Board() {
  const canvasRef = useRef();
  const {
    elements, 
    mouseDownHandler, 
    mouseMoveHandler, 
    mouseUpHandler,  
  } = useContext(BoardContext);

  const {toolboxState} = useContext(toolboxContext); // stroke/fill color 1 then to BoardProvider

  useEffect(()=>{ 
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },[]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context=canvas.getContext("2d");
    context.save();
    const roughCanvas = rough.canvas(canvas);

    elements.forEach(element => {
      switch(element.type){
        case TOOL_ITEMS.ARROW:
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.ELLIPSE:
          roughCanvas.draw(element.roughElement);
          break;
        case TOOL_ITEMS.BRUSH:
          context.fillStyle = element.stroke;
          context.fill(element.path);
          context.restore();
          break;
        default:
          throw new Error("Unknown element type: " + element);
      }
    });

    return()=>{
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  },[elements]);


  // /***************** fxns are directly passed  
   
  const handleMouseDown = (event) =>{
    mouseDownHandler(event,toolboxState); // stroke/fill color 2
  };

  const handleMouseMove = (event) =>{
    // if(toolActionType === TOOL_ACTION_TYPES.DRAWING)
      mouseMoveHandler(event ); // stroke/fill color 2
  };

  const handleMouseUp = () =>{
      mouseUpHandler();
  };

  // ****************/
  return (
    <div className="App">
      <canvas 
      id="canvas"
      ref={canvasRef} 
      onMouseDown={handleMouseDown} 
      onMouseMove={handleMouseMove} 
      onMouseUp={handleMouseUp}
    />
    </div>
  )
}

export default Board;