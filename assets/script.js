$(document).ready(function () {

    const currentDateEl = $("#currentDay");
    const calendar = $("div.container");
    let events = {};
    let lastDateRendered = moment();

    // create and display time blocks on calendar
    function renderCalendar(today, events) {

        let hour = moment(today).hour(9);

        calendar.empty();

        for (let i = 0; i < 9; i++) {

            const row = $("<div>").addClass("row");

            let hourClass = "";

            //determine whether time block has past, or is in the future
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

            hour.add(1, "hour");

            lastDateRendered = moment();

            calendar.append(row);
        }

    }

    //initialize calendar from todays date
    function initCalendar() {
        const today = moment(); // set today's date
        currentDateEl.text(today.format('LL'));
        renderCalendar(today, events);
    }

    //get stored calendar events from local storage
    function loadCalendar() {
        const storedCalendar = JSON.parse(localStorage.getItem("events"));
        if (storedCalendar) {
            events = storedCalendar;
        }

    }

    loadCalendar();
    initCalendar();

    //store events
    function saveCalendar() {
        localStorage.setItem("events", JSON.stringify(events));
    }

    //empty events
    function clearCalendar() {
        events = {};
        saveCalendar();
        initCalendar();
    }

    //event handlers
    $("#clear").on("click", clearCalendar);

    $(document).on("click", ".saveBtn", function (event) {
        const textArea = event.currentTarget.parentElement.children[1];
        let eventText = textArea.value;
        events[event.currentTarget.id] = eventText;
        saveCalendar();
    });

});