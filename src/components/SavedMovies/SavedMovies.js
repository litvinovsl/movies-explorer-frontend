import { useEffect, useContext, useCallback, useState } from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoreMovies from '../MoreMovies/MoreMovies';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { handleDuration } from '../../utils/utils';


function Movies() {
    const context = useContext(CurrentUserContext);
    const {
        movies,
        setSavedMovies,
        isPreloader,
        savedMovies,
        setMoviesWithLikeState,
        shortFilmsFilter
    } = context;

    const getSavedMovieSearchResults = useCallback(() => {
        // console.log('тут');
        const savedMovieSearchResult = JSON.parse(localStorage.getItem('saved-movies'));
        // console.log('тут ARR', localStorage.getItem('movies'));

        if (savedMovieSearchResult) {
            setSavedMovies(savedMovieSearchResult);
        }
    }, [setSavedMovies]);

    useEffect(() => {
        getSavedMovieSearchResults();
    }, [getSavedMovieSearchResults]);

    return (
        <main className='saved-movies'>
            <SearchForm />
            {isPreloader ? (
                <Preloader />
            ) : movies.length ? (
                <MoviesCardList />
            ) : null}
            {/* <MoviesCardList /> */}
            <MoreMovies />
        </main>
    );
}

export default Movies;