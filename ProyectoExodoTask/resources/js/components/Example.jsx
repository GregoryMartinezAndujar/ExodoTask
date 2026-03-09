import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Example() {
    const [users, setUsers] = useState([]);
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        fetch("/api/tareas")
            .then((res) => res.json())
            .then((data) => setTareas(data));
    }, []);
    return (
        <div className="container-lg  mb-3">
            <h1>Usuarios</h1>

            {/* {users.map((user) => (
                <div
                    className="card row"
                    style={{ width: "18rem" }}
                    key={user.id}
                >
                    <div className="card-body col">
                        <h5 className="card-title"> {user.a_name} </h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                            {user.a_email}
                        </h6>
                    </div>
                </div>
            ))}
            <h1>Tareas</h1>
            {tareas.map((tarea) => (
                <div
                    className="card row"
                    style={{ width: "18rem" }}
                    key={tarea.id}
                >
                    <div className="card-body col">
                        <h5 className="card-title"> {tarea.a_nombre} </h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                            {tarea.a_descripcion}
                        </h6>
                    </div>
                </div>
            ))} */}
        </div>
    );
}

export default Example;

if (document.getElementById("text")) {
    const Index = ReactDOM.createRoot(document.getElementById("text"));

    Index.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>,
    );
}
