import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function ViewSuggestion() {
    const host = config.host;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${host}/api/suggestion/Getsug`)
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
    };

    const thStyle = {
        backgroundColor: '#f2f2f2',
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
    };

    const tdStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        marginRight: '5px',
    };

    return (
        <div>
            <table style={tableStyle} border="1">
                <thead>
                    <tr>
                        <th style={thStyle}> Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Suggestion</th>
                        {/* Uncomment if needed */}
                        {/* <th style={thStyle}>Recipe Method</th>
                        <th style={thStyle}>Recipe Image</th> */}
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td style={tdStyle}>{item.name}</td>
                            <td style={tdStyle}>{item.email}</td>
                            <td style={tdStyle}>{item.suggestion}</td>
                            {/* Uncomment if needed */}
                            {/* <td style={tdStyle}>{item.recipe_method}</td> */}
                            {/* <td style={tdStyle}>
                                <img src={`${host}/api/image/${item.recipe_image}`} style={{ width: '250px', height: '250px' }} alt="Recipe" />
                            </td> */}
                            {/* Uncomment if needed */}
                            {/* <td style={tdStyle}>
                                <button style={buttonStyle}><EditIcon /></button>
                                <button style={buttonStyle}><DeleteOutlineIcon /></button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
