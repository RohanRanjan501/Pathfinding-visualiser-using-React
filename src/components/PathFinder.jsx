import React, {useEffect, useState, useContext} from "react";
import Grid from "./Grid";
import SidePanel from "./SidePanel";

import appContext from "../context/app-context";
import Navbar from "./Navbar";

function PathFinder() {

    const {spots, setSpots, FINISH_NODE_COL, FINISH_NODE_ROW, START_NODE_COL, START_NODE_ROW} = useContext(appContext)

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    function newSpot(i, j, hScore) {
        return {
            row: i,
            col: j,
            isStart: i === START_NODE_ROW && j === START_NODE_COL,
            isFinish: i === FINISH_NODE_ROW && j === FINISH_NODE_COL,
            isWall: false,
            isPath: false,
            previousNode: null,
            parent: null,
            neighbors: [],
            fScore: 0,
            gScore: 0,
            hScore: hScore,
            isVisited: false
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth*0.8,
                height: window.innerHeight*0.95
            })
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        const tempGrid = [];
        console.log("resized")
        // console.log(spots)
        for (let i = 0; i < windowSize.height / 25 - 2; i++) {
            const currentRow = [];
            for (let j = 0; j < windowSize.width / 25 - 2; j++) {
                const hScore = Math.abs(i - FINISH_NODE_ROW) + Math.abs(j - FINISH_NODE_COL);
                currentRow.push(newSpot(i, j, hScore));
            }
            tempGrid.push(currentRow);
        }

        setSpots(JSON.parse(JSON.stringify(tempGrid)));

        return () => window.removeEventListener("resize", handleResize);
    }, [windowSize.height, windowSize.width])

   

   

    return (
        <div className="row">
            {/* <AppState> */}  
            <Navbar/> 
                <SidePanel array={spots} setSpots={setSpots}/>
                <Grid />
            {/* </AppState> */}
        </div>

    );
}

export default PathFinder;