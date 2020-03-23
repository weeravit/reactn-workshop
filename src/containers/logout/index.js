import React from 'react';
import { removeUserSession } from '../../utils/common';


function Logout(props) {
  removeUserSession();
  props.history.push('/login');

  return (
    <div> log out success </div>
  )
}

export default Logout;
