import React, { useGlobal } from "reactn";
import { getUser, removeUserSession } from '../../utils/common';

function Dashboard(props) {
  const [globalUser, setGlobalUser] = useGlobal('user')

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    setGlobalUser(null);
    props.history.push('/login');
  }

  return (
    <div>
      Welcome {globalUser.username}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;