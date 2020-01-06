'use strict';

{
  const timer = $('#timer');
  const start = $('#start');
  const stop = $('#stop');
  const reset = $('#reset');

  let startTime;
  let timeoutId;
  let elapsedTIme = 0;

  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTIme);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');

    timer.text(`${m}:${s}.${ms}`);
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  function setButtonStateInitial() {
    start.removeClass('inactive');
    start.removeClass('non');
    stop.addClass('inactive');
    stop.addClass('non');
    reset.addClass('inactive');
    reset.addClass('non');
  }
  function setButtonStateRunning() {
    start.addClass('inactive');
    start.addClass('non');
    stop.removeClass('inactive');
    stop.removeClass('non');
    reset.addClass('inactive');
  }
  function setButtonStateStopped() {
    start.removeClass('inactive');
    start.removeClass('non');

    stop.addClass('inactive');
    stop.addClass('non');
    reset.removeClass('inactive');
    reset.removeClass('non');
  }

  setButtonStateInitial();

  // start.addEventListener('click', () => {
  start.click(function () {
    if (start.hasClass('inactive') === true) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });
  // stop.addEventListener('click', () => {
  stop.click(function () {
    if (stop.hasClass('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTIme += Date.now() - startTime;
  });
  // reset.addEventListener('click', () => {
  reset.click(function () {
    if (start.hasClass('inactive') === true) {
      return;
    }
    setButtonStateInitial();
    timer.text( `00:00.000`);
    elapsedTIme = 0;
  });
}