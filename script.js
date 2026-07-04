document.addEventListener("DOMContentLoaded", () => {

    console.log("Page loaded");

    const courseSelect = document.getElementById("course");

    console.log(courseSelect);

    const courses = [
        "PHY 102",
        "MTH 102",
        "CHM 102",
        "STA 112",
        "STA 202",
        "BIO 102",
        "ZOO 102",
    ];

    courses.forEach(course => {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    });

    console.log(courseSelect.innerHTML);

    document
        .getElementById("processBtn")
        .addEventListener("click", processAttendance);

});


// ===================================
// Week list
// ===================================

const weeks = [
    1,2,3,4,5,
    6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
];

const weekSelect = document.getElementById("week");

weekSelect.innerHTML = "";

weeks.forEach(week => {

    const option = document.createElement("option");

    option.value = week;

    option.textContent = `Week ${week}`;

    weekSelect.appendChild(option);

});

// Default week
weekSelect.value = 8;


function processAttendance() {

    // Read selected values
    const course = document.getElementById("course").value;
    const week = document.getElementById("week").value;
    const period = document.getElementById("period").value;

    // Read pasted names
    const rawInput = document.getElementById("attendanceInput").value;

    // Check if textarea is empty
    if (rawInput.trim() === "") {

        alert("Please paste the attendance list.");

        return;

    }

    // Clean and normalize names
    const names = normalizeNames(rawInput);

    // Create sheet column
    const column = `WEEK ${week}${period}`;

    // Display preview
    displayPreview(course, column, names);

    // Send to Google Sheets
    // (We'll write this function inside sheets.js)
    console.log(course);
console.log(column);

sendAttendance(course, column, names);
}



// ===========================================
// Convert text into clean array
// ===========================================

function normalizeNames(text) {

    return text

        .split("\n")                 // One name per line

        .map(name => name.trim())    // Remove spaces

        .filter(name => name !== "") // Remove blank lines

        .map(name =>

            name

            .replace(/\s+/g, " ")

            .toLowerCase()

        );

}



// ===========================================
// Preview Before Upload
// ===========================================

function displayPreview(course, column, names) {

    const result = document.getElementById("result");

    result.innerHTML =

`
Course : ${course}

Column : ${column}

Students Found : ${names.length}

------------------------------------

${names.join("\n")}

------------------------------------

Uploading...
`;

}



// ===========================================
// Receive Result From Google Sheets
// ===========================================

function showResult(success, notFound) {

    const result = document.getElementById("result");

    result.innerHTML =

`
✅ Attendance Processing Complete

Students Marked : ${success}

Names Not Found : ${notFound.length}

------------------------------------

${notFound.join("\n")}

`;

}