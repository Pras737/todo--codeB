import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear the user information from local storage
    localStorage.removeItem('user');
    alert('Logged out successfully!');
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
