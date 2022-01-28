import React, {useState} from 'react'
import AppContext from './app-context';

const AppState = (props) => {
    
    const START_NODE_ROW = 2;
    const START_NODE_COL = 15;
    const FINISH_NODE_ROW = 15;
    const FINISH_NODE_COL = 35;

    const [spots, setSpots] = useState([]);
    const [mouseIsPressed, setMousePress] = useState(false);
    const [algorithm, setAlgorithm] = useState("none");

    return (
        <AppContext.Provider 
            value = {{
                spots,
                setSpots,
                mouseIsPressed,
                setMousePress,
                algorithm,
                setAlgorithm,
                START_NODE_COL,
                FINISH_NODE_COL,
                START_NODE_ROW,
                FINISH_NODE_ROW
            }}
        >
        {props.children}
        </AppContext.Provider>
    )
}

export default AppState
