import React from 'react'
import { Route, Switch } from "react-router-dom";
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function MoviesCardList() {
    const context = React.useContext(CurrentUserContext);
    const { moviesWithLikeState, savedMovies } = context;
    // console.log('asdadadad', savedMovies)
    



    return (

        <section className="elements">
            <Switch>
                <Route path="/movies">
                    {moviesWithLikeState.map((movie) => {
                        if (typeof movie.duration === 'number') {
                            movie.duration = Math.trunc(movie.duration / 60) + 'ч ' + (movie.duration % 60) + 'м';
                        }
                        return <MoviesCard key={movie.movieId} movie={movie} />;
                    })}
                </Route>
                <Route path="/saved-movies">
                    {savedMovies.map((movie) => {
                        if (typeof movie.duration === 'number') {
                            movie.duration = Math.trunc(movie.duration / 60) + 'ч ' + (movie.duration % 60) + 'м';
                        }
                        return <MoviesCard key={movie._id} movie={movie} />;
                    })}
                </Route>

            </Switch>
        </section>
    )
};

export default MoviesCardList;