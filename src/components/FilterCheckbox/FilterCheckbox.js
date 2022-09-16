import React from 'react';
import './FilterCheckbox.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';


function FilterCheckbox() {
    const context = React.useContext(CurrentUserContext);
    const {
		shortFilmsFilter,
        setShortFilmsFilter,
	} = context;
    function chengeCheckbox(){
        setShortFilmsFilter(!shortFilmsFilter)
    }

    return (
        <div className='filter'>
            <input type='checkbox'
                id='check'
                className='filter__checkbox'
                name='filterCheckbox'
                checked={shortFilmsFilter} 
                onChange={chengeCheckbox} />
            <label htmlFor="check"></label>
            <span className='filter__span'>Короткометражки</span>
        </div>
    );
}

export default FilterCheckbox;