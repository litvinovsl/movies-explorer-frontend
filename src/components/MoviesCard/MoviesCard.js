import React from 'react'
import './MoviesCard.css'

function MoviesCard(props) {
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
                src={props.link}
                alt={props.name}
            />
            <p className="element__name">{props.name}</p>
            <div className='element__time-background'>
                <p className="element__like-counter">1ч 17м</p>
            </div>
        </div>

    );
};

export default MoviesCard;
