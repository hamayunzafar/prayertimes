import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './prayerTimesLogoWhite.svg'

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
};

export const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
    </nav>
  );
};

export const Modal = ({ show, onClose }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">Search and select your city to see your prayer times</h4>
            <button onClick={onClose} className="close-button">&times;</button>
          </div>
          <div className="modal-body">
            <p>You only need to do it once</p>
            <input type="text" placeholder="Type your city..." className="city-input" />
            <button className="show-button">Show Local Prayer Times</button>
          </div>
        </div>
      </div>
    );
  };