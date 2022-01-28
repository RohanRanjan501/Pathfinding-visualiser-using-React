import { sortOpenList, findNeighbours } from "./best-first-search";

export function aStar(grid, start, goal) {
    const openList = [];
    const closedList = [];
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
            if (!neighbour.isWall && !closedList.includes(neighbour)) {
                const tempG = current.gScore + 1;
                if (openList.includes(neighbour)) {
                    if (tempG < neighbour.gScore) {
                        neighbour.gScore = tempG;
                    }
                } else {
                    neighbour.gScore = tempG;
                    openList.push(neighbour);
                }
                neighbour.fScore = neighbour.gScore + neighbour.hScore;
                neighbour.parent = current;
            }
        }
    }

    return closedList;
}