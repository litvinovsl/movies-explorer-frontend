import { useState, useEffect, useContext, useCallback } from 'react';
import { Route, Switch } from "react-router-dom";
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function MoviesCardList() {
    const context = useContext(CurrentUserContext);
    const { moviesWithLikeState, savedMovies, savedMoviesWithFilter } = context;
    const [renderedMovieQuantity, setRenderedMovieQuantity] = useState(null);
    const [renderedMovieCards, setRenderedMovieCards] = useState([]);
    const getWidth = () => window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    const widthSize = useCurrentWidth();
    // console.log(widthSize);

    // const cardDisplay = useCallback(() = {
    
    // }, []);
    const cardDisplay = useCallback(() =>{
        if( widthSize > 1279){
            setRenderedMovieQuantity(12);
            // console.log('setRenderedMovieQuantity(12);', renderedMovieQuantity)
        }
        else if( widthSize > 783){
            setRenderedMovieQuantity(8);
            // console.log('setRenderedMovieQuantity(8);',renderedMovieQuantity)
        }
        else if( widthSize <= 783){
            setRenderedMovieQuantity(5);
            // console.log('setRenderedMovieQuantity(5);',renderedMovieQuantity)
        }
    },[widthSize])

    useEffect(() => {
		cardDisplay();
	}, [cardDisplay, widthSize]);

    useEffect(() => {
		setRenderedMovieCards(moviesWithLikeState.slice(0, renderedMovieQuantity));
        // console.log('rendercards: ', renderedMovieCards);
        // console.log('allmovies: ', moviesWithLikeState);
	}, [moviesWithLikeState, renderedMovieQuantity, setRenderedMovieCards]);


    

    function useCurrentWidth() {
        // save current window width in the state object
        let [width, setWidth] = useState(getWidth());

        // in this case useEffect will execute only once because
        // it does not have any dependencies.
        useEffect(() => {
            // timeoutId for debounce mechanism
            let timeoutId = null;
            const resizeListener = () => {
                // prevent execution of previous setTimeout
                clearTimeout(timeoutId);
                // change width from the state object after 150 milliseconds
                timeoutId = setTimeout(() => setWidth(getWidth()), 600);
            };
            // set resize listener
            window.addEventListener('resize', resizeListener);

            // clean up function
            return () => {
                // remove resize listener
                window.removeEventListener('resize', resizeListener);
            }
        }, [])

        return width;
    }
    



    // console.log('asdadadad', savedMovies)
    // const [handleScreenResize, setHandleScreenResize] = React.useState();
    //  window.addEventListener('resize', handleScreenResize);
    // console.log(handleScreenResize);



    return (

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
    )
};

export default MoviesCardList;