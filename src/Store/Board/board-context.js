import { createContext } from "react";

const BoardContext = createContext({
  activeToolItem: "",
  toolActionType:"",
  elements:[],
  history: [[]],
  index :0, 
  mouseDownHandler : ()=>{},
  mouseUpHandler : ()=>{},
  mouseMoveHandler : ()=>{},
  handleToolItemClick: () => {},
});

export default BoardContext;