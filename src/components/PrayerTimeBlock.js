import React, {useState} from 'react';
// This component represents a single prayer time card.
// It takes in the prayerName, time, and details as props for display.
// It also manages the state for the Qaza counter within the card.
// useState hook is used to keep track of the Qaza count for each prayer.
// It starts at 0 and can be increased or decreased with the buttons.

export const PrayerTimeBlock = ({ prayerName, time, details }) => {
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
}