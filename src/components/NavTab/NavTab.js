import React from 'react';
import './NavTab.css';

function Promo() {
    return (
        <section className='nav-tab'>
            <ul className='nav-tab__list'>
                <li className='nav-tab__item'><a className='nav-tab__link' href='#' title='описание проекта'>О проекте</a></li>
                <li className='nav-tab__item'><a className='nav-tab__link' href='#' title='используемые технологии'>Технологии</a></li>
                <li className='nav-tab__item'><a className='nav-tab__link' href='#' title='студент выполнивший работу'>Студент</a></li>
            </ul>
        </section>
    );
}

export default Promo;