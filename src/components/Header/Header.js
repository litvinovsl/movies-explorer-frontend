import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import MenuLink from '../MenuLink/MenuLink';
import ProfileButton from '../ProfileButton/ProfileButton';
import MenuPopup from '../MenuPopup/MenuPopup';



function Header(props) {

  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  function handleClickBurgerMenu() {
    setIsOpenMenu(true);
  }
  function closeMenu() {
    setIsOpenMenu(false);
  }

  return (
    <section className={`header ${props.class}`}>
      <MenuPopup
        isOpen={isOpenMenu}
        onClose={closeMenu} />
      <Link to="/" >
        <img className='header__logo' src={logo} alt='логотип сайта' />
      </Link>
      {/* <Route exact path={['/movies', '/saved-movies', '/profile']}> */}
      <button className='header__burger' onClick={handleClickBurgerMenu} />
      {/* </Route> */}
      <div className='header__links-and-button'>
        <Route exact path='/'>
          <nav className='header__links header__links_main'>
            <MenuLink
              text='Регистрация'
              route='/signup'
              class='nav-link_register' />
            <Link to='/signin' className='header__login'>Войти</Link>
          </nav>
        </Route>
        <Route exact path={['/movies', '/saved-movies', '/profile']}>
          <nav className='header__links'>
            <MenuLink
              text='Фильмы'
              route='/movies' />
            <MenuLink
              text='Сохраненные фильмы'
              route='/saved-movies' />
          </nav>
          <ProfileButton />
        </Route>
      </div>

    </section>
  );
}

export default Header;