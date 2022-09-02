import React from 'react';
import './Footer.css';



function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <section className="footer">
            <p className='footer__text footer__educational-project'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__copyright'>
                <p className='footer__text footer__copyright-text'>© {year}</p>
                <div className='footer__links'>
                    <a href='https://practicum.yandex.ru/' className='footer__text footer__copyright-text footer__copyright-text_hover-opacity'>Яндекс.Практикум</a>
                    <a href='https://github.com/' className='footer__text footer__copyright-text footer__copyright-text_hover-opacity'>Github</a>
                </div>
            </div>
        </section>
    );
}

export default Footer;