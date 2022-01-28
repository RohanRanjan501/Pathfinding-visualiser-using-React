import React from "react";

function Select(props){
    return <select onChange={props.onChange} className="select">
        <option value="none">Select Algorithm</option>
        {props.algorithms.map(algorithm=>{
            return <option value={algorithm.value}>{algorithm.name}</option>
        })};
    </select>
}

export default Select;