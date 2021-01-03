function checkIfUserIsLogged() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            console.log(user.uid);
            userId = user.uid;
            changeLoginToLogout();
            userLogged = true;
        } else {
            // User not logged in or has just logged out.
            userId = null;
            changeLogoutToLogin();
            userLogged = false;
        }
    });
}
