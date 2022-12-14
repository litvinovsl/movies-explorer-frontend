import React from 'react';
import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function Techs() {
    return (
        <section className='techs' id='techs'>
            <SectionTitle classPlus='section-title_border-black'>
                Технологии
            </SectionTitle>
                <h2 className='techs__title'>7 техноогий</h2>
                <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className='techs__list'>
                    <li className='techs__list-item'>HTML</li>
                    <li className='techs__list-item'>CSS</li>
                    <li className='techs__list-item'>JS</li>
                    <li className='techs__list-item'>React</li>
                    <li className='techs__list-item'>Git</li>
                    <li className='techs__list-item'>Express.js</li>
                    <li className='techs__list-item'>mongoDB</li>
                </ul>
        </section>
    );
}

export default Techs;