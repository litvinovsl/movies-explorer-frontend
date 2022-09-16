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
    } = context;

    const [mySearchMovie, setMySerchMovie] = useState([]);

    // console.log('фильмы в мовиес ',movies);

    const getSavedSearchResults = useCallback(() => {
        // console.log('тут');
        const savedSearchResult = JSON.parse(localStorage.getItem('movies'));
		// console.log('тут ARR', localStorage.getItem('movies'));

        if (savedSearchResult) {
            setMovies(savedSearchResult);
        }
    },[setMovies]);

    useEffect(() => {
        getSavedSearchResults();
    }, [getSavedSearchResults]);

    return (
        <main className='movies'>
            <SearchForm />
            {/* <Preloader /> */}
            <MoviesCardList
                movies={mySearchMovie} 
                />
            <MoreMovies />
        </main>
    );
}

export default Movies;