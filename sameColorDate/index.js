window.addEventListener("load", working);
function working() {
  var startDate = new Date();
  var daysList = document.getElementById("daysList");
  daysList.innerHTML = "";

  var weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  for (var i = 0; i < 7; i++) {
    var currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    var listItem = document.createElement("li");
    listItem.textContent = currentDate.toDateString();
    listItem.classList.add(weekdays[currentDate.getDay()]);
    daysList.appendChild(listItem);
  }

  return false;
}
