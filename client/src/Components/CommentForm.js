import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ secretId }) => {
    const [content, setContent] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://secrets.com/secrets/${secretId}/comments`, {
            content
        });
        setContent('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input 
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="form-control" 
                    />
                </div>
                <br />
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CommentForm;