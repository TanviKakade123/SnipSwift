// TextComponent.js

import React from 'react';
import './TextComponent.css'; // Importing CSS file for styling

const TextComponent = ({ text }) => {
  return (
    <div className="text-container">
      <p className="text">{text}</p>
    </div>
  );
};

export default TextComponent;
