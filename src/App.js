import React, { useState, useEffect } from 'react';
import './App.css';
import {PrayerTimeBlock} from './components/PrayerTimeBlock.js';
import {Modal} from './components/Modal.js';
import {Navbar} from './components/Navbar.js';
import axios from 'axios';

// The main App component where we fetch the prayer times and render the prayer time cards.
// The prayerTimes state holds the array of prayer time information.
// useEffect hook is used to perform the API call when the component mounts to the DOM.
// This function is declared to fetch the prayer times from the Al-Adhan API.
// We construct the current date string in the required API format.

function App() {
  const [prayerTimes, setPrayerTimes] = useState([]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const today = new Date();
      const date = today.getDate().toString().padStart(2, '0');
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const year = today.getFullYear();

      try {
        // We use axios to make a GET request to the API with the correct parameters.
        const response = await axios.get(`https://api.aladhan.com/v1/timings/${date}-${month}-${year}`, {
          params: {
            latitude: 51.0447, // Latitude for Calgary
            longitude: -114.0719, // Longitude for Calgary
            method: 2 // ISNA method for prayer time calculation
          },
        });

        // Once we get the response, we extract the timings data.
        const timings = response.data.data.timings;

        // We then map the timings data to an array with additional details for each prayer.
        const times = [
          { name: 'Fajr', time: timings.Fajr, details: '2 Sunnah, 2 Farz' },
          { name: 'Dhuhr', time: timings.Dhuhr, details: '4 Sunnah, 4 Farz, 2 Sunnah' },
          { name: 'Asr', time: timings.Asr, details: '4 Farz' },
          { name: 'Maghrib', time: timings.Maghrib, details: '3 Farz, 2 Sunnah' },
          { name: 'Isha', time: timings.Isha, details: '4 Farz, 2 Sunnah, 3 Witr' },
          // Add or remove any prayers as needed
        ];

        // Finally, we update the prayerTimes state with the new array.
        setPrayerTimes(times);
      } catch (error) {
        // If there is an error in the API call, we log it to the console.
        console.error('Could not fetch prayer times:', error);
      }
    };

    // We call the fetchPrayerTimes function to execute the API call.
    fetchPrayerTimes();
  }, []);

  // State to control visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal is open by default

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // The App component renders a header and a grid of PrayerTimeBlock components.
  return (
    <div className="App">

      <Navbar />

      <Modal show={isModalOpen} onClose={closeModal} />

      <header className="App-header"></header>

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
  );
}

// We export the App component to be used in other parts of our application.
export default App;
