alert("Site em desenvolvimento");

function showHiddenMenu() {
    openTag("phoneMenu");
    removeSiteScrollbar();
}

function removeSiteScrollbar() {
    document.getElementById("site").classList.add("removeScrollbar");
}

function closeMenu() {
    hideTag("phoneMenu");
    putSiteScrollbar();
}

function putSiteScrollbar() {
    document.getElementById("site").classList.remove("removeScrollbar");
}

function changeLoginToLogout() {
    hideTag("loginPc");
    hideTag("loginPhone");
    openTag("logoutPc");
    openTag("logoutPhone");
}

function changeLogoutToLogin() {
    openTag("loginPc");
    openTag("loginPhone");
    hideTag("logoutPc");
    hideTag("logoutPhone");
}

function changeLoginLogoutButtonAccordingToUserSituation() {
    if (userLogged) {
        changeLoginToLogout();
    } else {
        changeLogoutToLogin();
    }
}

//changeLoginLogoutButtonAccordingToUserSituation();
checkIfUserIsLogged();
