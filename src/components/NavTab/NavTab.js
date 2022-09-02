import React from 'react';
import './NavTab.css';

function NavTab() {
    return (
        <section className='nav-tab'>
            <ul className='nav-tab__list'>
                <li className='nav-tab__item'><a className='nav-tab__link' href='#about-project' title='описание проекта'>О проекте</a></li>
                <li className='nav-tab__item'><a className='nav-tab__link' href='#techs' title='используемые технологии'>Технологии</a></li>
                <li className='nav-tab__item'><a className='nav-tab__link' href='#about-me' title='студент выполнивший работу'>Студент</a></li>
            </ul>
        </section>
    );
}

export default NavTab;