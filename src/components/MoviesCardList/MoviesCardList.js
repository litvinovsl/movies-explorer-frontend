import React from 'react'
import { Route, Switch } from "react-router-dom";
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import foto from '../../images/film.svg';

function MoviesCardList() {
    const name = 'Соберись перед прыжком';
    const time = '1ч 17м';
    return (

        <section className="elements">
            <Switch>
                <Route path="/movies">
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                </Route>
                <Route path="/saved-movies">
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                    <MoviesCard
                        time={time}
                        name={name}
                        link={foto}
                    />
                </Route>

            </Switch>
        </section>
    )
};

export default MoviesCardList;