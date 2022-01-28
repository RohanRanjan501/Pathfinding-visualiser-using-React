export function bestFirstSearch(grid, start, goal) {
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
        closedList.push(current);
        for (const neighbour of current.neighbors) {
            if (!neighbour.isWall && !closedList.includes(neighbour) && !openList.includes(neighbour)) {
                openList.push(neighbour);
                neighbour.fScore = neighbour.hScore;
                neighbour.parent = current;
            }
        }
    }
    return closedList;
}

export function sortOpenList(openList) {
    openList.sort((spotA, spotB) => spotA.fScore - spotB.fScore);
}

export function findNeighbours(grid, spot) {
    spot.neighbors = [];
    const {row, col} = spot;
    if (row > 0) spot.neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) spot.neighbors.push(grid[row + 1][col]);
    if (col > 0) spot.neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) spot.neighbors.push(grid[row][col + 1]);
}

export function getPath(spot) {
    const path = [];
    while (spot.parent != null) {
        path.push(spot);
        spot = spot.parent;
    }
    return path;
}