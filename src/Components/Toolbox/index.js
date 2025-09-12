import { useContext } from "react";
import { 
  COLORS,
  FILL_TOOL_ITEMS,
  STROKE_TOOL_ITEMS,
  SIZE_TOOL_ITEMS
} from "../../constant";
import "./index.css";
import BoardContext from "../../Store/Board/board-context";
import toolboxContext from "../../Store/Tool/toolbox-context";

export const Toolbox = () => {
  const { activeToolItem } = useContext(BoardContext);

  const { 
    toolboxState, 
    changeStroke, 
    changeFill, 
    changeSize } = useContext(toolboxContext);

  const strokeColor = toolboxState[activeToolItem]?.stroke;
  const fillColor = toolboxState[activeToolItem]?.fill;
  const size = toolboxState[activeToolItem]?.size;

  return (
    <div className="container">
      {STROKE_TOOL_ITEMS.includes(activeToolItem) &&(
        <div className="selectOptionContainer stroke">
          <div className="toolBoxLabel">Stroke Color</div>
          <div className="colorsContainer">
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  className={`colorbox ${
                    strokeColor === COLORS[k] ? "activeColorBox" : ""
                  }`}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => changeStroke(activeToolItem, COLORS[k])}
                ></div>
              );
            })}
          </div>
        </div>
      )}

      {FILL_TOOL_ITEMS.includes(activeToolItem) && (
        <div className="selectOptionContainer fill">
          <div className="toolBoxLabel">Fill Color</div>
          <div className="colorsContainer">
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  className={`colorbox ${
                    fillColor === COLORS[k] ? "activeColorBox" : ""
                  }`}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => changeFill(activeToolItem, COLORS[k])}
                ></div>
              );
            })}
          </div>
        </div>
      )}

      {SIZE_TOOL_ITEMS.includes(activeToolItem) && (
        <div className="selectOptionContainer size">
          <div className="toolBoxLabel">Brush Size</div>
          <div className="colorsContainer">
            <input
              type="range"
              min={1} max={10}
              step={1}
              value={size}
              onChange={(e)=>changeSize(activeToolItem,e.target.value)}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
};
