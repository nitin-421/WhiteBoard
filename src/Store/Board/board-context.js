import { createContext } from "react";

const BoardContext = createContext({
  activeToolItem: "",
  toolActionType:"",
  elements:[],
  mouseDownHandler : ()=>{},
  mouseUpHandler : ()=>{},
  mouseMoveHandler : ()=>{},
  handleToolItemClick: () => {},
});

export default BoardContext;