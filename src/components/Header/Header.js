import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import MenuLink from '../MenuLink/MenuLink';
import ProfileButton from '../ProfileButton/ProfileButton';
import MenuPopup from '../MenuPopup/MenuPopup';



function Header() {

  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  function handleClickBurgerMenu() {
    setIsOpenMenu(true);
  }
  function closeMenu() {
    setIsOpenMenu(false);
  }

  return (
    <section className="header">
      <MenuPopup
        isOpen={isOpenMenu}
        onClose={closeMenu} />
      <Link to="/" >
        <img className='header__logo' src={logo} alt='логотип сайта' />
      </Link>
      <button className='header__burger' onClick={handleClickBurgerMenu} />
      <div className='header__links-and-button'>
        <nav className='header__links'>
          <MenuLink
            text='Фильмы'
            route='/movies' />
          <MenuLink
            text='Сохраненные фильмы'
            route='/saved-movies' />
        </nav>
        <ProfileButton />
      </div>

    </section>
  );
}

export default Header;