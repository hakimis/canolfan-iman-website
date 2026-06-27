// ============================================================================
// Canolfan Iman Centre — live prayer times
//
// This pulls CALCULATED prayer times from the free AlAdhan API based on our
// coordinates, purely so the site never shows fake/invented times. It is a
// stand-in only. For real congregational (Iqamah) times, replace this with
// your MyMasjid / Masjidbox / Mawaqit widget — see README.md, section
// "Connecting your real prayer timetable".
//
// To change the calculation method or coordinates, edit the constants below.
// Method reference: https://aladhan.com/calculation-methods
//   0 = Shafi (Jafari), 1 = University of Karachi, 2 = ISNA,
//   3 = Muslim World League, 4 = Umm Al-Qura, 12 = Union Org. Islamic de France
// ============================================================================

(function () {
  "use strict";

  var LATITUDE = 53.285714;
  var LONGITUDE = -3.805355;
  var CALC_METHOD = 3; // Muslim World League — change if your mosque follows another convention

  var PRAYER_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function toMinutes(timeStr) {
    // AlAdhan returns "HH:MM (GMT)" style strings — strip any suffix
    var clean = timeStr.split(" ")[0];
    var parts = clean.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  function formatTime(timeStr) {
    var clean = timeStr.split(" ")[0];
    var parts = clean.split(":").map(Number);
    var h = parts[0], m = parts[1];
    var suffix = h >= 12 ? "pm" : "am";
    var h12 = h % 12;
    if (h12 === 0) h12 = 12;
    return h12 + ":" + pad(m) + suffix;
  }

  function render(timings) {
    var nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    var nextPrayer = null;
    var nextDiff = Infinity;

    PRAYER_ORDER.forEach(function (name) {
      var minutes = toMinutes(timings[name]);
      var diff = minutes - nowMinutes;
      if (diff > 0 && diff < nextDiff) {
        nextDiff = diff;
        nextPrayer = name;
      }
    });

    document.querySelectorAll("[data-prayer]").forEach(function (el) {
      var name = el.getAttribute("data-prayer");
      if (timings[name]) {
        el.textContent = formatTime(timings[name]);
        var cell = el.closest(".prayer-cell");
        if (cell) {
          cell.classList.toggle("is-next", name === nextPrayer);
        }
      }
    });

    document.querySelectorAll("[data-prayer-status]").forEach(function (el) {
      el.textContent = nextPrayer
        ? "Next prayer: " + nextPrayer + " at " + formatTime(timings[nextPrayer]) + " (calculated time)"
        : "Calculated prayer times for today";
    });

    document.querySelectorAll("[data-prayer-date]").forEach(function (el) {
      el.textContent = new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    });
  }

  function renderError() {
    document.querySelectorAll("[data-prayer-status]").forEach(function (el) {
      el.textContent = "Prayer times are temporarily unavailable. Please check back soon, or contact us for today's times.";
    });
    document.querySelectorAll("[data-prayer]").forEach(function (el) {
      el.textContent = "--:--";
    });
  }

  function fetchTimings() {
    var today = new Date();
    var dateStr = pad(today.getDate()) + "-" + pad(today.getMonth() + 1) + "-" + today.getFullYear();
    var url = "https://api.aladhan.com/v1/timings/" + dateStr +
      "?latitude=" + LATITUDE + "&longitude=" + LONGITUDE +
      "&method=" + CALC_METHOD;

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(function (data) {
        if (data && data.data && data.data.timings) {
          render(data.data.timings);
        } else {
          renderError();
        }
      })
      .catch(renderError);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector("[data-prayer]")) {
      fetchTimings();
      // Re-fetch periodically so the "next prayer" highlight stays current
      // and the date rolls over to tomorrow's real times without a page reload.
      setInterval(fetchTimings, 30 * 60 * 1000);
    }
  });
})();
