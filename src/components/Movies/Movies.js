import { useEffect, useContext, useCallback } from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoreMovies from '../MoreMovies/MoreMovies';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { handleDuration, filterByDuration } from '../../utils/utils';


function Movies({ loggedIn }) {
    const context = useContext(CurrentUserContext);
    const {
        movies,
        setMovies,
        setRenderedMovies,
        setMoviesInputValue,
        shortFilmsCheckboxValue,
        setShortFilmsCheckboxValue,
        savedMovies,
    } = context;

    // console.log(movies);

    const getSavedSearchResults = useCallback(() => {
        const savedSearchResult = JSON.parse(localStorage.getItem('movies'));
        const savedSearchText = localStorage.getItem('moviesInputValue');
        const savedСheckboxState = JSON.parse(
            localStorage.getItem('shortFilmsCheckboxValue')
        );
        if (savedSearchResult) {
            setMovies(savedSearchResult);
        }
        if (savedSearchText) {
            setMoviesInputValue(savedSearchText);
        }
        if (savedСheckboxState) {
            setShortFilmsCheckboxValue(savedСheckboxState);
        }
    }, [setMovies, setMoviesInputValue, setShortFilmsCheckboxValue]);

    useEffect(() => {
        getSavedSearchResults();
    }, [getSavedSearchResults]);

    useEffect(() => {
        let renderedFilms;
        if (shortFilmsCheckboxValue) {
            renderedFilms = filterByDuration(movies);
        } else {
            renderedFilms = [...movies];
        }
        renderedFilms = handleDuration(renderedFilms);
        setRenderedMovies(renderedFilms);
    }, [movies, savedMovies, setRenderedMovies, shortFilmsCheckboxValue]);




    return (
        <main className='movies'>
            <SearchForm />
            {/* <Preloader /> */}
            <MoviesCardList
                movies={movies} />
            <MoreMovies />
        </main>
    );
}

export default Movies;