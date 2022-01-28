import {aStar} from "../algorithms/a-star";
import {bestFirstSearch} from "../algorithms/best-first-search";
import {djikstra} from "../algorithms/djikstra";
import { breadthFirstSearch } from "../algorithms/breadth-first-search";
import {depthFirstSearch} from "../algorithms/depth-first-search";
// import SidePanel from "./SidePanel";


export function onMouseDown(spots, setSpots, row, col, setMousePress) {
    setMousePress(true);
    const newGrid = getNewGridWithWallToggled(spots, row, col);
    setSpots(newGrid);
    // mouseIsPressed = true;
}

export function onMouseEnter(spots, setSpots, row, col, mouseIsPressed) {
    // console.log("mouseenter "+spots)
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(spots, row, col);
    setSpots(newGrid);
}

export function onMouseUp(setMousePress) {
    setMousePress(false)
}

export function getNewGridWithWallToggled(grid, row, col){
    // console.log("grid ",grid)
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    newGrid[row][col] = {
        ...node,
        isWall: !node.isWall,
    };
    return newGrid;
};

// ========================================================================================================

export function visualise(algorithm, spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL){
    clearPath(spots, setSpots);
    console.log("in visualise ", algorithm)
    let path = [], visitedNodesInOrder = []
    switch(algorithm){
        case 'aStar': 
        visitedNodesInOrder = visualiseAStar(spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL)
        break;
        case 'bestFirstSearch': 
        visitedNodesInOrder = visualiseBestFirstSearch(spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL)
        break;
        case 'djikstra': 
        visitedNodesInOrder = visualiseDjikstra(spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL)
        break;
        case 'depthFirstSearch': 
        visitedNodesInOrder = visualiseDepthFirstSearch(spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL)
        break;
        case 'breadthFirstSearch': 
        visitedNodesInOrder = visualiseBreadthFirstSearch(spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL)
        break;
        case 'none': 
        
        break;
        
    }
    path = getPath(spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
    if(algorithm==='none')
        path = []
    animate(visitedNodesInOrder, path, spots, setSpots);
}

export function visualiseAStar(spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL) {
    const visitedNodesInOrder = aStar(spots, spots[START_NODE_ROW][START_NODE_COL], spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
    return visitedNodesInOrder
}
export function visualiseBestFirstSearch(spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL) {
    const visitedNodesInOrder = bestFirstSearch(spots, spots[START_NODE_ROW][START_NODE_COL], spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
    return visitedNodesInOrder;
}

export function visualiseDjikstra(spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL) {
    const visitedNodesInOrder = djikstra(spots, spots[START_NODE_ROW][START_NODE_COL], spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
    return visitedNodesInOrder;
}
export function visualiseBreadthFirstSearch(spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL){
    const visitedNodesInOrder = breadthFirstSearch(spots, spots[START_NODE_ROW][START_NODE_COL], spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
    return visitedNodesInOrder;
}

export function visualiseDepthFirstSearch(spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL){
    const visitedNodesInOrder = depthFirstSearch(spots, spots[START_NODE_ROW][START_NODE_COL], spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
    return visitedNodesInOrder;
}

export function animate(visitedNodes, path, spots, setSpots) {
    for (let i = 0; i <= visitedNodes.length; i++) {
        if (i === visitedNodes.length) {
            setTimeout(() => {
                animatePath(path, spots, setSpots);
            }, 10 * i);
        } else {
            setTimeout(() => {
                const node = visitedNodes[i];
                const newGrid = spots.slice();
                newGrid[node.row][node.col] = {
                    ...node,
                    isVisited: true
                };
                setSpots(newGrid);
            }, 10 * i);
        }
    }
}
export function getPath(spot) {
    const path = [];
    while (spot.parent != null) {
        path.push(spot);
        spot = spot.parent;
    }
    return path;
}
export function clearPath(spots, setSpots){
    const newGrid = spots.slice();
    Array.from(newGrid).forEach(row => {
        Array.from(row).forEach(spot=>{
            spot.isVisited = false;
            spot.isPath = false;
            spot.parent = null;
        })
    });
    setSpots(newGrid);
}

export function clearAll(spots, setSpots){
    const newGrid = spots.slice();
    Array.from(newGrid).forEach(row => {
        Array.from(row).forEach(spot=>{
            spot.isWall = false;
            spot.isVisited = false;
            spot.isPath = false;
            spot.parent = null;
        })
    });
    setSpots(newGrid);
}

export function animatePath(path, spots, setSpots) {
    console.log(path)
    for (let i = path.length-1; i>=0; i--) {
        setTimeout(() => {
            const node = path[i];
            const newGrid = spots.slice();
            newGrid[node.row][node.col] = {
                ...node,
                isPath: true
            };
            setSpots(newGrid);
        }, 50 * (path.length-1-i));
    }

}