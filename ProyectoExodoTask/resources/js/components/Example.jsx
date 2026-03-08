import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";

function Example() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.a_name} — {user.a_email}
                    </li>
                ))}
            </ul>
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
