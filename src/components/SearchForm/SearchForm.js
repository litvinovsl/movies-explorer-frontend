import React from 'react';
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
        initialMovies,
        setInitialMovies,
        setMovies,
        moviesInputValue,
        setMoviesInputValue,
        shortFilmsCheckboxValue,
        setIsFirstSearchHappened,
	} = context;

    const handleMoviesSearchClick = (e) => {
		e.preventDefault();
		getAndFilterMovies();
	};

    const getAndFilterMovies = () => {
			moviesApi
				.getMovies()
				.then((data) => {
					data = handleMovies(data);
					setInitialMovies(data);
					setIsFirstSearchHappened(true);
					const filteredByKeyWord = filterByKeyWord(data, moviesInputValue);
					setMovies(filteredByKeyWord);
					let finallyFiltered = [];
					if (shortFilmsCheckboxValue) {
						finallyFiltered = filterByDuration(filteredByKeyWord);
					} else {
						finallyFiltered = filteredByKeyWord;
					}
					if (finallyFiltered.length) {
						localStorage.setItem('movies', JSON.stringify(finallyFiltered));
						localStorage.setItem('shortFilmsCheckboxValue', shortFilmsCheckboxValue);
						localStorage.setItem('moviesInputValue', moviesInputValue);
					}
				})
				.catch((err) => {
					console.log(err);
				});
			try {
				const filteredByKeyWord = filterByKeyWord(initialMovies, moviesInputValue);
				setMovies(filteredByKeyWord);
				let finallyFiltered = [];
				if (shortFilmsCheckboxValue) {
					finallyFiltered = filterByDuration(filteredByKeyWord);
				} else {
					finallyFiltered = filteredByKeyWord;
				}
				if (finallyFiltered.length) {
					localStorage.setItem('movies', JSON.stringify(finallyFiltered));
					localStorage.setItem('shortFilmsCheckboxValue', shortFilmsCheckboxValue);
					localStorage.setItem('moviesInputValue', moviesInputValue);
				} else {
                    console.log('DONT films')
				}
			} catch (err) {
				console.log(err);
			}
	};

    const handleMoviesInputChange = (e) => {
		setMoviesInputValue(e.target.value);
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