import React from 'react';
import './AboutMe.css';
import aboutMePhoto from '../../images/aboutMePhoto.PNG';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutMe() {
    return (
        <section className='about-me'>
            <SectionTitle>
                Студент
            </SectionTitle>
            <div className='about-me__card'>
                <div>
                    <h2 className='about-me__name'>Сергей</h2>
                    <h3 className='about-me__age'>Фронтенд-разработчик, 25 лет</h3>
                    <p className='about-me__text'>Я родился в Ставропольском крае, живу в городе Санкт-Петербург, 
                    закончил университет гражданской авиации, специализация Организация автоматизированных систем управления гражданской авиации. 
                    Был во многих городах России начиная Санкт-Петербургом и заканчивая Камчаткой. Недавно начал кодить. С 2019 года работаю в 
                    компании ООО «Фирма «Новые информационные технологии в авиации».</p>
                    <a className='about-me__github' href='https://github.com/litvinovsl'>Github</a>
                </div>
                <img className='about-me__photo' src={aboutMePhoto} alt='фото автора сайта' />
            </div>
            <p className='about-me__portfolio'>Портфолио</p>
            <div className='about-me__my-projs'>
                <a className='about-me__my-proj' href='https://github.com/litvinovsl/how-to-learn' rel="noreferrer" target="_blank">
                    <p className='about-me__my-proj-title'>Статичный сайт</p>
                    <p className='about-me__my-proj-arrow'>↗</p>
                </a>
                <a className='about-me__my-proj' href='https://litvinovsl.github.io/russian-travel/index.html' rel="noreferrer" target="_blank">
                    <p className='about-me__my-proj-title'>Адаптивный сайт</p>
                    <p className='about-me__my-proj-arrow'>↗</p>
                </a>
                <a className='about-me__my-proj about-me__my-proj_no-border' href='https://litvinovsl.nomoredomains.sbs/sign-up' rel="noreferrer" target="_blank">
                    <p className='about-me__my-proj-title'>Одностраничное приложение</p>
                    <p className='about-me__my-proj-arrow'>↗</p>
                </a>
            </div>
        </section>
    );
}

export default AboutMe;