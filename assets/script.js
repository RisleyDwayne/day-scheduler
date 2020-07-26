$(document).ready(function () {

    const currentDateEl = $("#currentDay");

    let events = {};

    const calendar = $("div.container");

    let lastDateRendered = moment();

    function renderCalendar(today, events) {

        let hour = moment(today).hour(9);

        calendar.empty();

        for (let i = 0; i < 9; i++) {

            const row = $("<div>").addClass("row");

            let hourClass = "";

            if (today.isBefore(hour, "hour")) {
                hourClass = "future";
            } else if (today.isAfter(hour, "hour")) {
                hourClass = "past";
            } else {
                hourClass = "present";
            }

            row.append($("<div>").addClass("col-2 hour").text(hour.format("h A")));

            let timeBlock = hour.format("hA");
            row.append($("<textarea>").addClass(`col-8 ${hourClass}`).text(events[timeBlock]));

            row.append($("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>").attr("aria-label", "Save").attr("id", hour.format("hA")));
            console.log(hour.format("hA"));

            hour.add(1, "hour");

            lastDateRendered = moment();

            calendar.append(row);
        }

    }

    function initCalendar() {
        const today = moment(); // set today's date
        currentDateEl.text(today.format('LL'));
        renderCalendar(today, events);
    }

    function loadCalendar() {
        const storedCalendar = JSON.parse(localStorage.getItem("events"));
        if (storedCalendar) {
            events = storedCalendar;
        }

    }

    loadCalendar();
    initCalendar();

    function saveCalendar() {
        localStorage.setItem("events", JSON.stringify(events));
    }

    function clearCalendar() {
        events = {};
        saveCalendar();
        initCalendar();
    }

    $("#clear").on("click", clearCalendar);

    $(document).on("click", ".saveBtn", function (event) {
        const textArea = event.currentTarget.parentElement.children[1];
        let eventText = textArea.value;
        events[event.currentTarget.id] = eventText;
        saveCalendar();
    });

});