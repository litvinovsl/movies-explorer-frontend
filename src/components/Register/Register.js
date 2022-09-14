import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';




function Register() {
    return (
        <section className="register">
            <Link to='/'>
                <img className='register__icon' src={logo} alt='логотип сайта' />
            </Link>
            <h2 className='register__title'>Добро пожаловать!</h2>
            <form className='register__form' name='register-form'>
                <label htmlFor="register__name" className="register__label">Имя</label>
                <input
                    className='register__input'
                    name="name"
                    type='text'
                    id='register__name'
                    required
                    minLength={2}
                    maxLength={40}
                    placeholder='Имя' />
                <label htmlFor="register__email" className="register__label">E-mail</label>
                <input
                    className='register__input'
                    name="email"
                    type='text'
                    id='register__email'
                    required
                    minLength={2}
                    maxLength={40}
                    placeholder='E-mail' />
                <label htmlFor="register__password" className="register__label">Пароль</label>
                <input
                    className='register__input'
                    name="password"
                    type='password'
                    id='register__password'
                    required
                    minLength={2}
                    maxLength={40}
                    placeholder='Пароль' />
                <button className='register__submit register__submit_reg' type='submit'>Зарегистрироваться</button>
            </form>
            <p className='register__signin'>Уже зарегистрированы?
                <Link to='/signin' className='register__link'>
                    Войти
                </Link>
            </p>
        </section>
    );
}

export default Register;