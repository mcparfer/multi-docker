import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');
    
    const fetchValues = async () => {
        const response = await axios.get('/api/values/current');
        setValues(response.data);
    }

    const fetchIndexes = async () => {
        const response = await axios.get('/api/values/all');
        setSeenIndexes(response.data);
    }

    useEffect(()=>{
        fetchValues();
        fetchIndexes();
    }, [])

    const handleSubmit = async(event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: index
        })

        setIndex('');
        fetchValues();
        fetchIndexes();
    }

    const renderSeenIndexes = () => {
        return seenIndexes.map(({ number }) => number).join(', ');
    }

    const renderValues = () => {
        const entries = [];

        for (let key in values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {values[key]}
                </div>
            );
        }

        return entries
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> Enter your index:</label>
                <input
                    value={index}
                    onChange={e => setIndex(e.target.value)}
                />
                <button>Dale!</button>
            </form>

            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}

            <h3>Calculated values:</h3>
            {renderValues()}
        </div>
    )
}

export default Fib;