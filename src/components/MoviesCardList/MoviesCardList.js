import { useState, useEffect, useContext, useCallback } from 'react';
import { Route, Switch } from "react-router-dom";
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreMovies from '../MoreMovies/MoreMovies';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function MoviesCardList() {
    const context = useContext(CurrentUserContext);
    const { moviesWithLikeState, savedMovies, savedMoviesWithFilter } = context;
    const [renderedMovieQuantity, setRenderedMovieQuantity] = useState(null);
    const [renderedMovieCards, setRenderedMovieCards] = useState([]);
    const [moreButtonVisible, setMoreButtonVisible] = useState(true);
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
            // console.log('setRenderedMovieQuantity(12);', renderedMovieQuantity)
        }
        else if (widthSize > 783) {
            setRenderedMovieQuantity(8);
            // console.log('setRenderedMovieQuantity(8);',renderedMovieQuantity)
        }
        else if (widthSize <= 783) {
            setRenderedMovieQuantity(5);
            // console.log('setRenderedMovieQuantity(5);',renderedMovieQuantity)
        }
    }, [widthSize])

    useEffect(() => {
        cardDisplay();
    }, [cardDisplay, widthSize]);

    useEffect(() => {
        setRenderedMovieCards(moviesWithLikeState.slice(0, renderedMovieQuantity));
        // console.log('rendercards: ', renderedMovieCards);
        // console.log('allmovies: ', moviesWithLikeState);
    }, [moviesWithLikeState, renderedMovieQuantity, setRenderedMovieCards]);

    function handleMoreMoviesClick() {
        if (renderedMovieCards < moviesWithLikeState){
            console.log('more');
            setRenderedMovieQuantity(renderedMovieQuantity+3);
        } else {
            console.log('net filmov')
            setMoreButtonVisible(false);
        }
    }




    // console.log('asdadadad', savedMovies)
    // const [handleScreenResize, setHandleScreenResize] = React.useState();
    //  window.addEventListener('resize', handleScreenResize);
    // console.log(handleScreenResize);



    return (
<>
        <section className="elements">
            <Switch>
                <Route path="/movies">
                    {renderedMovieCards.map((movie) => {
                        if (typeof movie.duration === 'number') {
                            movie.duration = Math.trunc(movie.duration / 60) + 'ч ' + (movie.duration % 60) + 'м';
                        }
                        return <MoviesCard key={movie.movieId} movie={movie} />;
                    })}
                </Route>
                <Route path="/saved-movies">
                    {savedMoviesWithFilter.map((movie) => {
                        if (typeof movie.duration === 'number') {
                            movie.duration = Math.trunc(movie.duration / 60) + 'ч ' + (movie.duration % 60) + 'м';
                        }
                        return <MoviesCard key={movie._id} movie={movie} />;
                    })}
                </Route>
            </Switch>
        </section>
        {moreButtonVisible ? <MoreMovies 
        onClick={handleMoreMoviesClick}/> : ''}
         </>
        
    )
};

export default MoviesCardList;