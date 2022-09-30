$(document).on("DOMContentLoaded", () => {
  const THE_FORM = $(".form");
  const BUTTON_SUBMIT = $(".form__submit");
  const FIELD_USERNAME = $(".form__field[data-field*=username]");
  const FIELD_PASSWORD = $(".form__field[data-field*=password]");
  const INPUT_FIELD_USERNAME = $(".form__field[data-field*=username] input");
  const INPUT_FIELD_PASSWORD = $(".form__field[data-field*=password] input");
  const BUTTON_TOGGLE_PASSWORD = FIELD_PASSWORD.find(".field__icon");
  const TEXT_COPYRIGHT_YEAR = $(".login .copyright p span");

  updateCopyrightYear();

  THE_FORM.on("submit", (event) => {
    event.preventDefault();
  });

  BUTTON_TOGGLE_PASSWORD.on("click", () => {
    const TOGGLE_ICON = {
      true: "visibility",
      false: "visibility_off",
    };
    const TOGGLE_TYPE = {
      true: "text",
      false: "password",
    };
    const ICON_INPUT = BUTTON_TOGGLE_PASSWORD.children(".micon");

    const isPassword = String(INPUT_FIELD_PASSWORD.attr("type") === "password");

    ICON_INPUT.html(TOGGLE_ICON[isPassword]);
    INPUT_FIELD_PASSWORD.attr("type", TOGGLE_TYPE[isPassword]);
  });

  BUTTON_SUBMIT.on("click", () => {
    if (!validateLoginForm()) return;
    submitLoginForm();
  });

  INPUT_FIELD_USERNAME.on("input", () => {
    removeErrorMessage(FIELD_USERNAME);
  });

  INPUT_FIELD_PASSWORD.on("input", () => {
    removeErrorMessage(FIELD_PASSWORD);
  });

  function validateLoginForm() {
    let isPassed = true;

    const FORM_FIELD = {
      username: FIELD_USERNAME,
      password: FIELD_PASSWORD,
    };

    const FORM_VALUE = {
      username: INPUT_FIELD_USERNAME.val(),
      password: INPUT_FIELD_PASSWORD.val(),
    };

    // validateNotEmpty taken from utilities/validation.js
    const VALIDATION_RULE = {
      username: [validateNotEmpty],
      password: [validateNotEmpty],
    };
    const INVALID_MESSAGE = {
      username: ["Username cannot be empty"],
      password: ["Password cannot be empty"],
    };

    Object.keys(FORM_VALUE).forEach((key) => {
      VALIDATION_RULE[key].forEach((rule, indexRule) => {
        if (!rule(FORM_VALUE[key])) {
          isPassed = false;
          const errorMessage = INVALID_MESSAGE[key][indexRule];
          addErrorMessage(FORM_FIELD[key], errorMessage);
        }
      });
    });

    return isPassed;
  }

  function submitLoginForm(form) {
    BUTTON_SUBMIT.prop("disabled", true);
    BUTTON_SUBMIT.text("Sedang dikirim...");

    new Promise(function (resolve) {
      setTimeout(() => {
        resolve();
      }, 1000);
    })
      .then(() => {
        BUTTON_SUBMIT.prop("disabled", false);
        BUTTON_SUBMIT.text("Masuk");
        window.location.href = "index.html";
      })
      .catch((error) => {
        BUTTON_SUBMIT.prop("disabled", false);
        BUTTON_SUBMIT.text("Masuk");
      });
  }

  function addErrorMessage(fieldElement, errorMessage) {
    fieldElement.addClass("error");
    fieldElement.find(".field__error p").text(errorMessage);
  }

  function removeErrorMessage(fieldElement) {
    fieldElement.removeClass("error");
    fieldElement.find(".field__error p").text("");
  }

  function updateCopyrightYear() {
    TEXT_COPYRIGHT_YEAR.text(new Date().getFullYear());
  }
});
