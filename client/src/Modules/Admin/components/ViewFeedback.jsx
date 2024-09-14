import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplyIcon from '@mui/icons-material/Reply';

export default function ViewFeedback() {
    const host = config.host;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${host}/api/Feedback/getAllFeedback`)
            .then((res) => {
                console.log(res.data); // Check the data structure
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

    const handleReply = (email, feedbackMessage) => {
        // Encode the subject and body to be URL-safe
        const subject = encodeURIComponent('HAPPY FLOOR Feedback Response');
        const body = encodeURIComponent(`Hi,\n\nThank you for your feedback. We received the following message:\n\n"${feedbackMessage}"\n\nBest regards,\nYour Company`);

        // Construct the Gmail compose URL with subject and body
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
        
        // Open Gmail's compose window in a new tab
        window.open(gmailComposeUrl, '_blank');
    };

    return (
        <div>
            <table style={tableStyle} border="1">
                <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Message</th>
                        <th style={thStyle}>Created At</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td style={tdStyle}>{item.name}</td>
                            <td style={tdStyle}>{item.email}</td>
                            <td style={tdStyle}>{item.message}</td>
                            <td style={tdStyle}>{new Date(item.createdAt).toLocaleString()}</td>
                            <td style={tdStyle}>
                                <button
                                    style={buttonStyle}
                                    onClick={() => handleReply(item.email, item.message)}
                                >
                                    <ReplyIcon />
                                </button>
                                {/* <button style={buttonStyle}><DeleteOutlineIcon /></button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
