import React from 'react';
import { Route } from 'react-router-dom';
import './FilterCheckbox.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';


function FilterCheckbox() {
    const context = React.useContext(CurrentUserContext);
    const {
        shortFilmsFilter,
        setShortFilmsFilter,
        shortSavedFilmsFilter, 
        setShortSavedFilmsFilter
    } = context;
    function chengeMainCheckbox() {
        setShortFilmsFilter(!shortFilmsFilter)
    }

    function chengeSavedCheckbox() {
        setShortSavedFilmsFilter(!shortSavedFilmsFilter)
    }

    return (
        <div className='filter'>
            <Route exact path='/movies'>
                <input type='checkbox'
                    id='check'
                    className='filter__checkbox'
                    name='filterCheckbox'
                    checked={shortFilmsFilter}
                    onChange={chengeMainCheckbox} />
            </Route>
            <Route exact path='/saved-movies'>
                <input type='checkbox'
                    id='check'
                    className='filter__checkbox'
                    name='filterCheckbox'
                    checked={shortSavedFilmsFilter}
                    onChange={chengeSavedCheckbox} />
            </Route>
            <label htmlFor="check"></label>
            <span className='filter__span'>Короткометражки</span>
        </div>
    );
}

export default FilterCheckbox;