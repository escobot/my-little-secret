import React, { useState } from 'react';
import axios from 'axios';

const SecretForm = () => {
    const [secret, setSecret] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://secrets.com/secrets/create', {
            secret
        });
        setSecret('');
    }

    return (
        <div>
            <h2>Create a secret</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <br />
                    <input 
                        value={secret}
                        onChange={e => setSecret(e.target.value)}
                        className="form-control" 
                    />
                </div>
                <br />
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default SecretForm;