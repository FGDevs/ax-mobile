const loadingSchedule = $(`
  <section class="schedule__loading">
    <div class="skeleton rounded"></div>
  </section>
`);

function makeScheduleCard(elementAppendTo, schedule, { isLoading = false }) {
  if (isLoading) return elementAppendTo.append(loadingSchedule);
  // const { attend_start_at } = schedule;
}

const _mockSchedule = {
  date: new Date(),
  start: 25200,
  end: 54000,
  attend_start_at: null,
  attend_end_at: null,
};

const _mockScheduleAttendedTime = [null, 19000];

function mockSchedule() {
  const randomIndex = Math.round(Math.random() * 1);

  return {
    ..._mockSchedule,
    attend_start: _mockScheduleAttendedTime[randomIndex],
  };
}
