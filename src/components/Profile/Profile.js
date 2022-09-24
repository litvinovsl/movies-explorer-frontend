import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import './Profile.css';

function Profile({ logoutProfile, onUpdateUser }) {
    const context = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const {
        currentUser,
        setСurrentUser,
    } = context;

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            email: email,
        });
        setСurrentUser({ name: name, email: email });
    }

    return (
        <section className="profile">
            <h2 className='profile__title'>{`Привет, ${currentUser.name}`}</h2>
            <form
                className='profile__form'
                name='profile-form'
                onSubmit={handleSubmit}
            >
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
                        maxLength={40}
                        pattern='[A-Za-zа-яА-ЯёЁ0-9-\s]{2,40}'
                    />
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
                        maxLength={40}
                        pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                    />
                    <label htmlFor="profile__email" className="form__label form__label_email">E-mail</label>
                </div>
                <button className='profile__button profile__button_submit' type='submit'>Редактировать</button>
            </form>
            <button className='profile__button profile__button_exit-profile' type='button' onClick={logoutProfile}>Выйти из профиля</button>
        </section>
    );
}

export default Profile;