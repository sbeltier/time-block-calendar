// Global Variables
var hourOfDay_span = $(".hourOfDay");
var timeAM_PM_span = $(".timeAM_PM");
var time = moment().format("h A");
    // Gives hour of day in string format
var currentHour = moment().format("h");
var currentAM_PM = moment().format("A");
var timeBlockText = document.querySelectorAll("input")
var saveTaskButton = document.querySelectorAll("button")
// newTask = {
//     Task: taskDescription,
//     Hour: totalTime,
// }
// taskListArr is an array of the ^ ABOVE ^ newTask Objects
var taskListArr = [];
for (var j = 0; j < saveTaskButton.length; j++) {
    // Initialize taskListArr with (9) empty Task Objects
    var newTask = {
        Task: null,
        Hour: null
    }
    taskListArr.push(newTask);
}


// When the saveTaskButton is clicked, save the respective task description into the local storage.
for (var i = 0; i < saveTaskButton.length; i++) {
    var newIDNumber = document.getElementsByClassName('description')[i]
    newIDNumber.setAttribute('id', (i))

    saveTaskButton[i].addEventListener('click', function (e) {        
        var taskDescription = this.parentElement.getElementsByClassName('description')[0].value;
        var taskTimeNumber = this.parentElement.getElementsByClassName('hourOfDay')[0].innerHTML;
        var taskTimeAM_PM = this.parentElement.getElementsByClassName('timeAM_PM')[0].innerHTML;
        var taskNumber = this.parentElement.querySelector('input').getAttribute('id')
        parseInt(taskNumber);
        var totalTime = parseInt(taskTimeNumber)+taskTimeAM_PM;
        var newTask = {
            Task: taskDescription,
            Hour: totalTime
        }

        taskListArr.splice(taskNumber, 1, newTask)
        console.log(taskNumber)
        console.log(newTask)
        
        // Save in Local Storage
        localStorage.setItem("To Do List", JSON.stringify(taskListArr))
        // updateTaskCalendar()



    }
    )
}

// Add previously saved data to webpage
function updateTaskCalendar (){
    console.log("Entering function {{ updateTaskCalendar() }}")
    if (localStorage.getItem("To Do List") != null && localStorage.getItem("To Do List") != undefined ) {
        var taskList = JSON.parse(localStorage.getItem("To Do List"))
        console.log(taskList)
        for (var i = 0; i < saveTaskButton.length; i++) {
            if (taskList[i] != undefined) {
                if (taskList[i].Task != undefined && taskList[i].Task != null) {
                    document.getElementById(i).value = taskList[i].Task
                    // Initialize the global taskListArr with the data from localStorage
                    taskListArr.splice(i, 1, taskList[i])
                    console.log("check")
                }
            } else {
                console.log("There was no Task for Index (i = " + i + ")")
            }

        }
    } else {
        console.log("There is nothing saved in local storage! Let's bail out now..")
        return;
    }


    
}
updateTaskCalendar()



// Display current day
var currentDay_jumbotron = moment();
$("#currentDay").text(currentDay_jumbotron.format("dddd, MMMM Do YYYY"));

function updateTimeBlockStyle () {
    // If user is viewing before the work day
    if (currentHour <= 8 && currentAM_PM == "AM") {
        for (var i = 0; i < timeBlockText.length; i++) {
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
        for (var j = 0; j < timeBlockText.length; j++) {
            if (timeBlockText[j].classList.contains("future")) {
                timeBlockText[j].classList.remove("future")
            }
            if (timeBlockText[j].classList.contains("present")) {
                timeBlockText[j].classList.remove("present")
            }
            timeBlockText[j].classList.add("past")
        }
    }


    // If user checks during the work day
    for (var k = 0; k < timeBlockText.length; k++) {
        // and if time block is before current hour, set class to past
        if (((hourOfDay_span[k].innerHTML == currentHour) && (currentAM_PM == "PM") && (currentHour != "12")) || ((parseInt(hourOfDay_span[k].innerHTML) < currentHour) && (timeAM_PM_span[k].innerHTML == currentAM_PM)) || (parseInt(hourOfDay_span[k].innerHTML) > currentHour) && (timeAM_PM_span[k].innerHTML != currentAM_PM) && (currentHour != "12")) {
            if (timeBlockText[k].classList.contains("future")) {
                timeBlockText[k].classList.remove("future")
            }
            if (timeBlockText[k].classList.contains("present")) {
                timeBlockText[k].classList.remove("present")
            }
            timeBlockText[k].classList.add("past")
            console.log("during work day, set time blocks before current hour to past")
        }

            // // and if time block is at the current hour, set class to present
        if (hourOfDay_span[k].innerHTML == currentHour && timeAM_PM_span[k].innerHTML == currentAM_PM) {
            if (timeBlockText[k].classList.contains("future")) {
                timeBlockText[k].classList.remove("future")
            }
            if (timeBlockText[k].classList.contains("past")) {
                timeBlockText[k].classList.remove("past")
            }
            timeBlockText[k].classList.add("present")
        }

            // and if time block is after the current hour, set class to future
        if (((parseInt(hourOfDay_span[k].innerHTML) > currentHour) && (timeAM_PM_span[k].innerHTML == currentAM_PM) && hourOfDay_span[k].innerHTML != "12") || (parseInt(hourOfDay_span[k].innerHTML) < currentHour) && (timeAM_PM_span[k].innerHTML != currentAM_PM)) {
            if (timeBlockText[k].classList.contains("past")) {
                timeBlockText[k].classList.remove("past")
            }
            if (timeBlockText[k].classList.contains("present")) {
                timeBlockText[k].classList.remove("present")
            }
            timeBlockText[k].classList.add("future")
            console.log("if time block is after the current hour, set class to future")


        }
        // Special condition for 12pm
        if ((hourOfDay_span[k].innerHTML == "12") && (currentAM_PM == "AM")) {
            if (timeBlockText[k].classList.contains("past")) {
                timeBlockText[k].classList.remove("past")
            }
            if (timeBlockText[k].classList.contains("present")) {
                timeBlockText[k].classList.remove("present")
            }
            timeBlockText[k].classList.add("future")
            console.log("12PM IS FUTURE")

        }
        
        if ((currentHour != "12") && (hourOfDay_span[k].innerHTML == "12") && (currentAM_PM == "PM")) {
            if (timeBlockText[k].classList.contains("future")) {
                timeBlockText[k].classList.remove("future")
            }
            if (timeBlockText[k].classList.contains("present")) {
                timeBlockText[k].classList.remove("present")
            }
            timeBlockText[k].classList.add("past")
            console.log("12PM IS PAST")

        }

        if ((hourOfDay_span[k].innerHTML == "12") && (currentAM_PM == "PM") && (currentHour == "12")) {
            if (timeBlockText[k].classList.contains("future")) {
                timeBlockText[k].classList.remove("future")
            }
            if (timeBlockText[k].classList.contains("past")) {
                timeBlockText[k].classList.remove("past")
            }
            timeBlockText[k].classList.add("present")
            console.log("12PM IS NOW")

        }


    
    }
}

updateTimeBlockStyle();