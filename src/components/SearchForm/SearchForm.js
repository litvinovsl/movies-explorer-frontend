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
		setAllInitilMovies
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
				console.log(shortFilmsFilter);
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
		// getAndFilterSavedMovies();
	};

	// const getAndFilterSavedMovies = () => {
	// 	const token = localStorage.getItem('jwt');
	// 	api
	// 		.getMovies(token)
	// 		.then((data) => {
	// 			// console.log(data);
	// 			let filteredMovies = filterByKeyWord(data, savedMoviesFilterValue);
	// 			setSavedMovies(filteredMovies);
	// 			if (savedMovies.length) {
	// 				localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
	// 				console.log(JSON.parse(localStorage.getItem('saved-movies')));
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		})
	// 		.finally(() => {
	// 			setIsPreloader(false);
	// 			// console.log('isPreloader-fin', isPreloader);
	// 		});
	// };

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