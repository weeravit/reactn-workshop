import React from 'react';
import { getUser, removeUserSession } from '../../utils/common';

function Dashboard(props) {
  console.log("Dashboard -> props", props)
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  return (
    <div>
      Welcome {user.username}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;