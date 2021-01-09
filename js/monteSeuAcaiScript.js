getProductsInformation().then(
    function (value) { },
    function (error) {
        alert("O site apresentou um Erro, "
            + "por favor contate nosso WhatsApp");
    }
);

function wait() {
    console.log("wait");
}

function checkboxClicked(checkboxId, quantityId, labelId) {
    if (document.getElementById(checkboxId).checked) {
        openTag(quantityId);
        openTag(labelId);
        document.getElementById(quantityId).value = 1;
        var productHtmlId = labelId.replace("Label", "_");
        var productName = document.getElementById(productHtmlId).innerText;
        products[productName].buy();
        updatePaymentAmount();

    } else {
        hideTag(quantityId);
        hideTag(labelId);
        document.getElementById(quantityId).value = 1;
    }
}

function buyAcai() {
    products["acai"].buy();
    updatePaymentAmount();
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