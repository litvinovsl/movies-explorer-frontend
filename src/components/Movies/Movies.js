import { useEffect, useContext, useCallback } from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { Route } from "react-router-dom";

function Movies() {
    const context = useContext(CurrentUserContext);
    const {
        movies,
        setMovies,
        isPreloader,
        savedMovies,
        setMoviesWithLikeState,
        shortFilmsFilter,
        setMoviesFilterValue,
        setShortFilmsFilter,
        savedMoviesWithFilter
    } = context;

    const getSavedSearchResults = useCallback(() => {
        const savedSearchResult = JSON.parse(localStorage.getItem('movies'));
        const savedInputValue = localStorage.getItem('moviesInputValue');
        const savedCheckboxValue = JSON.parse(localStorage.getItem('shortFilmsCheckboxValue'));
        if (savedSearchResult) {
            setMovies(savedSearchResult);
        }
        if (savedCheckboxValue) {
            setShortFilmsFilter(savedCheckboxValue)
        }
        if (savedInputValue) {
            setMoviesFilterValue(savedInputValue);
        }
    }, [setMovies, setShortFilmsFilter, setMoviesFilterValue]);

    useEffect(() => {
        getSavedSearchResults();
    }, [getSavedSearchResults]);
    // console.log('savedMoviesWithFilter')


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
    }, [movies, savedMovies, setMoviesWithLikeState, shortFilmsFilter])

    return (
        <main className='movies'>
            <SearchForm />
            <Route exact path='/movies'>
                {isPreloader ? (
                    <Preloader />
                ) : movies.length ? (
                    <>
                        <MoviesCardList />
                    </>
                ) :
                    <div className="movies__not-found">
                        <p className="movies__not-found-text">По вашему запросу фильмов не обнаружено, попробуйте поискать еще.</p>
                    </div>}
            </Route>
            <Route exact path='/saved-movies'>
                {savedMoviesWithFilter.length ? (
                    <>
                        <MoviesCardList />
                    </>
                ) :
                    <div className="movies__not-found">
                        <p className="movies__not-found-text">У вас нет сохраненных фильмов.</p>
                    </div>}
            </Route>
        </main>
    );
}

export default Movies;