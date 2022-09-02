import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import iconProfile from '../../images/icon_profile.svg';
import logo from '../../images/logo.svg';



function Header() {
  return (
    <section className="header">
      <Link to="/" >
        <img className='header__logo' src={logo} alt='логотип сайта' />
      </Link>
      <div className='header__links-and-button'>
        <nav className='header__links'>
          <Link to="/films" className='header__link'>Фильмы</Link>
          <Link to="/films/me" className='header__link'>Сохраненные фильмы</Link>
        </nav>
        <Link to="/profile" className='header__profile'>
          <p className='header__profile-text'>Аккаунт</p>
          <div className='header__profile-icon-border'>
            <img className='header__profile-icon' src={iconProfile} alt='иконка профиля' />
          </div>
        </Link>
      </div>

    </section>
  );
}

export default Header;