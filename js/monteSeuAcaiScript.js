getProductsInformation();
getAditionalCost();

function checkboxClicked(checkboxId, quantityId, labelId) {
    if (document.getElementById(checkboxId).checked) {
        openTag(quantityId);
        openTag(labelId);
        document.getElementById(quantityId).value = 1;
        var productHtmlId = labelId.replace("Label", "_");
        var productName = document.getElementById(productHtmlId).innerText;
        products[productName].buy(1);
        updatePaymentAmount();

    } else {
        hideTag(quantityId);
        hideTag(labelId);
        document.getElementById(quantityId).value = 1;
        var productHtmlId = labelId.replace("Label", "_");
        var productName = document.getElementById(productHtmlId).innerText;
        products[productName].remove(0, true);
        updatePaymentAmount();
    }
}

function buyAcai(productHtmlId) {
    removeAllAcai();

    var productName = document.getElementById(productHtmlId).innerText;
    products[productName].buy(1);
    updatePaymentAmount();
}

function addAdditionalCost(additionalCostId) {
    additionalCosts[additionalCostId].addCost();
    updatePaymentAmount();
}

function removeAdditionalCost(additionalCostId) {
    additionalCosts[additionalCostId].removeCost();
    updatePaymentAmount();
}

function calculateQuantityPrice() {

}

function removeAllAcai() {
    var acaiName1 = document.getElementById('acai_01').innerText;
    var acaiName2 = document.getElementById('acai_02').innerText;
    var acaiName3 = document.getElementById('acai_03').innerText;

    products[acaiName1].remove(0, true);
    products[acaiName2].remove(0, true);
    products[acaiName3].remove(0, true);
}

function updatePaymentAmount() {
    document.getElementById("paymentAmount")
        .innerHTML = "R$ " + roundNumber(cart.price) + " + taxa de entrega.";
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