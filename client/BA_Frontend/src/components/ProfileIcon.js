// ProfileIcon.js

import React from 'react';

const ProfileIcon = () => {
  return (
    <span style={styles.profileIcon} className="material-symbols-outlined icon-hover">
    person
    </span>
  );
};

const styles = {
    profileIcon: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '36px', // Adjust size of the icon
        color: 'white', // Icon color (white to match header)
        cursor: 'pointer', // Add pointer cursor for interactivity
      },
}

export default ProfileIcon;
