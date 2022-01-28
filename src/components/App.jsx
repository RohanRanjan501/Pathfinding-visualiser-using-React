import React from "react";
import PathFinder from "./PathFinder";
import AppState from "../context/AppState";

function App() {
    return (
            <AppState>
                <PathFinder/>
            </AppState>
    );
}

export default App;
