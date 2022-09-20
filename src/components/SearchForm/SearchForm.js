import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
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
		setIsPreloader,
		setSavedMoviesFilterValue,
		setAllInitilMovies,
		savedMovies,
		savedMoviesFilterValue,
		setSavedMovies,
		savedMoviesWithFilter,
		setSavedMoviesWithFilter,
		// isFiltered, 
		// setIsFiltered
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
				// console.log('isPreloader', isPreloader);
				data = handleMovies(data);
				// console.log(allInitilMovies);
				let filteredMovies = filterByKeyWord(data, moviesFilterValue);
				setAllInitilMovies(data);
				setMovies(filteredMovies);
				//====== checkbox FILTER ======================
				let fullFiltered = [];
				// console.log(shortFilmsFilter);
				if (shortFilmsFilter) {
					fullFiltered = filterByDuration(filteredMovies);
					setMovies(fullFiltered);
					// setAllInitilMovies(filteredMovies);

				} else {
					// setMovies(filteredMovies);
					fullFiltered = filteredMovies;
				}
				if (fullFiltered.length) {
					localStorage.setItem('movies', JSON.stringify(fullFiltered));
					// localStorage.setItem('initialMovies', JSON.stringify(allInitilMovies));
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
				// console.log('isPreloader-fin', isPreloader);
			});
	};

	const handleMoviesInputChange = (e) => {
		setMoviesFilterValue(e.target.value);
	};


	//=======================================================================


	const handleSavedMoviesSearchClick = (e) => {
		e.preventDefault();
		setIsPreloader(true);
		getAndFilterSavedMovies();
	};

	const getAndFilterSavedMovies = () => {
		setSavedMoviesWithFilter(savedMovies);
		// console.log('filter', savedMoviesWithFilter);
		// console.log('saved ', savedMovies);
		let filteredSavedMovies = filterByKeyWord(savedMovies, savedMoviesFilterValue);
		let fullFiltered = [];

		// console.log(savedMoviesFilterValue.length > 0 && shortFilmsFilter);

		let savedMovieWithDuration = savedMoviesFilterValue.length > 0 && shortFilmsFilter ? filteredSavedMovies : savedMovies;
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
			// console.log('length')
			setSavedMoviesWithFilter(filteredSavedMovies);
			// console.log(shortFilmsFilter);
		} if (shortFilmsFilter) {
			// console.log('short')
			// console.log('short filteredSavedMovies ',filteredSavedMovies)
			// console.log('short obj ',savedMovieWithDuration)
			// fullFiltered = filterByDuration(savedMovieWithDuration);

			setSavedMoviesWithFilter(fullFiltered);
		} if (!shortFilmsFilter && savedMoviesFilterValue.length === 0) {
			// console.log('else')
			setSavedMoviesWithFilter(savedMovies);
		}



		// console.log('savedMovies ',savedMovies);
		// console.log('savedMovieWithDuration ',savedMovieWithDuration);


		// const string = '1ч 20м';
		// let arr = string.split(' ');
		// arr[0] = parseInt(arr[0].match(/\d+/));
		// arr[1] = parseInt(arr[1].match(/\d+/));
		// let minute = arr[0] * 60 + arr[1];
		// console.log('string= ', string, ', num= ',minute);

		// if (shortFilmsFilter) {
		// 	setSavedMovies(filterByDuration(savedMovies));
		// 	// setSavedMovies(fullFiltered);
		// 	// setAllInitilMovies(filteredMovies);

		// } 


		setIsPreloader(false);

	};

	const handleSavedMoviesInputChange = (e) => {
		setSavedMoviesFilterValue(e.target.value);
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
		</Switch>
	);
}

export default SearchForm;