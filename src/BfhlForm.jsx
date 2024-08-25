import React, { useState } from 'react';
import axios from 'axios';

function BfhlForm() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const handleSubmit = async () => {
        // Clear the previous response
        setResponse(null);

        try {
            const res = await axios.post('https://bajajproject.onrender.com/bfhl', JSON.parse(input));
            setResponse(res.data);
        } catch (error) {
            alert('Invalid JSON or API Error');
            console.error(error);
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    return (
        <div className="container">
            <h1>JSON Processor</h1>
            <label>API Input</label>
            <textarea 
                id="jsonInput" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder='Enter JSON here... Example: { "data": ["A","C","z"] }'
            />
            <button onClick={handleSubmit}>Submit</button>

            <label>Multi Filter</label>
            <select id="filterOptions" multiple onChange={handleOptionChange}>
                <option value="alphabets">Alphabets</option>
                <option value="numbers">Numbers</option>
                <option value="highest_lowercase_alphabet">Highest lowercase alphabet</option>
            </select>

            <h3>Filtered Response</h3>
            <div id="responseContainer">
                {response && (
                    <pre>{JSON.stringify(selectedOptions.reduce((acc, option) => {
                        acc[option] = response[option];
                        return acc;
                    }, {}), null, 2)}</pre>
                )}
            </div>
        </div>
    );
}

export default BfhlForm;
