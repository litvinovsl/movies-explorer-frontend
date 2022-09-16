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
		shortFilmsFilter,
		setIsPreloader,
		isPreloader
	} = context;

	const handleMoviesSearchClick = (e) => {
		e.preventDefault();
		setIsPreloader(true);
		getAndFilterMovies();
	};

	const getAndFilterMovies = () => {
		moviesApi
			.getMovies()
			.then((data) => {
				console.log('isPreloader', isPreloader);
				data = handleMovies(data);
				let filteredMovies = filterByKeyWord(data, moviesFilterValue);
				//====== checkbox FILTER ======================
				if (shortFilmsFilter) {
					filteredMovies = filterByDuration(filteredMovies);
					setMovies(filteredMovies);
				} else {
					setMovies(filteredMovies);
				}
				if (filteredMovies.length) {
					localStorage.setItem('movies', JSON.stringify(filteredMovies));
					// console.log('setMovies ARR', localStorage.getItem('movies'));

					// localStorage.setItem('shortFilmsCheckboxValue', shortFilmsFilter);
					// localStorage.setItem('moviesInputValue', moviesFilterValue);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsPreloader(false);
				console.log('isPreloader-fin', isPreloader);
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
							required />
						<button className='search-form__submit' type='submit'><img src={submitIcon} alt='' /></button>
					</div>
					<FilterCheckbox />
				</form>
			</Route>
			<Route path='/saved-movies'>
				<form className='search-form' name='saved-movies-search-form' noValidate>
					<div className='search-form__conteiner'>
						<img className='search-form__serch-icon' src={searchIcon} alt='' />
						<input className='search-form__input' type='text' id='movie-input' placeholder='Фильм' required />
						<button className='search-form__submit' type='submit'><img src={submitIcon} alt='' /></button>
					</div>
					<FilterCheckbox />
				</form>
			</Route>
		</Switch>
	);
}

export default SearchForm;