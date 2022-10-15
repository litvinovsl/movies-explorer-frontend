import React from 'react';
import { Route } from 'react-router-dom';
import './MoreMovies.css';

function MoreMovies(props) {

    return (
        <Route exact path='/movies'>
            <div className='more-movies'>
                <button
                    className='more-movies__button'
                    onClick={props.onClick}>
                    Ещё
                </button>
            </div>
        </Route>
    );
}

export default MoreMovies;