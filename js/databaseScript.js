var userLogged = false;

function logout() {
    firebase.auth().signOut()
        .then(function () {
            // Sign-out successful.
        })
        .catch(function (error) {
            // An error happened
            alert("AConteceu um erro e n�o conseguimos fazer o logout. "
                + "tente novamente em 10 segundos")
        });
}