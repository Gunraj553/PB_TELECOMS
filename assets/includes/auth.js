window.onload = () => {
    // Retrieve user information from sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  
    if (loggedInUser) {
      // Display the user's name in the header
      document.getElementById('login_logout').innerHTML = `Logout, ${loggedInUser.name}!`;
      document.getElementById('login_logout').href = 'index.html';

    }
    const logoutButton = document.getElementById("login_logout"); // Replace with the actual element ID of your logout button
    if (logoutButton) {
      logoutButton.addEventListener("click", logoutUser);
    }
    
  };

  function logoutUser() {
    // Clear user information from sessionStorage
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; 
  }