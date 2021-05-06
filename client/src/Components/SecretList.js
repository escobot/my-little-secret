import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const SecretList = () => {
    const [secrets, setSecrets] = useState({});

    const fetchSecrets =  async () => {
        const res = await axios.get('http://localhost:4000/secrets');
        setSecrets(res.data);
    };

    useEffect(() => {
        fetchSecrets();
    }, []);

    const renderedSecrets = Object.values(secrets).map(secret => {
        return (
            <div 
                className="card" 
                style={{ width: '30%', marginBottom: '20px' }}
                key={secret.id}
            >
                <div className="card-body">
                    <h3>{secret.secret}</h3>
                    <CommentList secretId={secret.id} />
                    <CommentForm secretId={secret.id} />
                </div>
            </div>
        );
    });

    return (
        <div className="d-flax flex-row flex-wrap justify-content-between">
            {renderedSecrets}
        </div>
    );
};

export default SecretList;