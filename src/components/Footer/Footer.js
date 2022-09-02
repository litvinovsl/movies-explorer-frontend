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
                <p className='footer__text footer__copyright-text'>Яндекс.Практикум</p>
            </div>
        </section>
    );
}

export default Footer;