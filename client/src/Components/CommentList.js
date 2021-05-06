import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ secretId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/secrets/${secretId}/comments`);
        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    });

    return (
        <ul>{renderedComments}</ul>
    );
};

export default CommentList;