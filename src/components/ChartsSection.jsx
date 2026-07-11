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
          between chart types for the same data. The subject chart shows the distribution of books across the six subject categories, while the decade trend chart shows how the average page length of books has changed over time.
        </p>

        <p>
          Below the charts is a list of the books in the collection, with links to their detail pages.
          Right below the charts in the box is the information about the highest, lowest, and average page lengths and subject items in the collection.
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
