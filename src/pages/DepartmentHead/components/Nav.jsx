import React from 'react';
import NavAvatar from './NavAvatar';

function Nav() {
  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  };

  return (
    <nav style={navStyle}>
      <ul style={{ display: 'flex', alignItems: 'center' }}>
        <NavAvatar />
      </ul>
    </nav>
  );
}

export default Nav;
