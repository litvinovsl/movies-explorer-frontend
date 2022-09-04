import React from 'react';
import { Link } from 'react-router-dom';
import './MenuPopup.css';
import iconProfile from '../../images/icon_profile.svg';

function MenuPopup(props) {

  return (
    <section className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div>
        <button className='popup__close' onClick={props.onClose}/>
        <nav className='popup__links'>
            <Link to="/" onClick={props.onClose} className='popup__link'>Главная страница</Link>
            <Link to="/movies" onClick={props.onClose} className='popup__link'>Фильмы</Link>
            <Link to="/saved-movies" onClick={props.onClose} className='popup__link'>Сохраненные фильмы</Link>
        </nav>
        </div>
        <div>
        <Link to="/profile" className='popup__profile'>
          <p className='popup__profile-text'>Аккаунт</p>
          <div className='popup__profile-icon-border'>
            <img className='popup__profile-icon' src={iconProfile} alt='иконка профиля' />
          </div>
        </Link>
        </div>
      </div>
      <div id="overlayProfile" onClick={props.onClose} className="popup__overlay"></div>
    </section>
  );
}

export default MenuPopup;