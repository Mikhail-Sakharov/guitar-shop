import {useState, useEffect, FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {loginUserAction} from '../../store/api-actons';
import {setDataLoadedStatus} from '../../store/app-data/app-data';

const emailRegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

function Login(): JSX.Element {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailInputUsed, setEmailInputUsed] = useState(false);
  const [passwordInputUsed, setPasswordInputUsed] = useState(false);

  const [emailError, setEmailError] = useState('Заполните поле');
  const [passwordError, setPasswordError] = useState('Заполните поле');

  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const handleInputFocus = (evt: FormEvent<HTMLInputElement>) => {
    switch(evt.currentTarget.id) {
      case 'email':
        setEmailInputUsed(true);
        break;
      case 'password':
        setPasswordInputUsed(true);
        break;
    }
  };

  const handleEmailInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setEmail(value);
    if (!emailRegExp.test(value)) {
      setEmailError('Введите валидный email');
      if (!value) {
        setEmailError('Заполните поле');
      }
    } else {
      setEmailError('');
    }
  };

  const handlePasswordInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setPassword(value);
    if (value.length < 6 || value.length > 12) {
      setPasswordError('Длина пароля от 6 до 12 символов');
      if (!value) {
        setPasswordError('Заполните поле');
      }
    } else {
      setPasswordError('');
    }
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (formValid) {
      dispatch(setDataLoadedStatus(true));
      dispatch(loginUserAction({
        email,
        password
      }));
    }
    setEmailInputUsed(true);
    setPasswordInputUsed(true);
  };
  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Войти</h1>
          <p className="login__text">Hовый пользователь? <Link className="login__link" to="/registration">Зарегистрируйтесь</Link> прямо сейчас</p>
          <form method="post" action="/">
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input
                onChange={handleEmailInputChange}
                value={email}
                onFocus={handleInputFocus}
                type="email" id="email" name="email" autoComplete="off"
              />
              <p className="input-login__error">{emailInputUsed && emailError}</p>
            </div>
            <div className="input-login">
              <label htmlFor="passwordLogin">Введите пароль</label>
              <span>
                <input
                  onChange={handlePasswordInputChange}
                  value={password}
                  onFocus={handleInputFocus}
                  type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off"
                />
                <button className="input-login__button-eye" type="button">
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              <p className="input-login__error">{passwordInputUsed && passwordError}</p>
            </div>
            <button
              onClick={handleSubmitButtonClick}
              className="button login__button button--medium" type="submit"
            >
              Войти
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Login;
