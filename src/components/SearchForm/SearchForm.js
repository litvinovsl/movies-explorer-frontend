import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import searchIcon from '../../images/icon-search.svg';
import submitIcon from '../../images/search-submit-button.svg';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi';
import { handleMovies, filterByKeyWord, filterByDuration } from '../../utils/utils';

function SearchForm() {
    const context = React.useContext(CurrentUserContext);
    const {
		setMoviesFilterValue,
		moviesFilterValue,
        setMovies,
		movies,
	} = context;

    const handleMoviesSearchClick = (e) => {
		e.preventDefault();
		getAndFilterMovies();
	};
	console.log('input',moviesFilterValue);

    const getAndFilterMovies = () => {
			moviesApi
				.getMovies()
				.then((data) => {
					console.log('1. data: ', data);
					data = handleMovies(data);
					console.log('1. NEWdata: ', data.length);
					const filteredByInputValue = filterByKeyWord(data, moviesFilterValue);
					//нашли наши фильмы по поиску

					setMovies(filteredByInputValue);
					console.log(movies);

					//====== checkbox FILTER ======================
					// if (shortFilmsFilter) {
					// 	setMovies(filterByDuration(movies));
					// }
					if (filteredByInputValue.length) {
						localStorage.setItem('movies', JSON.stringify(filteredByInputValue));
						// console.log('setMovies ARR', localStorage.getItem('movies'));

						// localStorage.setItem('shortFilmsCheckboxValue', shortFilmsFilter);
						// localStorage.setItem('moviesInputValue', moviesFilterValue);
					}
				})
				.catch((err) => {
					console.log(err);
				});
	};

    const handleMoviesInputChange = (e) => {
		setMoviesFilterValue(e.target.value);
	};


    return (
        <Switch>
            <Route path='/movies'>
                <form 
                className='search-form' 
                name='movies-search-form'
                onSubmit={handleMoviesSearchClick} 
                noValidate>
                    <div className='search-form__conteiner'>
                        <img className='search-form__serch-icon' src={searchIcon} alt='' />
                        <input 
                        className='search-form__input' 
                        type='text' 
                        onChange={handleMoviesInputChange}
                        id='movie-input' 
                        placeholder='Фильм' 
                        required/>
                        <button className='search-form__submit' type='submit'><img src={submitIcon} alt='' /></button>
                    </div>
                    <FilterCheckbox />
                </form>
            </Route>
            <Route path='/saved-movies'>
                <form className='search-form' name='saved-movies-search-form' noValidate>
                    <div className='search-form__conteiner'>
                        <img className='search-form__serch-icon' src={searchIcon} alt='' />
                        <input className='search-form__input' type='text' id='movie-input' placeholder='Фильм' required/>
                        <button className='search-form__submit' type='submit'><img src={submitIcon} alt='' /></button>
                    </div>
                    <FilterCheckbox />
                </form>
            </Route>
        </Switch>
    );
}

export default SearchForm;