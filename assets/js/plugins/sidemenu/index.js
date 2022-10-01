const THE_SIDEMENU = $(`
  <div id="sidemenu" class="side-menu">
    <div class="header">
      <button id="sidemenu-back" class="header__close">
        <span class="micon">arrow_back</span>
      </button>
      <p id="sidemenu-title" class="header__title">
        Profil
      </p>
    </div>
    <div id="sidemenu-container" class="body"></div>
  </div>
`);

const ELS_SIDEMENU = {
  THE_SIDEMENU: () => $("#sidemenu"),
  THE_CONTAINER: () => $("#sidemenu-container"),
  TEXT_TITLE: () => $("#sidemenu-title"),
  BUTTON_BACK: () => $("#sidemenu-back"),
};

$(document).on("DOMContentLoaded", () => {
  _injectSidemenu();
  $mp_show();
  _registerSidemenuListener();
});

const backButtonStack = [];

function _injectSidemenu() {
  $("body").append(THE_SIDEMENU);
}
function _showSidemenu() {
  const { THE_SIDEMENU } = ELS_SIDEMENU;
  THE_SIDEMENU().addClass("show");
}
function _hideSidemenu() {
  const { THE_SIDEMENU } = ELS_SIDEMENU;
  THE_SIDEMENU().removeClass("show");
}
function _registerSidemenuListener() {
  const { BUTTON_BACK } = ELS_SIDEMENU;
  BUTTON_BACK().on("click", () => _runBackAction());
}
function _runBackAction() {
  if (!backButtonStack.length) return;

  backButtonStack[0]();
  backButtonStack.splice(0, 1);
}
function _addBackAction(action) {
  backButtonStack.unshift(action);
}

function $sm_show() {
  _showSidemenu();
  _addBackAction(_hideSidemenu);
}
function $sm_getContainer() {
  const { THE_CONTAINER } = ELS_SIDEMENU;
  return THE_CONTAINER();
}
function $sm_setTitle(title) {
  const { TEXT_TITLE } = ELS_SIDEMENU;
  TEXT_TITLE().text(title);
}
function $sm_setBackAction(fn) {
  _addBackAction(fn);
}
