import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <dev className='filter'>
            <input type='checkbox' id='check' className='filter__checkbox' name='filterCheckbox' />
            <label for="check"></label>
            <span className='filter__span'>Короткометражки</span>
        </dev>
    );
}

export default FilterCheckbox;