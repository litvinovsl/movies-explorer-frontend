import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoreMovies from '../MoreMovies/MoreMovies';


function Movies() {
    return (
        <main className='movies'>
            <SearchForm />
            <Preloader />
            <MoviesCardList />
            <MoreMovies />
        </main>
    );
}

export default Movies;