import { useEffect, useContext, useCallback, useState } from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoreMovies from '../MoreMovies/MoreMovies';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { handleDuration } from '../../utils/utils';


function Movies({ loggedIn }) {
    const context = useContext(CurrentUserContext);
    const {
        movies,
        setMovies,
        isPreloader,
        savedMovies,
        setMoviesWithLikeState,
        shortFilmsFilter,
        setMoviesFilterValue,
        setShortFilmsFilter
    } = context;

    const getSavedSearchResults = useCallback(() => {
        // console.log('тут');
        const savedSearchResult = JSON.parse(localStorage.getItem('movies'));
        const savedInputValue = localStorage.getItem('moviesInputValue');
        const savedCheckboxValue = JSON.parse(localStorage.getItem('shortFilmsCheckboxValue'));
        // console.log('tyt savedCheckboxValue ', savedCheckboxValue);
        if (savedSearchResult) {
            setMovies(savedSearchResult);
        }
        if (savedCheckboxValue) {
            setShortFilmsFilter(savedCheckboxValue)
        }
        if (savedInputValue){
            setMoviesFilterValue(savedInputValue);
        }
    }, [setMovies]);

    // console.log('preload: ', isPreloader);


    useEffect(() => {
        getSavedSearchResults();
    }, [getSavedSearchResults]);

    useEffect(() => {
        let moviesWithLike = [];
        moviesWithLike = [...movies];
        moviesWithLike = moviesWithLike.map((item) => {
            return {
                ...item,
                isLiked: savedMovies.some((savedMovie) => {
                    return item.movieId === savedMovie.movieId;
                }),
            };
        });

        setMoviesWithLikeState(moviesWithLike);
        // console.log(moviesWithLike);
    }, [movies, savedMovies, setMoviesWithLikeState, shortFilmsFilter])

    return (
        <main className='movies'>
            <SearchForm />
            {isPreloader ? (
                <Preloader />
            ) : movies.length ? (
                <>
                    <MoviesCardList />
                    <MoreMovies />
                </>
            ) : 
            <div className="movies__not-found">
                <p className="movies__not-found-text">По вашему запросу фильмы не обнаружены, попробуйте поискать что-то другое</p>
            </div>}
        </main>
    );
}

export default Movies;