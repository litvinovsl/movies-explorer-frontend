import React from 'react';
import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
    return (
        <section className="about-project" id='about-project'>
            <SectionTitle>
                О проекте
            </SectionTitle>
            <ul className='about-project__columns'>
                <li className='about-project__column'>
                    <h3 className='about-project__column-title'>
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className='about-project__column-text'>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </li>
                <li className='about-project__column'>
                    <h3 className='about-project__column-title'>
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className='about-project__column-text'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </li>
            </ul>
            <ul className='about-project__period'>
                <li className='about-project__period-column about-project__period-column_type_small'>
                    <h3 className='about-project__period-title about-project__period-title_type_small'>
                        1 неделя
                    </h3>
                    <p className='about-project__period-column-text'>
                        Back-end
                    </p>
                </li>
                <li className='about-project__period-column about-project__period-column_type_big'>
                    <h3 className='about-project__period-title about-project__period-title_type_big'>
                        4 недели
                    </h3>
                    <p className='about-project__period-column-text'>
                        Front-end
                    </p>
                </li>
            </ul>

        </section>
    );
}

export default AboutProject;