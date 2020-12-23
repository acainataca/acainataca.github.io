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