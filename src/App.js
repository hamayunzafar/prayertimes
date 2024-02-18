import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import logo from './prayerTimesLogoWhite.svg'

// This component represents a single prayer time card.
// It takes in the prayerName, time, and details as props for display.
// It also manages the state for the Qaza counter within the card.
const PrayerTimeBlock = ({ prayerName, time, details }) => {
  // useState hook is used to keep track of the Qaza count for each prayer.
  // It starts at 0 and can be increased or decreased with the buttons.
  const [qazaCount, setQazaCount] = useState(0);

  // The return statement renders the card structure with the prayer information and Qaza counter.
  return (
    <div className="card">
      <div className="card-header">{prayerName}</div>
      <div className="card-time">{time}</div>
      <div className="card-details">{details}</div>
      <div className="card-counter">
        <button className="counter-button" onClick={() => setQazaCount(Math.max(qazaCount - 1, 0))}>-</button>
        <input type="text" className="counter-value" value={qazaCount} readOnly />
        <button className="counter-button" onClick={() => setQazaCount(qazaCount + 1)}>+</button>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
    </nav>
  );
};

// The main App component where we fetch the prayer times and render the prayer time cards.
function App() {
  // The prayerTimes state holds the array of prayer time information.
  const [prayerTimes, setPrayerTimes] = useState([]);

  // useEffect hook is used to perform the API call when the component mounts to the DOM.
  useEffect(() => {
    // This function is declared to fetch the prayer times from the Al-Adhan API.
    const fetchPrayerTimes = async () => {
      // We construct the current date string in the required API format.
      const today = new Date();
      const date = today.getDate().toString().padStart(2, '0');
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const year = today.getFullYear();

      try {
        // We use axios to make a GET request to the API with the correct parameters.
        const response = await axios.get(`http://api.aladhan.com/v1/timings/${date}-${month}-${year}`, {
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

  // The App component renders a header and a grid of PrayerTimeBlock components.
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
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
      </header>
    </div>
  );
}

// We export the App component to be used in other parts of our application.
export default App;
