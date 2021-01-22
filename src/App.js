import React, { useState } from 'react';
import axios from 'axios';
import { Div, Circle } from './styledComponents';
import { apiArr } from './apiNameArray';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';

const App = () => {
  const [festivalId, setfestivalId] = useState('');
  const [conutryId, setCountryId] = useState('');
  const [singUpInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
    nickname: '',
  });
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: '',
  });

  const onFestivalIdChangeHandler = e => {
    setfestivalId(e.target.value);
  };
  const onCountryIdChangeHandler = e => {
    setCountryId(e.target.value);
  };
  const onSignUpInfoChangeHandler = e => {
    setSignUpInfo({ ...singUpInfo, [e.target.name]: e.target.value });
  };
  const onLoginInfoChangeHandler = e => {
    setloginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    switch (e.target.textContent) {
      case '회원가입':
        axios
          .post('/signup', singUpInfo)
          .then(res => {
            console.log(res);
            setSignUpInfo({ email: '', password: '', nickname: '' });
          })
          .catch(err => console.log(err.response));
        break;
      case '로그인':
        axios
          .post('/login', loginInfo)
          .then(res => {
            console.log(res);
            setloginInfo({ email: '', password: '' });
          })
          .catch(err => console.log(err.response));
        break;
      case '로그아웃':
        axios
          .post('/logout')
          .then(res => console.log(res))
          .catch(err => console.log(err.response));
        break;
      case 'Main MAP':
        axios.get('/main').then(res => console.log(res));
        break;
      case 'festival list':
        if (!conutryId) {
          axios
            .get('/festival/list')
            .then(res => {
              console.log(res);
              setCountryId('');
            })
            .catch(err => console.log(err.response));
        } else {
          axios
            .get(`/festival/list/${conutryId}`)
            .then(res => {
              console.log(res);
              setCountryId('');
            })
            .catch(err => console.log(err.response));
        }
        break;
      case 'festival detail':
        axios
          .get(`/festival/detail/${festivalId}`)
          .then(res => {
            console.log(res);
            setfestivalId('');
          })
          .catch(err => console.log(err.response));
        break;
      case 'country category':
        axios.get('/category/country').then(res => console.log(res));
        break;
      case 'artist list':
        axios.get('/artist/list').then(res => console.log(res));
        break;
      case 'artist detail':
        axios
          .get(`/artist/detail/${festivalId}`)
          .then(res => {
            console.log(res);
            setfestivalId('');
          })
          .catch(err => console.log(err.response));
        break;
      case 'insert data':
        axios.get('/main/heeseok').then(res => console.log(res));
        break;
      default:
        console.log('sorry');
    }
  };
  return (
    <Div>
      {apiArr.map((text, idx) => {
        return (
          <Circle
            key={idx}
            isSign={text === '회원가입' || text === '로그인' ? true : false}
            isFestival={
              text === 'festival list' ||
              text === 'festival detail' ||
              text === 'artist detail'
                ? true
                : false
            }
            onClick={e => {
              onSubmitHandler(e);
            }}
          >
            <div>{text}</div>
            {text === '회원가입' || text === '로그인' ? (
              <div className='input'>
                <input
                  name='email'
                  value={
                    text === '회원가입' ? singUpInfo.email : loginInfo.email
                  }
                  placeholder=' email'
                  onChange={
                    text === '회원가입'
                      ? onSignUpInfoChangeHandler
                      : onLoginInfoChangeHandler
                  }
                />
                <input
                  name='password'
                  value={
                    text === '회원가입'
                      ? singUpInfo.password
                      : loginInfo.password
                  }
                  placeholder=' password'
                  onChange={
                    text === '회원가입'
                      ? onSignUpInfoChangeHandler
                      : onLoginInfoChangeHandler
                  }
                />
                {text === '회원가입' ? (
                  <input
                    name='nickname'
                    value={singUpInfo.nickname}
                    placeholder=' nickname'
                    onChange={onSignUpInfoChangeHandler}
                  />
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
            {text === 'festival list' ||
            text === 'festival detail' ||
            text === 'artist detail' ? (
              <div className='input'>
                <input
                  value={text === 'festival list' ? conutryId : festivalId}
                  placeholder={
                    text === 'artist detail'
                      ? ' artist_id'
                      : text === 'festival list'
                      ? ' country_id'
                      : ' festival_id'
                  }
                  onChange={
                    text === 'festival list'
                      ? onCountryIdChangeHandler
                      : onFestivalIdChangeHandler
                  }
                />
              </div>
            ) : (
              ''
            )}
          </Circle>
        );
      })}
    </Div>
  );
};

export default App;
