import { sortOpenList, findNeighbours } from "./best-first-search";

export function djikstra(grid, start, goal){
    const openList = [];
    const closedList = [];

    setInfiniteScore(grid);
    start.fScore = 0;

    openList.push(start);
    while (openList.length > 0) {
        sortOpenList(openList);
        let current = openList.shift();
        if (current === goal) {
            break;
        }
        findNeighbours(grid, current);
        // console.log(current);
        closedList.push(current);
        for (const neighbour of current.neighbors) {
            if(!neighbour.isWall && !closedList.includes(neighbour) && neighbour.fScore > current.fScore+1){
                neighbour.fScore = current.fScore+1;
                openList.push(neighbour);
                neighbour.parent = current;
            }
        }
    }
    return closedList;
}

function setInfiniteScore(spots){
    spots.forEach(row=>{
        row.forEach(spot=>{
            spot.fScore = Number.MAX_SAFE_INTEGER;
        })
    })
}