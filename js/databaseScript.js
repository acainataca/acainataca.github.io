//put this code in a new script file called financeScript from here
function roundNumber(number) {
    return (Math.round(number * 100) / 100).toFixed(2);
}

class CartProduct{
    constructor(productName, sellingPrice, productDescription) {
        this.productName = productName;
        this.sellingPrice = sellingPrice;
        this.productDescription = productDescription;
    }
}

class BoughtItem {
    constructor(boughtQuantity, productId) {
        this.boughtQuantity = boughtQuantity;
        this.productId = productId;
    }

    get name() {
        return this.productId;
    }
}

class ExtraCostItem {
    constructor(cost, id, name) {
        this.cost = cost;
        this.id = id;
        this.name = name;
    }

    addCost() {
        if (!cart.additionalCost.hasOwnProperty(this.id)) {
            if (this.id != "debito" && this.id != "credito") {
                myCombo.products[this.id] =
                    new ExtraCostItem(parseFloat(this.cost), this.id, this.name);
            } else {
                let cost = cart.price * (parseFloat(this.cost) / 100);
                cart.additionalCost[this.id] = new ExtraCostItem(cost, this.id, this.name);
                cart.price += cost;
            }
        }
    }

    buy() {
        myCombo.price += parseFloat(this.cost);
    }

    removeCost() {
        if (cart.additionalCost.hasOwnProperty(this.id)) {
            if (this.id == "debito" && this.id == "credito") {
                let cost = cart.additionalCost[this.id].cost;
                cart.price -= cost;
                delete cart.additionalCost[this.id];
            }
        } else {
            this.removeFromCombo(1, true);
        }
    }

    removeFromCombo(removeQuantity, removeAll) {
        if (myCombo.products.hasOwnProperty(this.id)) {
            if (removeAll == true || removeAll == 'true'
                || parseInt(removeQuantity) >= myCombo.products[this.id].boughtQuantity) {
                delete myCombo.products[this.id];
            }
        }
    }
}

/*class Product {
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

    addToCombo(buyQuantity) {
        if (myCombo.products.hasOwnProperty(this.id)) {
            myCombo.products[this.id].boughtQuantity += parseInt(buyQuantity);
        } else {
            myCombo.products[this.id] =
                new BoughtItem(parseInt(buyQuantity), this.name);
        }

        console.log(myCombo);
    }

    buy() {
        myCombo.price += parseFloat(this.sellingPrice) *
            myCombo.products[this.id].boughtQuantity;
    }

    removeFromCombo(removeQuantity, removeAll) {
        if (myCombo.products.hasOwnProperty(this.id)) {
            if (removeAll == true || removeAll == 'true'
                || parseInt(removeQuantity) >= myCombo.products[this.id].boughtQuantity) {
                delete myCombo.products[this.id];
            }
            else{
                myCombo.products[this.id].boughtQuantity -= parseInt(removeQuantity);
            }
        }
    }
}*/

var cart = {
    "products": {},
    "additionalCost": {},
    "price": 0.00
};


var myCombo = {
    "products": {},
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
    firebase.database().ref("AdditionalCost").once('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            additionalCosts[childSnapshot.val().id] = Object.assign(new ExtraCostItem, childSnapshot.val());
            products[childSnapshot.val().name] = Object.assign(new ExtraCostItem, childSnapshot.val());
        });
    });
}