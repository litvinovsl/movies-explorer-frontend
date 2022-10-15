import React from 'react';
import { Link, Route } from 'react-router-dom';
import './ProfileButton.css';
import iconProfile from '../../images/icon_profile.svg';

function ProfileButton(props) {

  return (
    <Link to="/profile" className='profile-button' onClick={props.onClose}>
      <p className='profile-button__text'>Аккаунт</p>
      <Route exact path={['/movies', '/saved-movies', '/profile']}>
        <div className='profile-button__icon-border'>
          <img className='profile-button__icon' src={iconProfile} alt='иконка профиля' />
        </div>
      </Route>
      <Route exact path='/'>
        <div className='profile-button__icon-border profile-button__icon-border_header'>
          <img className='profile-button__icon' src={iconProfile} alt='иконка профиля' />
        </div>
      </Route>

    </Link>
  );
}

export default ProfileButton;