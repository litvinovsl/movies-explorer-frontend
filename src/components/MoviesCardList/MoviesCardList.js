import React from 'react'
import { Route, Switch } from "react-router-dom";
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function MoviesCardList({ movies }) {
    const context = React.useContext(CurrentUserContext);
    const { renderedMovies } = context;

    const [renderedCardsAmount, setRenderedCardsAmount] = React.useState(null);
    const [fixedCardsAmount, setFixedCardsAmount] = React.useState(null);

    const [addedCardsAmount, setAddedCardsAmount] = React.useState(null);

    const [renderedCards, setRenderedCards] = React.useState([]);

    const changeCardsAmount = React.useCallback(() => {
        if (document.documentElement.clientWidth > 1000) {
            if (fixedCardsAmount) {
                setRenderedCardsAmount(fixedCardsAmount);
            } else {
                setRenderedCardsAmount(12);
            }
            setAddedCardsAmount(3);
        } else if (document.documentElement.clientWidth > 800) {
            if (fixedCardsAmount) {
                setRenderedCardsAmount(fixedCardsAmount);
            } else {
                setRenderedCardsAmount(8);
            }
            setAddedCardsAmount(2);
        } else {
            if (fixedCardsAmount) {
                setRenderedCardsAmount(fixedCardsAmount);
            } else {
                setRenderedCardsAmount(5);
            }
            setAddedCardsAmount(1);
        }
    }, [fixedCardsAmount]);

    React.useEffect(() => {
        changeCardsAmount();
    }, [changeCardsAmount]);

    React.useEffect(() => {
        setRenderedCards(renderedMovies.slice(0, renderedCardsAmount));
    }, [renderedMovies, renderedCardsAmount]);

    React.useEffect(() => {
        const handleScreenResize = (e) => {
            setTimeout(changeCardsAmount, 2000);
        };
        window.addEventListener('resize', handleScreenResize);
        return () => {
            window.removeEventListener('resize', handleScreenResize);
        };
    }, [changeCardsAmount]);



    return (

        <section className="elements">
            <Switch>
                <Route path="/movies">
                    {renderedCards.map((movie) => {
                        return <MoviesCard key={movie.movieId} movie={movie} />;
                    })}
                    {/* <MoviesCard
                        time={movies[0].duration}
                        name={movies[0].nameRU}
                        link={foto}
                    /> */}
                    {/* <MoviesCard
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
                    /> */}
                </Route>
                <Route path="/saved-movies">
                    {/* <MoviesCard
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
                    /> */}
                </Route>

            </Switch>
        </section>
    )
};

export default MoviesCardList;