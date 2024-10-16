import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Sample() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [editmode, setEditmode] = useState(false);
    const [showName, setShowName] = useState([]);
    const [currentId, setCurrentId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editmode) {
            axios.put(`api/update/${currentId}`, { fname, lname })
                .then((response) => {
                    console.log(response.data);
                    setEditmode(false);
                    setFname('');
                    setLname('');
                    fetchNames();
                });
        } else {
            axios.post('api/name', { fname, lname })
                .then((response) => {
                    console.log(response.data);
                    setFname('');
                    setLname('');
                    fetchNames();
                });
        }
    };

    useEffect(() => {
        fetchNames();
    }, []);

    const fetchNames = () => {
        axios.get("/api/show")
            .then((response) => {
                console.log(response.data);
                setShowName(response.data.name); 
            });
    };

    const handleDelete = (id) => {
        axios.delete(`/api/delete/${id}`)
            .then((response) => {
                alert(response.data.message);
                fetchNames();
            });
    };

    const handleEdit = (id) => {
        const nameToEdit = showName.find(item => item.id === id);
        setFname(nameToEdit.fname);
        setLname(nameToEdit.lname);
        setCurrentId(id);
        setEditmode(true);
    };

    return (
        <div>
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fname">First name:</label>
                <input type="text" id="fname" name="fname" value={fname} onChange={(e) => setFname(e.target.value)} required />
                <br />
                <label htmlFor="lname">Last name:</label>
                <input type="text" id="lname" name="lname" value={lname} onChange={(e) => setLname(e.target.value)} required />
                <br />
                <input type="submit" value="Submit" />
            </form>

            <h1>Show</h1>
            <table>
                <tbody>
                    {showName.map((item) => (
                        <tr key={item.id}>
                            <td>{item.fname}</td>
                            <td>{item.lname}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                                <button onClick={() => handleEdit(item.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sample;
