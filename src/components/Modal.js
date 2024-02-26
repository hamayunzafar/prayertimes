import React, { useState } from 'react';
import axios from 'axios';
// ... other imports

export const Modal = ({ show, onClose }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Function to call the Geoapify API when the input changes
  const handleInputChange = async (event) => {
    const userInput = event.target.value;
    setInput(userInput); // Update the input state

    if (userInput.length > 1) { // Check if the input length is sufficient
      try {
        // Make the API call to Geoapify using the user's input
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(userInput)}&apiKey=f5ffe8c5bd1b4ce2bda25f18fd00185c`);
        
        // Update the suggestions state with the API response
        setSuggestions(response.data.features.map(feature => feature.properties.formatted));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]); // Reset suggestions on error
      }
    } else {
      setSuggestions([]); // Reset suggestions if the input is too short
    }
  };

  // Function to handle the suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion); // Update the input state with the selected suggestion
    setSuggestions([]); // Clear suggestions
  };

  // Conditional rendering based on the show prop
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
            <span className="modal-title">Search and select your city to see your prayer times</span>
            <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
            <span className="sub-title">You only need to do it once</span>
            <input
                type="text"
                placeholder="Type your city..."
                className="city-input"
                value={input}
                onChange={handleInputChange} // Attach the change handler
            />
            <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                </li>
                ))}
            </ul>
        </div>
        <div className='mainCTA'>
            <button className="show-button">Show Local Prayer Times</button>
        </div>
      </div>
    </div>
  );
};
