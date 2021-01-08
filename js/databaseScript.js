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

function addNewProduct() {
    var cust = document.getElementById("productCust").value;
    console.log("cust: " + cust);

    var name = document.getElementById("productName").value;
    console.log("name: " + name);

    var id = document.getElementById("firebaseProductId").value;
    console.log("id: " + id);

    var htmlId = document.getElementById("htmlId").value;
    console.log("htmlId: " + htmlId);

    var percentageProfit = 25;
    console.log("Profit: " + percentageProfit);

    var produto = new Product(cust, htmlId, id, name, percentageProfit);
    console.log(produto);

    firebase.database().ref('test/' + id).set(produto);
}