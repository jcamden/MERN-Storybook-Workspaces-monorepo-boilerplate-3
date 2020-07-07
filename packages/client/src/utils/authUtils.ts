import { Dispatch } from 'react';
import axios from 'axios';
import { LoginActions } from '../context/auth/types';
import { User } from '../context/auth/types';
import { ensureType } from '../utils';
import chalk from 'chalk';

// Register User

export const register = async (
  formData: { email: string; password: string },
  dispatch: Dispatch<LoginActions>,
): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('https://localhost:5000/api/users', formData, config);

    dispatch({
      type: 'registerSuccess',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'registerFail',
      payload: err.response.data.msg,
    });
  }
};

// Login User
export const login = async (
  formData: { email: string; password: string },
  dispatch: Dispatch<LoginActions>,
): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('https://localhost:5000/auth/login', formData, config);

    dispatch({
      type: 'loginSuccess',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'loginFail',
      payload: err.response.data.msg,
    });
  }
};

// Set Auth Token
export const setAuthToken = (token: string): void => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Load User
export const loadUser = async (dispatch: Dispatch<LoginActions>): Promise<void> => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('https://localhost:5000/auth');

    if (ensureType(res.data, { _id: '', email: '' })) {
      dispatch({
        type: 'userLoaded',
        payload: {
          user: {
            _id: res.data.user,
            email: res.data.email,
          },
        },
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: 'authError', payload: err });
  }
};

// for Google OAuth 2.0
export const checkGoogleClientID = (ID: string | undefined): string => {
  if (typeof ID === 'string') {
    return ID;
  } else {
    chalk.red('process.env.GOOGLE_CLIENT_ID was not a string');
  }
  // not sure if there is a better way to do this
  return "explosion. I'm sorry.";
};
