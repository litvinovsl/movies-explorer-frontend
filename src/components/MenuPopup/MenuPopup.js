import React from 'react';
import './MenuPopup.css';
import { Route } from "react-router-dom";
import MenuLink from '../MenuLink/MenuLink';
import ProfileButton from '../ProfileButton/ProfileButton';

function MenuPopup(props) {

  return (
    <section className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className='popup__close' onClick={props.onClose} />
        <Route exact path='/'>
          {props.loggedIn ? (
            <>
              <nav className='popup__links'>
                <MenuLink
                  text='Фильмы'
                  route='/movies'
                  class='nav-link_burger'
                  onClose={props.onClose} />
                <MenuLink
                  text='Сохраненные фильмы'
                  route='/saved-movies'
                  class='nav-link_burger'
                  onClose={props.onClose} />
              </nav>
              <ProfileButton
                onClose={props.onClose} />
            </>
          ) : (
            <>
              <nav className='popup__links'>
                <MenuLink
                  text='Регистрация'
                  route='/signup'
                  class='nav-link_burger' />
                <MenuLink
                  text='Войти'
                  route='/signin'
                  class='nav-link_burger' />
              </nav>
            </>
          )}

        </Route>
        <Route exact path={['/movies', '/saved-movies', '/profile']}>
          <nav className='popup__links'>
            <MenuLink
              text='Главная страница'
              route='/'
              class='nav-link_burger'
              onClose={props.onClose} />
            <MenuLink
              text='Фильмы'
              route='/movies'
              class='nav-link_burger'
              onClose={props.onClose} />
            <MenuLink
              text='Сохраненные фильмы'
              route='/saved-movies'
              class='nav-link_burger'
              onClose={props.onClose} />
          </nav>
          <ProfileButton
            onClose={props.onClose} />
        </Route>
      </div>
      <div id="overlayProfile" onClick={props.onClose} className="popup__overlay"></div>
    </section>
  );
}

export default MenuPopup;