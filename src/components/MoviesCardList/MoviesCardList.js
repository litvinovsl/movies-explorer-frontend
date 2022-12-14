import { useState, useEffect, useContext, useCallback } from 'react';
import { Route, Switch } from "react-router-dom";
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreMovies from '../MoreMovies/MoreMovies';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function MoviesCardList() {
    const context = useContext(CurrentUserContext);
    const { moviesWithLikeState,
        savedMoviesWithFilter,
        renderedMovieCards,
        setRenderedMovieCards, } = context;
    const [renderedMovieQuantity, setRenderedMovieQuantity] = useState(null);
    const [moreButtonVisible, setMoreButtonVisible] = useState(true);
    const [addedMovies, setAddedMovies] = useState(null);

    const getWidth = () => window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    const widthSize = useCurrentWidth();

    function useCurrentWidth() {
        let [width, setWidth] = useState(getWidth());
        useEffect(() => {
            let timeoutId = null;
            const resizeListener = () => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => setWidth(getWidth()), 600);
            };
            window.addEventListener('resize', resizeListener);
            return () => {
                window.removeEventListener('resize', resizeListener);
            }
        }, [])

        return width;
    }

    const cardDisplay = useCallback(() => {
        if (widthSize > 1279) {
            setRenderedMovieQuantity(12);
            setAddedMovies(3);
        }
        else if (widthSize > 783) {
            setRenderedMovieQuantity(8);
            setAddedMovies(2);
        }
        else if (widthSize <= 783) {
            setRenderedMovieQuantity(5);
            setAddedMovies(1);
        }
    }, [widthSize])

    useEffect(() => {
        cardDisplay();
    }, [cardDisplay, widthSize]);

    useEffect(() => {
        setRenderedMovieCards(moviesWithLikeState.slice(0, renderedMovieQuantity));
        if (moviesWithLikeState.length <= renderedMovieQuantity) {
            setMoreButtonVisible(false);
        } else {
            setMoreButtonVisible(true);
        }
    }, [moviesWithLikeState, renderedMovieQuantity, setRenderedMovieCards]);

    function handleMoreMoviesClick() {
        if (renderedMovieCards.length < moviesWithLikeState.length) {
            setRenderedMovieQuantity(renderedMovieQuantity + addedMovies);
        } else if (renderedMovieCards.length === moviesWithLikeState.length) {
            setMoreButtonVisible(false);
        }
    }

    return (
        <>
            <section className="elements">
                <Switch>
                    <Route path="/movies">
                        {renderedMovieCards.map((movie) => {
                            if (typeof movie.duration === 'number') {
                                movie.duration = Math.trunc(movie.duration / 60) + '?? ' + (movie.duration % 60) + '??';
                            }
                            return <MoviesCard key={movie.movieId} movie={movie} />;
                        })}
                    </Route>
                    <Route path="/saved-movies">
                        {savedMoviesWithFilter.map((movie) => {
                            if (typeof movie.duration === 'number') {
                                movie.duration = Math.trunc(movie.duration / 60) + '?? ' + (movie.duration % 60) + '??';
                            }
                            return <MoviesCard key={movie._id} movie={movie} />;
                        })}
                    </Route>
                </Switch>
            </section>
            {moreButtonVisible ? <MoreMovies
                onClick={handleMoreMoviesClick} /> : ''}
        </>

    )
};

export default MoviesCardList;