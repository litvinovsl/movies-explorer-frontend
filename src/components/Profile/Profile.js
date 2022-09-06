import React from 'react';
// import { Link } from 'react-router-dom';
import './Profile.css';



function Profile() {
    const user = {
        name: 'Имя',
        email: '******@*****.***'
    };
    const [name, setName] = React.useState(user.name);
    function handleChangeName(e) {
        setName(e.target.value);
      }
    const [email, setEmail] = React.useState(user.email);
    function handleChangeEmail(e) {
        setEmail(e.target.value);
      }

    return (
        <section className="profile">
            <h2 className='profile__title'>{`Привет, ${user.name}`}</h2>
            <form className='profile__form' name='profile-form'>
                <div className='profile__form-group'>
                    <input 
                        className='profile__input'  
                        name="name" 
                        type='text' 
                        id='profile__name'
                        value={name || ''}
                        onChange={handleChangeName}  
                        required 
                        minLength={2} 
                        maxLength={40} />
                    <label htmlFor="profile__name" className="form__label form__label_name">Имя</label>
                    <input 
                        className='profile__input'  
                        name="email" 
                        type='text' 
                        id='profile__email' 
                        value={email || ''}
                        onChange={handleChangeEmail} 
                        required 
                        minLength={2} 
                        maxLength={40} />
                    <label htmlFor="profile__email" className="form__label form__label_email">E-mail</label>
                </div>
                <button className='profile__button profile__button_submit' type='submit'>Редактировать</button>
            </form>
            <button className='profile__button profile__button_exit-profile' type='button'>Выйти из профиля</button>
        </section>
    );
}

export default Profile;