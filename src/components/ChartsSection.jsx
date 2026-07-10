import React from 'react';
import SubjectChart from './charts/SubjectChart';
import DecadeTrendChart from './charts/DecadeTrendChart';

const ChartsSection = ({ currentData, SUBJECTS }) => {
  return (
    <section className="charts-section">
      <div className="charts-intro">
        <h2>What's in this collection?</h2>
        <p>
          These charts update live as filters below are adjusted, so they always reflect exactly
          what's in the table beneath them. Use the toggle buttons in each card's header to switch
          between chart types for the same data.
        </p>
      </div>
      <div className="charts-grid">
        <SubjectChart data={currentData} SUBJECTS={SUBJECTS} />
        <DecadeTrendChart data={currentData} />
      </div>
    </section>
  );
};

export default ChartsSection;