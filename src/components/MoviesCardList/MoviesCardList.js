import React from 'react'
import { Route, Switch } from "react-router-dom";
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function MoviesCardList({ mySearchMovie }) {
    const context = React.useContext(CurrentUserContext);
    const { movies } = context;
    // console.log('asdadadad', movies)



    return (

        <section className="elements">
            <Switch>
                <Route path="/movies">
                    {movies.map((movie) => {
                        // console.log('1 : ', typeof movie.duration);
                        if (typeof movie.duration === 'number') {
                            movie.duration = Math.trunc(movie.duration / 60) + 'ч ' + (movie.duration % 60) + 'м';
                        }
                        // console.log('2 : ', typeof movie.duration);
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