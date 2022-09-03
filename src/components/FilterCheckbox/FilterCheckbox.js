import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <div className='filter'>
            <input type='checkbox' id='check' className='filter__checkbox' name='filterCheckbox' />
            <label htmlFor="check"></label>
            <span className='filter__span'>Короткометражки</span>
        </div>
    );
}

export default FilterCheckbox;