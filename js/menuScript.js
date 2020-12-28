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