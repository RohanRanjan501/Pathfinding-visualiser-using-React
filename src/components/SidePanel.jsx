import React, {useContext} from "react";
import Select from "./Select";
import Button from "./Button";
import {clearPath, clearAll, visualise} from "../algorithms/utility";
import AppContext from "../context/app-context";

function SidePanel(){

    const { 
        spots, 
        setSpots, 
        algorithm, 
        setAlgorithm, 
        START_NODE_COL,
        FINISH_NODE_COL,
        START_NODE_ROW,
        FINISH_NODE_ROW 
    } = useContext(AppContext);

    return <div className="column left">
        {/* <h1>PathFinder</h1> */}
        <Select 
            algorithms = {
                [
                    {
                        name:"A star",
                        value:"aStar"
                    },
                    {
                        name:"Best First Search",
                        value:"bestFirstSearch"
                    },
                    {
                        name:"Djikstra",
                        value:"djikstra"
                    },
                    {
                        name:"Depth First Search",
                        value:"depthFirstSearch"
                    },
                    {
                        name:"Breadth First Search",
                        value:"breadthFirstSearch"
                    }
                ]
            }
            onChange = {(e)=>{setAlgorithm(e.target.value)}}
        />
        <Button text="Visualise" onClick={() => visualise(algorithm, spots, setSpots, START_NODE_ROW, FINISH_NODE_ROW, START_NODE_COL, FINISH_NODE_COL)}/>
        <Button text="Clear Path" onClick={() => clearPath(spots, setSpots)}/>
        <Button text="Clear All" onClick={() => clearAll(spots, setSpots)}/>
    </div>
}

export default SidePanel;