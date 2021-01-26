getProductsInformation();
getAditionalCost();

function checkboxClicked(checkboxId, quantityId, labelId) {
    if (document.getElementById(checkboxId).checked) {
        openTag(quantityId);
        openTag(labelId);
        document.getElementById(quantityId).value = 1;
        var productHtmlId = labelId.replace("Label", "_");
        var productName = document.getElementById(productHtmlId).innerText;
        products[productName].addToCombo(1);

    } else {
        hideTag(quantityId);
        hideTag(labelId);
        document.getElementById(quantityId).value = 1;
        var productHtmlId = labelId.replace("Label", "_");
        var productName = document.getElementById(productHtmlId).innerText;
        products[productName].removeFromCombo(0, true);
    }
}

function buyAcai(productHtmlId) {
    removeAllAcai();

    var productName = document.getElementById(productHtmlId).innerText;
    products[productName].addToCombo(1);
}

function checkIfEssencialsWasChoosed() {
    var acai = document.getElementsByName("acai");
    var hasGoblet = document.getElementsByName("hasGoblet");
    var sendSpoon = document.getElementsByName("sendSpoon");

    return ( atleastOneRadioChecked(acai)
        && atleastOneRadioChecked(hasGoblet)
        && atleastOneRadioChecked(sendSpoon));
}

function removeCheckedItens(checkId) {
    hideTag(checkId);
    var itensOptions = document.getElementsByName(checkId);
    let size = itensOptions.length;
    for (let i = 0; i < size; i++) {
        if (itensOptions[i].checked) {
            itensOptions[i].checked = false;
            itensOptions[i].onclick();

        }
    }
}

function atleastOneRadioChecked(radios) {
    let size = radios.length;
    for (let i = 0; i < size; i++) {
        if (radios[i].checked) {
            return true;
        }
    }

    return false;
}

function addAdditionalCost(additionalCostId) {
    additionalCosts[additionalCostId].addCost();
}

function removeAdditionalCost(additionalCostId) {
    additionalCosts[additionalCostId].removeCost();
}

function calculateQuantityPrice(productHtmlId, quantityId) {
    var productName = document.getElementById(productHtmlId).innerText;
    var newQuantity = document.getElementById(quantityId).value;

    if (newQuantity == "" || products[productName].quantity == newQuantity) {
        return;
    } else {
        products[productName].addToCombo(newQuantity);
    }
}


function multiplyRequest() {
    console.log(cart);
    //Still finding a solution.
}

/*function addToCart() {
    let productsQuantity = Object.keys(cart.products).length;
    ++productsQuantity;
    let name = "Meu Combo " + productsQuantity;
    let productDescription = name + " : Possui ";
    for (x in myCombo.products) {
        products[myCombo.products[x].name].buy();
        productDescription += " " + myCombo.products[x].name + "; ";
    }
    let newCombo = new CartProduct(name, myCombo.price, productDescription);
    cart.products[name] = newCombo;
    cart.price += myCombo.price;
    myCombo.price = 0.0;
    updatePaymentAmount();
    console.log(cart);

}*/

function removeAllAcai() {
    var acaiName1 = document.getElementById('acai_01').innerText;
    var acaiName2 = document.getElementById('acai_02').innerText;
    var acaiName3 = document.getElementById('acai_03').innerText;

    products[acaiName1].removeFromCombo(0, true);
    products[acaiName2].removeFromCombo(0, true);
    products[acaiName3].removeFromCombo(0, true);
}

function updatePaymentAmount() {
    document.getElementById("paymentAmount")
        .innerHTML = "R$ " + roundNumber(cart.price);
}

function getPersonalInfo() {
    hideTag("buying");

    //change image source to the payment image
    document.getElementById("title").src = "images/titles/payment_title_pc.jpg";
    //TO-DO: check if the products are avaiable before confirming the buy
    openTag("payment");
}

function changeRequest() {
    //TO-DO: Remove the card cost before the user can change the price of the product
    openTag("buying");
    hideTag("payment");


    //change image source to the buying image
    document.getElementById("title").src = "images/titles/monte_acai_title_pc.jpg";
}

function cardPayment() {
    hideTag("changeLabel");
    hideTag("change");
}

function moneyPayment() {
    openTag("changeLabel");
    openTag("change");
}