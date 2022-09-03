import React from 'react'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import foto from '../../images/film.svg';

function MoviesCardList() {
    const name = 'Соберись перед прыжком';
    const time = '1ч 17м';
    return (
        <section className="elements">
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
            <MoviesCard 
                time={time}
                name={name}
                link={foto}
            />
        </section>
    )
};

export default MoviesCardList;