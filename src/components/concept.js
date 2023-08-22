// Concept.js

import React from 'react';

const Concept = ({ calculationsTemplate, showCalculations, setShowCalculations }) => {
  return (
    <div>
      {/* Button to toggle calculation template */}
      <button onClick={() => setShowCalculations(!showCalculations)}>
        Formulas
      </button>

      {/* Section for calculationsTemplate */}
      {showCalculations && (
        <div id="calculations">
          <h2>Methods & Concepts</h2>
          {calculationsTemplate.map((calculation, index) => (
            <div key={index} className="calculation">
              <h3>{calculation.concept}</h3>
              <p>{calculation.example}</p>
              <p>{calculation.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Concept;
