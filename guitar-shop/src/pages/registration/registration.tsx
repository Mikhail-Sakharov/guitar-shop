import {FormEvent, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppRoute, EMAIL_REG_EXP} from "../../const";
import {useAppDispatch} from "../../hooks";
import {registerUserAction} from "../../store/api-actions";
import {setDataLoadedStatus} from "../../store/app-data/app-data";

function Registration(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userNameInputUsed, setUserNameInputUsed] = useState(false);
  const [emailInputUsed, setEmailInputUsed] = useState(false);
  const [passwordInputUsed, setPasswordInputUsed] = useState(false);

  const [userNameError, setUserNameError] = useState('Заполните поле');
  const [emailError, setEmailError] = useState('Заполните поле');
  const [passwordError, setPasswordError] = useState('Заполните поле');

  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (userNameError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userNameError, emailError, passwordError]);

  const handleInputFocus = (evt: FormEvent<HTMLInputElement>) => {
    switch(evt.currentTarget.id) {
      case 'name':
        setUserNameInputUsed(true);
        break;
      case 'email':
        setEmailInputUsed(true);
        break;
      case 'password':
        setPasswordInputUsed(true);
        break;
    }
  };

  const handleUserNameInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setUserName(value);
    if (value.length < 1 || value.length > 15) {
      setUserNameError('Длина имени от 1 до 15 символов');
      if (!value) {
        setUserNameError('Заполните поле');
      }
    } else {
      setUserNameError('');
    }
  };

  const handleEmailInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setEmail(value);
    if (!EMAIL_REG_EXP.test(value)) {
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
      dispatch(registerUserAction({
        userName,
        email,
        password
      }));
      navigate(AppRoute.Main);
    }
    setUserNameInputUsed(true);
    setEmailInputUsed(true);
    setPasswordInputUsed(true);
  };

  const togglePasswordInputType = () => {
    if (passwordInputRef.current) {
      switch(passwordInputRef.current.type) {
        case 'password':
          passwordInputRef.current.type = 'text';
          break;
        case 'text':
          passwordInputRef.current.type = 'password';
          break;
      }
    }
  };

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <form method="post" action="/">
            <div className="input-login">
              <label htmlFor="name">Введите имя</label>
              <input
                onChange={handleUserNameInputChange}
                value={userName}
                onFocus={handleInputFocus}
                type="text" id="name" name="name" autoComplete="off"
              />
              <p className="input-login__error">{userNameInputUsed && userNameError}</p>
            </div>
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
              <label htmlFor="password">Придумайте пароль</label>
              <span>
                <input
                  ref={passwordInputRef}
                  onChange={handlePasswordInputChange}
                  value={password}
                  onFocus={handleInputFocus}
                  type="password" placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off"
                />
                <button onClick={togglePasswordInputType} className="input-login__button-eye" type="button">
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
              Зарегистрироваться
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Registration;
