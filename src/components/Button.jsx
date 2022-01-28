import React from "react";
import {clearPath} from "../algorithms/utility";

function Button(props){
    return <button className="button" onClick={props.onClick}>{props.text}</button>
}

export default Button;