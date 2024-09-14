import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Tables() {
    const host = "http://localhost:5002";

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${host}/api/user/Getuser`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColour:'white'
    };

    const thStyle = {
       background: 'linear-gradient(to top, red, orange)',
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left'
    };

    const tdStyle = {
        padding: '10px',
        border: '1px solid',
        textAlign: 'left',
         background:'white'
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer'
    };

    return (
        <div>
            <table style={tableStyle} >
                <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}> Address</th>
                        <th style={thStyle}>Phone</th>
                        {/* <th style={thStyle}>Password</th> */}
                        {/* <th style={thStyle}>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td style={tdStyle}>{item.name}</td>
                            <td style={tdStyle}>{item.email}</td>
                            <td style={tdStyle}>{item.address}</td>
                            <td style={tdStyle}>{item.phone}</td>
                            {/* <td style={tdStyle}>{item.password}</td> */}
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
