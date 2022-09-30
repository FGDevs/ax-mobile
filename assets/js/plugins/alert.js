const ALERT = $(`
  <div class="alert">
    <div class="alert__box">
      <p class="alert__icon micon"></p>
      <p class="alert__content"></p>
      <button class="alert__close">
        <span class="micon">close</span>
      </button>
    </div>
  </div>`);

const ICON_TYPE = {
  info: "info",
  error: "error_outline",
  success: "check_circle",
};

const MODIFIER_TYPE = {
  info: "info",
  error: "error",
  success: "success",
};

const ELS = {
  ALERT_WRAPPER: () => $(".alert"),
  ALERT_BOX: () => $(".alert__box"),
  ALERT_ICON: () => $(".alert__icon"),
  ALERT_MESSAGE: () => $(".alert__content"),
  ALERT_CLOSE: () => $(".alert__close"),
};

const HIDESHOW_TRANSITION_TIME = 500;
const CLOSE_ALERT_DELAY = 5000;

$(document).on("DOMContentLoaded", () => {
  _injectAlert();
  _registerCoreListener();
});

let _alert_interval;

function _injectAlert() {
  const isAlertInjected = $(".alert").length;
  if (isAlertInjected) return;
  $("body").append(ALERT);
}
function _registerCoreListener() {
  ELS.ALERT_CLOSE().on("click", () => {
    _hideAlert();
  });
}

function _generateAlert(type, message) {
  let delay = 0;

  if (ELS.ALERT_WRAPPER().hasClass("show")) {
    _hideAlert();
    delay = HIDESHOW_TRANSITION_TIME;
  }

  setTimeout(() => {
    _createAlert(type, message);
    _showAlert();
    _createInterval();
  }, delay);
}
function _createAlert(type, message) {
  ELS.ALERT_BOX().addClass(MODIFIER_TYPE[type]);
  ELS.ALERT_ICON().text(ICON_TYPE[type]);
  ELS.ALERT_MESSAGE().text(message);
}
function _showAlert() {
  ELS.ALERT_WRAPPER().addClass("show");
}
function _hideAlert() {
  ELS.ALERT_WRAPPER().removeClass("show");
  _cleanInterval();

  setTimeout(() => {
    _cleanAlert();
  }, HIDESHOW_TRANSITION_TIME);
}
function _cleanAlert() {
  ELS.ALERT_BOX().removeClass(Object.keys(MODIFIER_TYPE));
}
function _createInterval() {
  _alert_interval = setInterval(
    (function (counter) {
      return function () {
        counter -= 1000;
        if (counter <= 0) {
          clearInterval(_alert_interval);
          _hideAlert();
        }
      };
    })(CLOSE_ALERT_DELAY),
    1000
  );
}
function _cleanInterval() {
  clearInterval(_alert_interval);
}

function $alert(type, message) {
  _generateAlert(type, message);
}
