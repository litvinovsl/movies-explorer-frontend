import { useContext } from 'react';
import { Route } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import searchIcon from '../../images/icon-search.svg';
import submitIcon from '../../images/search-submit-button.svg';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi';
import { handleMovies, filterByKeyWord, filterByDuration } from '../../utils/utils';

function SearchForm() {
	const context = useContext(CurrentUserContext);
	const {
		setMoviesFilterValue,
		moviesFilterValue,
		setMovies,
		shortFilmsFilter,
		shortSavedFilmsFilter,
		setIsPreloader,
		setSavedMoviesFilterValue,
		setAllInitilMovies,
		savedMovies,
		savedMoviesFilterValue,
		setSavedMoviesWithFilter,
	} = context;
	const handleMoviesSearchClick = (e) => {
		e.preventDefault();
		if (moviesFilterValue === ''){
			return
		}
		setIsPreloader(true);
		getAndFilterMovies();
	};

	const getAndFilterMovies = () => {
		moviesApi
			.getMovies()
			.then((data) => {
				data = handleMovies(data);
				let filteredMovies = filterByKeyWord(data, moviesFilterValue);
				setAllInitilMovies(data);
				setMovies(filteredMovies);
				let fullFiltered = [];
				if (shortFilmsFilter) {
					fullFiltered = filterByDuration(filteredMovies);
					setMovies(fullFiltered);
				} else {
					fullFiltered = filteredMovies;
				}
				if (fullFiltered.length) {
					localStorage.setItem('movies', JSON.stringify(fullFiltered));
					localStorage.setItem('shortFilmsCheckboxValue', shortFilmsFilter);
					localStorage.setItem('moviesInputValue', moviesFilterValue);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsPreloader(false);
			});
	};

	const handleMoviesInputChange = (e) => {
		if(e.target.value === ''){
			return
		} else {
			setMoviesFilterValue(e.target.value);
		}
	};

	//==============================for saved-movies=========================================

	const handleSavedMoviesSearchClick = (e) => {
		e.preventDefault();
		setIsPreloader(true);
		getAndFilterSavedMovies();
	};

	const getAndFilterSavedMovies = () => {
		setSavedMoviesWithFilter(savedMovies);
		let filteredSavedMovies = filterByKeyWord(savedMovies, savedMoviesFilterValue);
		let fullFiltered = [];
		let savedMovieWithDuration = savedMoviesFilterValue.length > 0 && shortSavedFilmsFilter ? filteredSavedMovies : savedMovies;
		savedMovieWithDuration = savedMovieWithDuration.map((movie) => {
			if (typeof movie.duration === 'string') {
				let minutes = movie.duration.split(' ');
				minutes[0] = parseInt(minutes[0].match(/\d+/));
				minutes[1] = parseInt(minutes[1].match(/\d+/));
				let durationNumber = minutes[0] * 60 + minutes[1];
				movie.duration = durationNumber
				return movie
			}
			return movie
		})

		if (savedMoviesFilterValue.length > 0) {
			setSavedMoviesWithFilter(filteredSavedMovies);
		} if (shortSavedFilmsFilter) {
			fullFiltered = filterByDuration(savedMovieWithDuration);
			setSavedMoviesWithFilter(fullFiltered);
		} if (!shortSavedFilmsFilter && savedMoviesFilterValue.length === 0) {
			setSavedMoviesWithFilter(savedMovies);
		}
		setIsPreloader(false);
	};

	const handleSavedMoviesInputChange = (e) => {
		setSavedMoviesFilterValue(e.target.value);
	};

	return (
		// <Switch>
		<>
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
							defaultValue={moviesFilterValue || ''}
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
				<form
					className='search-form'
					name='saved-movies-search-form'
					onSubmit={handleSavedMoviesSearchClick}
					noValidate>
					<div className='search-form__conteiner'>
						<img className='search-form__serch-icon' src={searchIcon} alt='' />
						<input
							className='search-form__input'
							type='text'
							defaultValue={savedMoviesFilterValue || ''}
							onChange={handleSavedMoviesInputChange}
							id='movie-input'
							placeholder='Фильм'
							required />
						<button
							className='search-form__submit'
							type='submit'>
							<img src={submitIcon} alt='' />
						</button>
					</div>
					<FilterCheckbox />
				</form>
			</Route>
			</>
		// </Switch>
	);
}

export default SearchForm;