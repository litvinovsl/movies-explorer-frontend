import React from 'react'
import './MoviesCard.css'

function MoviesCard(props) {
    return (
        <div className="element">
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