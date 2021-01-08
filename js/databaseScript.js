class Product {
    constructor(cust, htmlId, id, name, percentageProfit) {
        this.cust = cust;
        this.htmlId = htmlId;
        this.id = id;
        this.name = name;
        this.percentageProfit = percentageProfit;
    }
}

var userLogged = false;

function logout() {
    firebase.auth().signOut()
        .then(function () {
            // Sign-out successful.
        })
        .catch(function (error) {
            // An error happened
            alert("AConteceu um erro e não conseguimos fazer o logout. "
                + "tente novamente em 10 segundos")
        });
}

