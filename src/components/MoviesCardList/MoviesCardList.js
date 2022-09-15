import React from 'react'
import { Route, Switch } from "react-router-dom";
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function MoviesCardList() {
    const context = React.useContext(CurrentUserContext);
    const { movies } = context;

    return (

        <section className="elements">
            <Switch>
                <Route path="/movies">
                    {movies.map((movie) => {
                        return <MoviesCard key={movie.movieId} movie={movie} />;
                    })}
                </Route>
                <Route path="/saved-movies">
                </Route>

            </Switch>
        </section>
    )
};

export default MoviesCardList;