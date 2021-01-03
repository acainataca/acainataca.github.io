var actualPcId = 1;
var actualPhoneId = 4;
var timer = setInterval(slide, 4000);

function slide() {
    var id = "slidex";

    id = id.replace("x", actualPcId);
    document.getElementById("slide4").classList.remove("appears");
    document.getElementById(id).classList.remove("appears");
    id = id.replace(actualPcId, actualPhoneId);
    document.getElementById(id).classList.remove("appears");

    nextImage();

    id = "slidex";
    id = id.replace("x", actualPcId);
    document.getElementById(id).classList.add("appears");
    id = id.replace(actualPcId, actualPhoneId);
    document.getElementById(id).classList.add("appears");
}

function nextImage() {
    actualPcId += 1;
    actualPhoneId += 1;

    if (actualPcId > 3) {
        actualPcId = 1;
    }

    if (actualPhoneId > 6) {
        actualPhoneId = 4;
    }

}

//checkIfUserIsLogged();