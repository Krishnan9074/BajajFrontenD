import React, { useState } from 'react';
import axios from 'axios';

function BfhlForm() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const handleSubmit = async () => {
        setResponse(null);  // Clear previous response

        try {
            // Parse the JSON input
            const jsonData = JSON.parse(input);

            // Send the parsed JSON to the server
            const res = await axios.post('https://bajajproject.onrender.com/bfhl', jsonData);
            console.log("Response received:", res.data);  // Debugging line

            setResponse(res.data);
        } catch (error) {
            if (error instanceof SyntaxError) {
                alert('Invalid JSON format: ' + error.message);
            } else {
                alert('API Error: ' + error.message);
            }
            console.error("Error:", error);  // Debugging line
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
                placeholder='Enter JSON here... Example: { "data": ["A","C","Z","c","i"] }'
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
                {response && selectedOptions.length > 0 ? (
                    <pre>
                        {JSON.stringify(
                            selectedOptions.reduce((acc, option) => {
                                // Ensure the selected option exists in the response and is non-empty
                                if (response[option] && response[option].length > 0) {
                                    acc[option] = response[option];
                                }
                                return acc;
                            }, {}),
                            null,
                            2
                        )}
                    </pre>
                ) : (
                    <p>No filters selected or no matching data found.</p>
                )}
            </div>
        </div>
    );
}

export default BfhlForm;
