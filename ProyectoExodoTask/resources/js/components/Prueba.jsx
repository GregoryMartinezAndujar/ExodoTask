import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";

function Prueba() {
    return <h1>Hola desde React</h1>;
}

ReactDOM.createRoot(document.getElementById("text")).render(<Prueba />);
