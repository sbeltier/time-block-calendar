// Global Variables
var hourOfDay_span = $(".hourOfDay");
var timeAM_PM_span = $(".timeAM_PM");
var time = moment().format("h A");
    // Gives hour of day in string format
var currentHour = moment().format("h");
var currentAM_PM = moment().format("A");
var timeBlockText = document.querySelectorAll("input")




// Display current day
var currentDay_jumbotron = moment();
$("#currentDay").text(currentDay_jumbotron.format("dddd, MMMM Do YYYY"));

function updateTimeBlockStyle () {
    // If user is viewing before the work day
    if (currentHour <= 8 && currentAM_PM == "AM") {
        for (i = 0; i < timeBlockText.length; i++) {
            if (timeBlockText[i].classList.contains("past")) {
                timeBlockText[i].classList.remove("past")
                }
            if (timeBlockText[i].classList.contains("present")) {
                timeBlockText[i].classList.remove("present")
                }
            timeBlockText[i].classList.add("future")
        }
    }

    // If user is viewing after the work day
    if (currentHour >= 6 && currentAM_PM == "PM") {
        for (i = 0; i < timeBlockText.length; i++) {
            if (timeBlockText[i].classList.contains("future")) {
                timeBlockText[i].classList.remove("future")
            }
            if (timeBlockText[i].classList.contains("present")) {
                timeBlockText[i].classList.remove("present")
            }
            timeBlockText[i].classList.add("past")
        }
    }


    // If user checks during the work day
    for (i = 0; i < timeBlockText.length; i++) {
        // and if time block is before current hour, set class to past
        if ((hourOfDay_span[i].innerHTML == currentHour && currentAM_PM == "PM") || ((parseInt(hourOfDay_span[i].innerHTML) < currentHour) && (timeAM_PM_span[i].innerHTML == currentAM_PM)) || (parseInt(hourOfDay_span[i].innerHTML) > currentHour) && (timeAM_PM_span[i].innerHTML != currentAM_PM)) {
            if (timeBlockText[i].classList.contains("future")) {
                timeBlockText[i].classList.remove("future")
            }
            if (timeBlockText[i].classList.contains("present")) {
                timeBlockText[i].classList.remove("present")
            }
            timeBlockText[i].classList.add("past")
            console.log("during work day, set time blocks before current hour to past")
        }

            // // and if time block is at the current hour, set class to present
        if (hourOfDay_span[i].innerHTML == currentHour && timeAM_PM_span[i].innerHTML == currentAM_PM) {
            if (timeBlockText[i].classList.contains("future")) {
                timeBlockText[i].classList.remove("future")
            }
            if (timeBlockText[i].classList.contains("past")) {
                timeBlockText[i].classList.remove("past")
            }
            timeBlockText[i].classList.add("present")
        }

            // and if time block is after the current hour, set class to future
        if (((parseInt(hourOfDay_span[i].innerHTML) > currentHour) && (timeAM_PM_span[i].innerHTML == currentAM_PM) && hourOfDay_span[i].innerHTML != "12") || (parseInt(hourOfDay_span[i].innerHTML) < currentHour) && (timeAM_PM_span[i].innerHTML != currentAM_PM)) {
            if (timeBlockText[i].classList.contains("past")) {
                timeBlockText[i].classList.remove("past")
            }
            if (timeBlockText[i].classList.contains("present")) {
                timeBlockText[i].classList.remove("present")
            }
            timeBlockText[i].classList.add("future")
            console.log("if time block is after the current hour, set class to future")


        }
        // Special condition for 12pm
        if ((hourOfDay_span[i].innerHTML == "12") && (currentAM_PM == "AM")) {
            if (timeBlockText[i].classList.contains("past")) {
                timeBlockText[i].classList.remove("past")
            }
            if (timeBlockText[i].classList.contains("present")) {
                timeBlockText[i].classList.remove("present")
            }
            timeBlockText[i].classList.add("future")
            console.log("12PM IS FUTURE")

        }
        
        if ((hourOfDay_span[i].innerHTML == "12") && (currentAM_PM == "PM")) {
            if (timeBlockText[i].classList.contains("future")) {
                timeBlockText[i].classList.remove("future")
            }
            if (timeBlockText[i].classList.contains("present")) {
                timeBlockText[i].classList.remove("present")
            }
            timeBlockText[i].classList.add("past")
            console.log("12PM IS PAST")

        }


    
    }
}

updateTimeBlockStyle();