import React from 'react'
import './MoviesCard.css'

function MoviesCard({ movie }) {
    const [isSaved, setIsSaved] = React.useState(false);
    function click() {
        console.log('click');
        if(isSaved === false){
            setIsSaved(true);
        }else{
            setIsSaved(false);
        }
    }

    const movieSaveButtonClassName = `${
        !isSaved ? "element__button" : "element__button element__save_active"
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
