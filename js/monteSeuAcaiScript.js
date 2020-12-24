function hideTag(id) {
    document.getElementById(id).classList.add("closed");
}

function openTag(id) {
    document.getElementById(id).classList.remove("closed");
}

function checkboxClicked(checkboxId, quantityId, labelId) {
    if (document.getElementById(checkboxId).checked) {
        openTag(quantityId);
        openTag(labelId);
        document.getElementById(quantityId).value = 1;
    } else {
        hideTag(quantityId);
        hideTag(labelId);
        document.getElementById(quantityId).value = 1;
    }
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