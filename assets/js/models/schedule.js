// ETA: Element To Append
// ILS: Interactable

// ------ MOCK RESPONSE
const _mockSchedule = {
  date: new Date(),
  start: 25200,
  end: 54000,
  attend_start_at: null,
  attend_end_at: null,
};

// ------ ENUMS
const ATTENDANCE_STATUS = {
  ONTIME: "ontime",
  LATE: "late",
  /** TODO: add toleration */
};
const ATTENDANCE_STATUS_TEXT = {
  ONTIME: "Tepat Waktu",
  LATE: "Terlambat",
  /** TODO: add toleration */
};

// ------ LOADING STATE
const ETA_LOADING = $(`
  <section id="sch" class="schedule" data-status="loading">
    <div class="skeleton rounded"></div>
  </section>
`);
function $sch_showLoading(container) {
  container.append(ETA_LOADING);
}
function $sch_hideLoading(container) {
  container.find("#sch[data-status=loading]").remove();
}

// ------ ATTENDED
const ETA_ATTENDED = $(`
  <section id="sch" class="schedule" data-status="end">
    <div id="sch-checkin" class="checkin">
      <div class="head">
        <p class="head__title">Check - In</p>
        <p id="sch-checkin-status" class="head__checkin"></p>
      </div>
      <div class="body">
        <div class="body__container" data-type="expected">
          <p class="title">Dijadwalkan</p>
          <div class="detail">
            <em class="micon">watch_later</em>
            <p id="sch-checkin-expected" class="hour">00:00 WIB</p>
          </div>
        </div>
        <div class="body__container" data-type="result">
          <p class="title">Absen Masuk</p>
          <div class="detail">
            <p id="sch-checkin-result" class="hour">00:00:00</p>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="checkout">
      <div class="head">
        <p class="head__title">Check - Out</p>
      </div>
      <div class="body">
        <div class="body__container" data-type="expected">
          <p class="title">Dijadwalkan</p>
          <div class="detail">
            <em class="micon">watch_later</em>
            <p id="sch-checkout-expected" class="hour">00:00 WIB</p>
          </div>
        </div>
        <div class="body__container" data-type="result">
          <p class="title">Absen Pulang</p>
          <div class="detail">
            <p id="sch-checkout-result" class="hour">-</p>
          </div>
        </div>
      </div>
    </div>
    <button id="sch-action" class="action">
      Absen Pulang
    </button>
  </section>
`);
const ILS_ATTENDED = {
  THE_CHECKIN: () => $("#sch-checkin"),
  TEXT_CHEKIN_STATUS: () => $("#sch-checkin-status"),
  TEXT_CHECKIN_EXPECTED: () => $("#sch-checkin-expected"),
  TEXT_CHECKIN_RESULT: () => $("#sch-checkin-result"),
  TEXT_CHECKOUT_EXPECTED: () => $("#sch-checkout-expected"),
  TEXT_CHECKOUT_RESULT: () => $("#sch-checkout-result"),
  BUTTON_ACTION: () => $("#sch-action"),
};
function $sch_showAttended(container, data) {
  container.append(ETA_ATTENDED);
  _fillScheduleAttended(data);
  _registerScheduleAttendedListener();
}
function _fillScheduleAttended(data) {
  const { attend_start_at, attend_end_at, date, start, end } = data;
  const {
    THE_CHECKIN,
    TEXT_CHEKIN_STATUS,
    TEXT_CHECKIN_EXPECTED,
    TEXT_CHECKIN_RESULT,
    TEXT_CHECKOUT_EXPECTED,
  } = ILS_ATTENDED;

  const attendanceStatus = _getCheckinStatus(date, start, attend_start_at);
  THE_CHECKIN().attr("data-status", attendanceStatus);
  TEXT_CHEKIN_STATUS().text(
    ATTENDANCE_STATUS_TEXT[attendanceStatus.toUpperCase()]
  );

  TEXT_CHECKIN_EXPECTED().text(`${formatHHMM(start)} WIB`);
  TEXT_CHECKIN_RESULT().text(formatHHMMSS(attend_start_at));
  TEXT_CHECKOUT_EXPECTED().text(`${formatHHMM(end)} WIB`);

  if (attend_end_at) {
    const { TEXT_CHECKOUT_RESULT } = ILS_ATTENDED;
    TEXT_CHECKIN_RESULT().text(formatHHMMSS(attend_end_at));
  }
}
function _registerScheduleAttendedListener() {
  const { BUTTON_ACTION } = ILS_ATTENDED;

  BUTTON_ACTION().on("click", () => {
    $alert("info", "Feature coming soon!");
  });
}

