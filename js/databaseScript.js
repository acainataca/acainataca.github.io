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
    constructor(cust, id) {
        this.cust = cust;
        this.id = id;
    }


}

class Product {
    constructor(cust, htmlId, id, name, percentageProfit) {
        this.cust = cust;
        this.htmlId = htmlId;
        this.id = id;
        this.name = name;
        this.percentageProfit = percentageProfit;
    }

    putNameInTheHTML() {
        document.getElementById(this.htmlId).innerHTML = this.name;
    }

    get sellingPrice() {
        var percentagePrice = (parseFloat(this.cust)
            * (parseFloat(this.percentageProfit) / 100));
        percentagePrice = roundNumber(percentagePrice);

        var totalPrice = (parseFloat(this.cust) +
            parseFloat(percentagePrice));

        return roundNumber(totalPrice);
    }

    buy() {
        if (cart.products.hasOwnProperty(this.id)) {
            cart.products[this.id].boughtQuantity += 1;
        } else {
            cart.products[this.id] =
                new BoughtItem(parseFloat(this.sellingPrice), 1, this.id);
        }
        cart.price += parseFloat(this.sellingPrice);

    }

    remove() {
        if (this.boughtQuantity > 0) {
            var quantity = this.boughtQuantity;
            for (let i = 0; i < quantity; i++) {
                cart.price -= this.sellingPrice;
                this.boughtQuantity -= 1;                
            }
        }
    }
}

var cart = {
    "products": {},
    "AdditionalCost": [],
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

async function getProductsInformation() {
    firebase.database().ref("Product").on('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            products[childSnapshot.val().name] = Object.assign(new Product, childSnapshot.val());
            document.getElementById(childSnapshot.val().htmlId)
                .innerHTML = childSnapshot.val().name;
        });

        console.log(products);
        if (cart.price == 0.00) {
            buyAcai();
        }

    });

    
}
