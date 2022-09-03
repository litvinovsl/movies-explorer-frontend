import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './SearchForm.css';
import searchIcon from '../../images/icon-search.svg';
import submitIcon from '../../images/search-submit-button.svg';

function SearchForm() {
    return (
        <Switch>
            <Route path='/movies'>
                <form className='search-form' name='movies-search-form' noValidate>
                    <div className='search-form__conteiner'>
                        <img className='search-form__serch-icon' src={searchIcon} alt='' />
                        <input className='search-form__input' type='text' id='movie-input' placeholder='Фильм' />
                        <button className='search-form__submit' type='submit'><img src={submitIcon} alt='' /></button>
                    </div>
                    {/* <input type='checkbox' className='filter__checkbox' name='filterCheckbox'/> */}
                </form>
            </Route>
        </Switch>
    );
}

export default SearchForm;