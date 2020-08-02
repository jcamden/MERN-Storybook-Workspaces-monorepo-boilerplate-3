import React, { useContext } from 'react';
import { AppStateContext } from '../../context/app/AppState';
import { LoginRHF } from './Login/LoginRHF';
import { RegisterRHF } from '@merninator/lib';
import { ProjectsPage } from './Projects/ProjectsPage';
import { Profile } from './Profile/Profile';
import { CheckAuth } from '../auth/CheckAuth';
import { LoadingLogo } from '../layout/LoadingLogo';
import { UnauthdHome } from './Home/UnauthdHome';
import { AuthdHome } from './Home/AuthdHome';
import { AuthActions, AppActions, AppActionTypes, ProjectsActions } from '@merninator/types';
import { GOOGLE_CLIENT_ID } from '../../settings';
import { AuthStateContext } from '../../context/auth/AuthState';
import { registerUser } from '../../utils/authUtils';

interface StateRouterProps {
  dispatch: (arg0: AuthActions | AppActions | ProjectsActions) => void;
}

export const StateRouter: React.FC<StateRouterProps> = ({ dispatch }) => {
  const { page } = useContext(AppStateContext);
  // const appDispatch = useContext(AppDispatchContext);
  const { authLoading, authError, user } = useContext(AuthStateContext);

  switch (page) {
    case 'home': {
      // You could also use two different states for authd home and unauthd home, but I think I like this approach using Check.
      // It nests the state routing essentially. The preInitAuth component prop is good for a landing page,
      // although it might actually be smart to move the preInitAuth component rendering to the global StateRouter.
      // Maybe I'll do that, actually.
      return (
        <CheckAuth
          preInitAuth={<LoadingLogo />}
          noUser={<UnauthdHome dispatch={dispatch} />}
          component={<AuthdHome dispatch={dispatch} />}
        />
      );
    }
    case 'login': {
      return <LoginRHF dispatch={dispatch} />;
    }
    case 'register': {
      return (
        <RegisterRHF
          dispatch={dispatch}
          registerUser={registerUser}
          googleClientId={GOOGLE_CLIENT_ID}
          authLoading={authLoading}
          authError={authError}
          user={user}
        />
      );
    }
    case 'projects': {
      return <ProjectsPage dispatch={dispatch} />;
    }
    case 'profile': {
      return <Profile dispatch={dispatch} />;
    }
    default: {
      // shouldn't be possible, but just in case.
      dispatch({ type: AppActionTypes.changePage, payload: 'home' });
      return (
        <CheckAuth
          preInitAuth={<LoadingLogo />}
          noUser={<UnauthdHome dispatch={dispatch} />}
          component={<AuthdHome dispatch={dispatch} />}
        />
      );
    }
  }
};
