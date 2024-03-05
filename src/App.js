import React, { useState, useEffect } from 'react';
import './App.css';

import {Modal} from './components/Modal.js'
import {Navbar} from './components/Navbar.js'
import {fetchPrayerTimes} from './components/PrayerTimesApiCall.js'
import {PrayerTimeBlock} from './components/PrayerTimeBlock.js'

// The main App component where we fetch the prayer times and render the prayer time cards.
// The prayerTimes state holds the array of prayer time information.
// useEffect hook is used to perform the API call when the component mounts to the DOM.
// This function is declared to fetch the prayer times from the Al-Adhan API.
// We construct the current date string in the required API format.

function App() {
  //API Call for getting the prayer times
  const [prayerTimes, setPrayerTimes] = useState([]);
  useEffect(() => {
    fetchPrayerTimes(setPrayerTimes);
  }, []);

  //Modal functions
  const [showModal, setShowModal] = useState(true); // Start with the modal open
  const handleClose = () => {
    setShowModal(false);
  };

  // The App component renders a header and a grid of PrayerTimeBlock components.
  return (
    <div className="App">

      <Navbar />

      <div className='main-content'>

        <div className='top-text'>
        </div>

        <div className="grid-container">
          {prayerTimes.map((prayer, index) => (
            <PrayerTimeBlock
              key={index} // React requires a unique key for list items.
              prayerName={prayer.name}
              time={prayer.time}
              details={prayer.details}
            />
          ))}
        </div>

      </div>

      <div className="App">
        <Modal show={showModal} onClose={handleClose} />
      </div>
    
    </div>
  );
}

// We export the App component to be used in other parts of our application.
export default App;