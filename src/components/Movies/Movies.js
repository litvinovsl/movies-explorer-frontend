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
        shortFilmsFilter
    } = context;

    const [mySearchMovie, setMySerchMovie] = useState([]);
    // console.log('mySearchMovie: ',mySearchMovie);


    // console.log('фильмы в мовиес ',movies);

    const getSavedSearchResults = useCallback(() => {
        // console.log('тут');
        const savedSearchResult = JSON.parse(localStorage.getItem('movies'));
        // console.log('тут ARR', localStorage.getItem('movies'));

        if (savedSearchResult) {
            setMovies(savedSearchResult);
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
				<MoviesCardList />
			) : null}
            {/* <MoviesCardList /> */}
            <MoreMovies />
        </main>
    );
}

export default Movies;