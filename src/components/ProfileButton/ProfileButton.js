import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileButton.css';
import iconProfile from '../../images/icon_profile.svg';

function ProfileButton(props) {

  return (
        <Link to="/profile" className='profile-button' onClick={props.onClose}>
          <p className='profile-button__text'>Аккаунт</p>
          <div className='profile-button__icon-border'>
            <img className='profile-button__icon' src={iconProfile} alt='иконка профиля' />
          </div>
        </Link>
  );
}

export default ProfileButton;