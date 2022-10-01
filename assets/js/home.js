const ELS_HOME = {
  BUTTON_TOGGLE_PROFILE: () => $(".user__profile"),
  TEXT_NAME_USER: () => $(".user__name"),
  TEXT_NAME_GENDER: () => $(".user__gender"),
  TEXT_DATE_ATTENDANCE: () => $(".date__now"),
  SECTION_SCHEDULE: () => $(".schedule"),
};

const GENDER_MAP = {
  male: "Mr",
  female: "Mrs",
};

$(document).on("DOMContentLoaded", () => {
  // $alert("success", "DOM Content loaded");
  setHeaderUser();
  setDateNow();
  getSchedule();
  _registerHomeListeners();
});

function getUser() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    window.location.href = "login.html";
    return;
  }

  return storedUser;
}

function setHeaderUser() {
  const { TEXT_NAME_USER, TEXT_NAME_GENDER } = ELS_HOME;
  const user = getUser();

  TEXT_NAME_USER().text(user.name);
  TEXT_NAME_GENDER().text(GENDER_MAP[user.gender]);
}

function setDateNow() {
  const { TEXT_DATE_ATTENDANCE } = ELS_HOME;

  const now = new Date();
  const day = now.getDay();
  const date = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  TEXT_DATE_ATTENDANCE().text(formatDateFull(day, date, month, year));
}

function _registerHomeListeners() {
  const { BUTTON_TOGGLE_PROFILE } = ELS_HOME;

  BUTTON_TOGGLE_PROFILE().on("click", () => {
    $sm_show();
  });
}

function getSchedule() {
  const { SECTION_SCHEDULE } = ELS_HOME;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockSchedule());
    });
  }).then((result) => {
    makeScheduleCard(SECTION_SCHEDULE(), result, { isLoading: true });
  });
}

function _simulateUser(user) {
  if (user) return;

  localStorage.setItem(
    "user",
    JSON.stringify({
      name: "Fitrah Pratama",
      gender: "male",
    })
  );
  getUser();
}
