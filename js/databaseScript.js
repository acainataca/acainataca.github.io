//put this code in a new script file called financeScript from here
function roundNumber(number) {
    return (Math.round(number * 100) / 100).toFixed(2);
}

class BoughtItem {
    constructor(sellingPrice, boughtQuantity, productId) {
        this.sellingPrice = sellingPrice;
        this.boughtQuantity = boughtQuantity;
        this.productId = productId;
    }
}

class ExtraCostItem {
    constructor(cost, id) {
        this.cost = cost;
        this.id = id;
    }

    addCost() {
        if (!cart.additionalCost.hasOwnProperty(this.id)) {
            if (this.id != "debito" && this.id != "credito") {
                cart.additionalCost[this.id] =
                    new ExtraCostItem(parseFloat(this.cost), this.id);
                cart.price += parseFloat(this.cost);
            } else {
                let cost = cart.price * (parseFloat(this.cost) / 100);
                cart.additionalCost[this.id] = new ExtraCostItem(cost, this.id);
                cart.price += cost;
            }
        }
    }

    removeCost() {
        if (cart.additionalCost.hasOwnProperty(this.id)) {
            let cost = cart.additionalCost[this.id].cost;
            cart.price -= cost;
            delete cart.additionalCost[this.id];
        }
    }
}

class Product {
    constructor(cost, htmlId, id, name, percentageProfit) {
        this.cost = cost;
        this.htmlId = htmlId;
        this.id = id;
        this.name = name;
        this.percentageProfit = percentageProfit;
    }

    putNameInTheHTML() {
        document.getElementById(this.htmlId).innerHTML = this.name;
    }

    get sellingPrice() {
        var percentagePrice = (parseFloat(this.cost)
            * (parseFloat(this.percentageProfit) / 100));
        percentagePrice = roundNumber(percentagePrice);

        var totalPrice = (parseFloat(this.cost) +
            parseFloat(percentagePrice));

        return roundNumber(totalPrice);
    }

    get quantity() {
        if (cart.products.hasOwnProperty(this.id)) {
            return cart.products[this.id].boughtQuantity;
        } else {
            return 0;
        }
    }

    buy(buyQuantity) {
        if (cart.products.hasOwnProperty(this.id)) {
            cart.products[this.id].boughtQuantity += parseInt(buyQuantity);
        } else {
            cart.products[this.id] =
                new BoughtItem(parseFloat(this.sellingPrice), parseInt(buyQuantity), this.id);
        }
        cart.price += parseFloat(this.sellingPrice) * buyQuantity;
    }

    remove(removeQuantity, removeAll) {
        if (cart.products.hasOwnProperty(this.id)) {
            if (removeAll == true || removeAll == 'true'
                || parseInt(removeQuantity) >= cart.products[this.id].boughtQuantity) {

                var quantity = cart.products[this.id].boughtQuantity;
                cart.price -= this.sellingPrice * quantity;
                delete cart.products[this.id];
            }
            else{
                cart.products[this.id].boughtQuantity -= parseInt(removeQuantity);
                cart.price -= this.sellingPrice * removeQuantity;
            }
        }
    }
}

var cart = {
    "products": {},
    "additionalCost": {},
    "price": 0.00
};

var products = {};
var additionalCosts = {};
//to here

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

function getProductsInformation() {
    firebase.database().ref("Product").once('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            products[childSnapshot.val().name] = Object.assign(new Product, childSnapshot.val());
            document.getElementById(childSnapshot.val().htmlId)
                .innerHTML = childSnapshot.val().name;
            document.getElementById(childSnapshot.val().htmlId + "_price")
                .innerHTML = "R$ " + products[childSnapshot.val().name].sellingPrice;
        });

        openTag("site");

    });
}

function getAditionalCost() {
    console.log("pega Poooo");
    firebase.database().ref("AdditionalCost").once('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            additionalCosts[childSnapshot.val().id] = Object.assign(new ExtraCostItem, childSnapshot.val());
        });
        console.log("pegou Poooo");
        console.log(additionalCosts);
    });
}