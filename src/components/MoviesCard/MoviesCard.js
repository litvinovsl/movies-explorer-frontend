import { useContext } from "react";
import { Route } from 'react-router-dom';
import './MoviesCard.css';
import api from '../../utils/Api';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function MoviesCard({ movie }) {
    const context = useContext(CurrentUserContext);
    const {
        movies,
        savedMovies,
        setSavedMovies,
        setIsLikedMovie,
        setIsDelLikedMovie
    } = context;

    function click() {
        //меняем длительность обратно на number
        const savedMovie = movies.find((item) => {
            return movie.movieId === item.movieId;
        });
        console.log('movie.isLiked: ', movie.isLiked);
        if (movie.isLiked === false) {
            api.saveMovie(savedMovie)
                .then((data) => {
                    setIsLikedMovie(true);
                    setIsDelLikedMovie(false);
                    setSavedMovies([...savedMovies, movie])
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const deletedMovie = savedMovies.find((item) => {
                return movie.movieId === item.movieId;
            });
            console.log('savedMovies ', savedMovies);
            console.log('deletedMovie ', savedMovies);
            api
                .deleteMovie(deletedMovie._id)
                .then((data) => {
                    setIsLikedMovie(false);
                    setIsDelLikedMovie(true);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }
    const movieSaveButtonClassName = `${!movie.isLiked ? "element__button" : "element__button element__save_active"
        }`;
    return (

        <div className="element">
            <Route exact path='/movies'>
                <button className={movieSaveButtonClassName} onClick={click}></button>
            </Route>
            <Route exact path='/saved-movies'>
                <button className="element__button element__save_active" onClick={click}></button>
            </Route>
            <img
                className="element__image"
                src={movie.image}
                alt={movie.nameRU}
            />
            <p className="element__name">{movie.nameRU}</p>
            <div className='element__time-background'>
                <p className="element__like-counter">{movie.duration}</p>
            </div>
        </div>

    );
};

export default MoviesCard;
