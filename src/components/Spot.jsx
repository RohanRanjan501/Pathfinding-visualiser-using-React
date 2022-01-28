import AppContext from "../context/app-context";
import React, {useContext} from "react";

function Spot(props) {
    const {
        row,
        col,
        isFinish,
        isStart,
        isVisited,
        isWall,
        isPath,
        onMouseDown,
        onMouseUp,
        onMouseEnter
    } = props;

    const { spots, setSpots, mouseIsPressed, setMousePress } = useContext(AppContext);
    // console.log("in spot ",typeof setMousePress)

    const extraClassName = isFinish
        ? 'spot-finish'
        : isStart
            ? 'spot-start'
            : isWall
                ? 'spot-wall'
                : isVisited
                    ? 'spot-visited'
                    : isPath
                        ? 'spot-path'
                        : '';
    return (
        <div
            id={`node-${row}-${col}`}
            className={`spot ${extraClassName}`}
            onMouseDown={() => onMouseDown(spots, setSpots, row, col, setMousePress)}
            onMouseEnter={() => onMouseEnter(spots, setSpots, row, col, mouseIsPressed)}
            onMouseUp={() => onMouseUp(setMousePress)}
        />
    );
}

export default Spot