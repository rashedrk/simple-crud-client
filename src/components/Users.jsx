import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const loaderUsers = useLoaderData();
    const [users, setUsers] = useState(loaderUsers);
    const handleDelete = _id => {
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount === 1) {
                    alert("Successfully deleted one document.");
                    const remainingUsers = users.filter(user => user._id !== _id);
                    setUsers(remainingUsers);
                }
            })
    }
    return (
        <div>
            <h2>Total users {users.length}</h2>
            {
                users.map(user => <p key={user._id}>
                    {user.name} : {user.email} 
                    <Link to={`/update/${user._id}`}>
                        <button>Update</button>
                    </Link>
                    <button onClick={() => handleDelete(user._id)}>X</button>
                </p>)
            }
        </div>
    );
};

export default Users;