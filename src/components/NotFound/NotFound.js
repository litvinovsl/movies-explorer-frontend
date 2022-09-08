import React from 'react';
import { useHistory } from "react-router-dom";

import './NotFound.css';



function NotFound() {
    let history = useHistory();
    return (
        <section className="not-found">
            <div className='not-found__error-container'>
                <h1 className='not-found__error'>404</h1>
                <p className='not-found__error-message'>Страница не найдена</p>
            </div>
            <button onClick={history.goBack} className='not-found__back'>Назад</button>
        </section>
    );
}

export default NotFound;
