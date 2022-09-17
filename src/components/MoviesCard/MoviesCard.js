import React from 'react';
import './MoviesCard.css';
import api from '../../utils/Api';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function MoviesCard({ movie }) {
    const context = React.useContext(CurrentUserContext);
    const {
        movies,
        savedMovies, 
        setSavedMovies
    } = context;

    // console.log('allInitilMovies: ', allInitilMovies);
    // console.log('Movies: ', movies)
    const [isLiked, setIsLiked] = React.useState(false);
    function click() {
        //меняем длительность обратно на number
        const savedMovie = movies.find((item) => {
            return movie.movieId === item.movieId;
        });
        console.log('movie.isLiked: ', movie.isLiked)



        if (movie.isLiked === false) {
            api.saveMovie(savedMovie)
                .then((data) => {
                    // console.log('saveMovie: ', data)
                    setIsLiked(true);
                    setSavedMovies([...savedMovies, movie])
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            setIsLiked(false);
        }

    }

    const movieSaveButtonClassName = `${!isLiked ? "element__button" : "element__button element__save_active"
        }`;
    return (
        <div className="element">
            <button className={movieSaveButtonClassName} onClick={click}></button>
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
