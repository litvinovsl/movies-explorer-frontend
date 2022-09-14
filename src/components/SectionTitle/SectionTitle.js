import React from 'react';
import './SectionTitle.css';

function SectionTitle({ children, classPlus }) {
  return (
    <div className={`section-title ${classPlus}`}>
      <h2 className='section-title__title'>
        {children}
      </h2>
    </div>
  );
}

export default SectionTitle;