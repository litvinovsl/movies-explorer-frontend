import React from 'react';
import './MenuPopup.css';
import MenuLink from '../MenuLink/MenuLink';
import ProfileButton from '../ProfileButton/ProfileButton';

function MenuPopup(props) {

  return (
    <section className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className='popup__close' onClick={props.onClose} />
        <nav className='popup__links'>
          <MenuLink
            text='Главная страница'
            route='/' 
            class='nav-link_burger'/>
          <MenuLink
            text='Фильмы'
            route='/movies' 
            class='nav-link_burger'/>
          <MenuLink
            text='Сохраненные фильмы'
            route='/saved-movies' 
            class='nav-link_burger'/>
        </nav>
        <ProfileButton />
      </div>
      <div id="overlayProfile" onClick={props.onClose} className="popup__overlay"></div>
    </section>
  );
}

export default MenuPopup;