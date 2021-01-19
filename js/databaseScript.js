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
        if (!cart.AdditionalCost.hasOwnProperty(this.id)) {
            if (this.id != "debito" && this.id != "credito") {
                cart.AdditionalCost[this.id] =
                    new ExtraCostItem(parseFloat(this.cost), this.id);
                cart.price += parseFloat(this.cost);
            } else {
                let cost = cart.price * (parseFloat(this.cost) / 100);
                cart.AdditionalCost[this.id] = new ExtraCostItem(cost, this.id);
                cart.price += cost;
            }
        }
    }

    removeCost() {
        if (cart.AdditionalCost.hasOwnProperty(this.id)) {
            let cost = cart.AdditionalCost[this.id].cost;
            cart.price -= cost;
            delete cart.AdditionalCost[this.id];
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

    buy(buyQuantity) {
        if (cart.products.hasOwnProperty(this.id)) {
            cart.products[this.id].boughtQuantity += parseInt(buyQuantity);
        } else {
            cart.products[this.id] =
                new BoughtItem(parseFloat(this.sellingPrice), parseInt(buyQuantity), this.id);
        }
        cart.price += parseFloat(this.sellingPrice);
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
            }
        }
    }
}

var cart = {
    "products": {},
    "AdditionalCost": {},
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
            alert("AConteceu um erro e n�o conseguimos fazer o logout. "
                + "tente novamente em 10 segundos")
        });
}

function getProductsInformation() {
    firebase.database().ref("Product").once('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            products[childSnapshot.val().name] = Object.assign(new Product, childSnapshot.val());
            document.getElementById(childSnapshot.val().htmlId)
                .innerHTML = childSnapshot.val().name;
        });

        openTag("site");

    });
}

function getAditionalCost() {
    firebase.database().ref("AdditionalCost").once('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            additionalCosts[childSnapshot.val().id] = Object.assign(new ExtraCostItem, childSnapshot.val());
        });

        additionalCosts["frete"].addCost();
        updatePaymentAmount();
    });
}