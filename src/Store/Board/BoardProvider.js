import { useReducer } from "react";
import BoardContext from "./board-context";
import { 
  BOARD_ACTIONS, 
  TOOL_ACTION_TYPES, 
  TOOL_ITEMS } from "../../constant.js";
import getStroke from "perfect-freehand";
import { 
  getSvgPathFromStroke,
  createElement, 
  isNearestElement } from "../../Utility/Tools.js";

const boardReducer = (state,action) => {
  // console.log("Action:", action);
  // console.log("State before:", state);

  switch (action.type) {
    case BOARD_ACTIONS.CHANGE_TOOL:{
      // console.log("Changing tool to:", action.payload.tool);
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    }
    case BOARD_ACTIONS.CHANGE_ACTION_TYPE:{
      return{
        ...state,
        toolActionType: action.payload.actionType,
      }
    }
    case BOARD_ACTIONS.DRAW_DOWN: {
      // console.log("Adding new element");
      const { clientX, clientY, stroke, fill,size } = action.payload;
      const newElement = createElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        { type: state.activeToolItem,stroke,fill,size }
      );
      return {
        ...state,
        toolActionType: state.activeToolItem=== TOOL_ITEMS.ERASER ? TOOL_ACTION_TYPES.ERASING : TOOL_ACTION_TYPES.DRAWING,
        elements: [...state.elements, newElement],
      };
    }
    case BOARD_ACTIONS.DRAW_MOVE: {
      // console.log("Udating last element");
      const { clientX, clientY } = action.payload;
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      const {type} =newElements[index]; //******* */
      switch(type){
        case TOOL_ITEMS.ARROW:
        case TOOL_ITEMS.LINE: 
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.ELLIPSE:
          const { x1, y1, stroke, fill,size } = newElements[index];
          const newFigure = createElement(
            index,x1,y1,clientX,clientY,
            {type:state.activeToolItem,
              stroke,
              fill,
              size
            }
          );
          newElements[index] = newFigure;
          return {
            ...state,
            elements: newElements,
          };
        case TOOL_ITEMS.BRUSH:
          newElements[index].points = [...newElements[index].points, {x:clientX,y:clientY}];
          newElements[index].path = new Path2D(getSvgPathFromStroke(getStroke(newElements[index].points)));
          return {
            ...state,
            elements: newElements,
          };
        default:
          break;
      }
    }
    case BOARD_ACTIONS.ERASE: {
      const {clientX, clientY} = action.payload;
      console.log("Erasing at:",clientX, clientY);
      let newElements = [...state.elements];
      newElements= newElements.filter((element)=>{
        return !isNearestElement(element,clientX, clientY);
      })
      return{
        ...state,
        elements: newElements,
      }
    }
    default: {
      console.log("Unknown (BoardProvider)");
      return state;
    }
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.BRUSH,
  toolActionType: TOOL_ACTION_TYPES.NONE,
  elements: [],
};

const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(boardReducer,initialBoardState);

  const handleToolItemClick = (tool) => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_TOOL,
      payload: {
        tool,
      },
    });
  };

  const mouseDownHandler = (event,toolboxState)=>{
    // if(boardState.activeToolItem===TOOL_ITEMS.TEXT){
    //   dispatchBoardAction({
    //     type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
    //     payload :{
    //       actionType: TOOL_ACTION_TYPES.WRITING,
    //     }
    //   });
    //   return;
    // }
    const {clientX,clientY} = event;
    if(boardState.activeToolItem===TOOL_ITEMS.ERASER){
      dispatchBoardAction({
        type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
        payload :{
          actionType: TOOL_ACTION_TYPES.ERASING,
        }
      });
      return;
    }
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload: {
        clientX,
        clientY,
        stroke: toolboxState[boardState.activeToolItem]?.stroke,
        fill: toolboxState[boardState.activeToolItem]?.fill,
        size: toolboxState[boardState.activeToolItem]?.size,
      },
    });
  };

  const mouseMoveHandler = (event) => {
    const {clientX, clientY} = event;
    if(boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING){
      dispatchBoardAction({
        type: BOARD_ACTIONS.DRAW_MOVE,
        payload: {
          clientX,
          clientY,
        },
      });
    }
    else if(boardState.toolActionType === TOOL_ACTION_TYPES.ERASING){
      dispatchBoardAction({
        type : BOARD_ACTIONS.ERASE,
        payload : {
          clientX,
          clientY,
        }
      });
    }
  };

  const mouseUpHandler = () => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
      payload : { actionType: TOOL_ACTION_TYPES.NONE },
    });
  };

  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    handleToolItemClick,
    mouseDownHandler,
    mouseMoveHandler,
    mouseUpHandler,
  };

  return (
    <BoardContext.Provider value={boardContextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
