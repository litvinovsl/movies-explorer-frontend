import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import iconProfile from '../../images/icon_profile.svg';
import logo from '../../images/logo.svg';
import ProfileButton from '../ProfileButton/ProfileButton';
import MenuPopup from '../MenuPopup/MenuPopup';



function Header() {
  
  const[isOpenMenu, setIsOpenMenu] = React.useState(false);
  function handleClickBurgerMenu(){
    setIsOpenMenu(true);
  }
  function closeMenu(){
    setIsOpenMenu(false);
  }

  return (
    <section className="header">
      <MenuPopup 
        isOpen={isOpenMenu}
        onClose={closeMenu}/>
      <Link to="/" >
        <img className='header__logo' src={logo} alt='логотип сайта' />
      </Link>
      <button className='header__burger' onClick={handleClickBurgerMenu} />
      <div className='header__links-and-button'>
        <nav className='header__links'>
          <Link to="/movies" className='header__link'>Фильмы</Link>
          <Link to="/saved-movies" className='header__link'>Сохраненные фильмы</Link>
        </nav>
        <ProfileButton />
      </div>

    </section>
  );
}

export default Header;