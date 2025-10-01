import { useContext } from 'react';
import classes from "./index.module.css"
import cx from 'classnames';
import {
  LuRectangleHorizontal,
  LuSlash,
  LuCircle,
  LuArrowRight,
  LuBrush,
  LuEraser,
} from "react-icons/lu";
import { FaUndo ,FaRedo, FaDownload   } from "react-icons/fa";
import BoardContext from '../../Store/Board/board-context';

const Toolbar = () => {
  const {activeToolItem, handleToolItemClick, undo, redo } = useContext(BoardContext);

  const handleDownloadClick = () => {
    const canvas = document.getElementById('canvas');
    const data = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = data
    anchor.download = 'canvas.png';
    anchor.click();
  }

  return (
    <div className={classes.container}>
      <div className={
        cx(classes.toolItem,{[classes.active]:activeToolItem==="BRUSH"})}
        onClick={() => handleToolItemClick("BRUSH")}
      >
        <LuBrush />
      </div> {/** Brush Tool */}
      <div className={
        cx(classes.toolItem,{[classes.active]:activeToolItem==="ARROW"})}
        onClick={() => handleToolItemClick("ARROW")}
      >
        <LuArrowRight />
      </div> {/** Arrow Tool */}
      <div className={
        cx(classes.toolItem,{[classes.active]:activeToolItem==="LINE"})}
        onClick={() => handleToolItemClick("LINE")}
      >
        <LuSlash />
      </div> {/** Line Tool */}
      <div className={
        cx(classes.toolItem,{[classes.active]:activeToolItem==="RECTANGLE"})}
        onClick={() => handleToolItemClick("RECTANGLE")}
      >
        <LuRectangleHorizontal />
      </div> {/** Rectangle Tool */}
      <div className={
        cx(classes.toolItem,{[classes.active]:activeToolItem==="ELLIPSE"})}
        onClick={() => handleToolItemClick("ELLIPSE")}
      >
        <LuCircle />
      </div> {/** Ellipse Tool */}
       {/* <div className={
        cx(classes.toolItem,{[classes.active]:activeToolItem==="TEXT"})}
        onClick={() => handleToolItemClick("TEXT")}
      >
        <FaFont  />
      </div> Text Tool */}
      <div className={
        cx(classes.toolItem,{[classes.active]:activeToolItem==="ERASER"})}
        onClick={() => handleToolItemClick("ERASER")}
      >
        <LuEraser />
      </div> {/** Eraser Tool */}
      <div className={classes.toolItem} onClick={undo}>
        <FaUndo  />
      </div> {/** Undo Tool */}
      <div className={classes.toolItem} onClick={redo}>
        <FaRedo  />
      </div> {/** Redo Tool */}
      <div className={classes.toolItem} onClick={handleDownloadClick}>
        <FaDownload   />
      </div> {/** Download Tool */}
    </div>
  )
}

export default Toolbar;