function _getCheckinStatus(date, expected, result) {
  date.setHours(0, 0, 0, 0);
  const expectedTime = date.getTime() + expected;
  const resultTime = date.getTime() + result;
  const diff = resultTime - expectedTime;

  if (diff < 0) return ATTENDANCE_STATUS.ONTIME;
  return ATTENDANCE_STATUS.LATE;
}

// ------ UNATTENDED STATE
const ETA_UNATTENDED = $(`
  <section id="sch" class="schedule" data-status="start">
    <p class="title">Jadwal Absen</p>
    <div class="time">
      <div data-type="start">
        <p class="title">Jam Masuk</p>
        <p class="detail">
          <em class="micon">watch_later</em>
          <span id="sch-starthour" class="hour">00:00</span>
        </p>
      </div>
      <div data-type="end">
        <p class="title">Jam Pulang</p>
        <p class="detail">
          <em class="micon">watch_later</em>
          <span id="sch-endhour" class="hour">00:00</span>
        </p>
      </div>
    </div>
    <button id="sch-action" class="action">
      Absen Masuk
    </button>
  </section>
`);
const ILS_UNATTENDED = {
  TEXT_STARTHOUR: () => $("#sch-starthour"),
  TEXT_ENDHOUR: () => $("#sch-endhour"),
  BUTTON_ACTION: () => $("#sch-action"),
};
function $sch_showUnattended(container, data) {
  container.append(ETA_UNATTENDED);
  _fillScheduleUnattended(data);
  _registerScheduleUnattendedListener(container, data);
}
function $sch_hideUnattended(container) {
  container.find("#sch[data-status=start]")?.remove();
}
function _fillScheduleUnattended(data) {
  const { start, end } = data;
  const { TEXT_STARTHOUR, TEXT_ENDHOUR } = ILS_UNATTENDED;

  TEXT_STARTHOUR().text(`${formatHHMM(start)} WIB`);
  TEXT_ENDHOUR().text(`${formatHHMM(end)} WIB`);
}
function _registerScheduleUnattendedListener(container, data) {
  const { BUTTON_ACTION } = ILS_UNATTENDED;

  BUTTON_ACTION().on("click", () => {
    $sch_setStartAttend(BUTTON_ACTION()).then((result) => {
      const now = new Date();
      const totalSecond =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

      $sch_hideUnattended(container);
      $sch_showAttended(container, {
        ...data,
        attend_start_at: totalSecond,
      });
      $alert("success", "Anda berhasil melakukan absen");
    });
  });
}

// ------ ACTION BUTTON
function _setScheduleActionSending(element) {
  element.text("Sedang dikirim..");
  element.prop("disabled", true);
}
function _setScheduleActionSent(element, text) {
  element.text(text);
  element.prop("disabled", false);
}

// ------ HELPERS: MOCK RESPONSE
function $mock_schedule(index = 0) {
  const mockScheduleAttendedTime = [null, 19000, 25700];
  return {
    ..._mockSchedule,
    attend_start_at: mockScheduleAttendedTime[index],
  };
}

// ----- PUBLIC FUNCTION
function $sch_setStartAttend(element) {
  return new Promise((resolve) => {
    _setScheduleActionSending(element);
    setTimeout(() => {
      _setScheduleActionSent(element, "Absen Masuk");
      resolve({
        statusCode: 200,
        message: "succes",
      });
    }, 500);
  });
}
