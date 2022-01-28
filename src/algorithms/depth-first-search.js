import { findNeighbours } from "./best-first-search";

export function depthFirstSearch(grid, start, goal) {
    // const closedList = [];
    const closedList = [];
    start.fScore = 0;
    let res = helperDFS(start)
    
    function helperDFS(current){
        // console.log(current);
        if(current===goal){
            return true;
        }
        closedList.push(current);
        findNeighbours(grid, current);
        for (const neighbour of current.neighbors) {
            if(!neighbour.isWall && !closedList.includes(neighbour)){

                if(helperDFS(neighbour)===true){
                    neighbour.parent = current;
                    return true;
                }
            }
        }
        return false;
    }
    
    return closedList;
}

