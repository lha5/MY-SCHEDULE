/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { auth } from '../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null) {
  // option ---------------------------------------
  // null : for anyone no matter who sign in or not
  // true : only for users who sign in
  // false : for users except sign in user

  function AuthenticationCheck (props) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {
        // not sign in
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/signin');
          }
        } else {
          // sign in
          if (adminRoute && !response.payload.isAdmin) {
            // for admin user
            props.history.push('/');
          } else {
            // for not sign in user
            if (option === false) {
              props.history.push('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}
