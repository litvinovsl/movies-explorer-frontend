import React from 'react';
import { Link } from 'react-router-dom';
import './MenuPopup.css';
import ProfileButton from '../ProfileButton/ProfileButton';
import iconProfile from '../../images/icon_profile.svg';

function MenuPopup(props) {

  return (
    <section className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className='popup__close' onClick={props.onClose}/>
        <nav className='popup__links'>
            <Link to="/" onClick={props.onClose} className='popup__link'>Главная страница</Link>
            <Link to="/movies" onClick={props.onClose} className='popup__link'>Фильмы</Link>
            <Link to="/saved-movies" onClick={props.onClose} className='popup__link'>Сохраненные фильмы</Link>
        </nav>
          <ProfileButton />
      </div>
      <div id="overlayProfile" onClick={props.onClose} className="popup__overlay"></div>
    </section>
  );
}

export default MenuPopup;