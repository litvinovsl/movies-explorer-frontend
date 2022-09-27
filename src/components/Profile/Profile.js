import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import './Profile.css';

function Profile({ logoutProfile, onUpdateUser }) {
    const context = useContext(CurrentUserContext);
    const {
        currentUser,
        setСurrentUser,
    } = context;
    const { register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({
        defaultValues: {
            name: currentUser.name,
            email: currentUser.email,
        },
        mode: 'onChange',
    });
    // console.log('name: ', currentUser.name, ' email: ', currentUser.email)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isChangeProfile, setIsChangeProfile] = useState(false);


    useEffect(() => {
        console.log('имя',name === currentUser.name )
        console.log('мейл',email === currentUser.email)
        console.log('валид',isValid)
        console.log('ВСЕ',name === currentUser.name && email === currentUser.email && isValid)

        if (name === currentUser.name && email === currentUser.email && isValid) {
            setIsChangeProfile(false);
        } else if (isValid) setIsChangeProfile(true);
            else setIsChangeProfile(false);
        }, [isValid, name, email, currentUser.name, currentUser.email]);

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




    function handleSubmitCastom() {
        onUpdateUser({
            name: name,
            email: email,
        });
        // setIsChangeProfile(false)
        setСurrentUser({ name: name, email: email });
    }

    return (
        <section className="profile">
            <h2 className='profile__title'>{`Привет, ${currentUser.name}`}</h2>
            <form
                className='profile__form'
                name='profile-form'
                onSubmit={handleSubmit(handleSubmitCastom)}
            >
                <div className='profile__form-group'>
                    <input
                        {...register('name', {
                            required: 'Нельзя оставить пустое имя',
                            minLength: {
                                value: 2,
                                message: 'Имя должно содердать не менее 2х символов'
                            },
                            pattern: {
                                value: /^[A-Za-zа-яА-ЯёЁ0-9-\s]*$/,
                                message: 'Можно использовать латиницу, кириллицу, пробел или дефис.'
                            },
                            onChange: (e) => { handleChangeName(e) }
                        })}
                        className='profile__input'
                        // name="name"
                        type='text'
                        value={name || ''}
                    />
                    <p className='profile__errors'>{errors?.name && `${errors?.name?.message || 'Ошибка валидации'}`}</p>
                    <label htmlFor="profile__name" className="form__label form__label_name">Имя</label>
                    <input
                        {...register('email', {
                            required: 'Нельзя оставить поле пустым',
                            pattern: {
                                value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                                message: 'Введите e-mail'
                            },
                            onChange: (e) => { handleChangeEmail(e) }
                        })}
                        className='profile__input profile__input_last'
                        // name="email"
                        type='text'
                        value={email || ''}
                    />
                    {/* <p className='profile__errors_email'>l</p> */}
                    <p className='profile__errors profile__errors_email'>{errors?.email && `${errors?.email?.message || 'Ошибка валидации'}`}</p>
                    <label htmlFor="profile__email" className="form__label form__label_email">E-mail</label>
                </div>
                <button
                    className={isValid ? `profile__button profile__button_submit` : 'profile__button profile__button_submit-inctive'}
                    type='submit'
                    disabled={!isChangeProfile}
                >Редактировать
                </button>
            </form>
            <button className='profile__button profile__button_exit-profile' type='button' onClick={logoutProfile}>Выйти из профиля</button>
        </section>
    );
}

export default Profile;