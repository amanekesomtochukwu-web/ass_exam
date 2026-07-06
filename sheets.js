// ============================================
// EXAMFORGE ATTENDANCE MARKER
// sheets.js
// ============================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYXa1iBZv4BXrbF1FYcEnpxGHwEf1b4qkhybz6n4roxUjCnueh-jo8_X3th-dWUTK-CQ/exec";
// ============================================
// Send Attendance to Google Sheets
// ============================================

async function sendAttendance(course, column, names) {

    const result = document.getElementById("result");

    result.innerHTML = "⏳ Processing attendance... Please wait.";

    try {

        const formData = new FormData();

formData.append("course", course);
formData.append("column", column);
formData.append("names", JSON.stringify(names));

const response = await fetch(SCRIPT_URL, {

    method: "POST",

    body: formData

});
        const data = await response.json();

        if (data.success) {

            showResult(

                data.marked,

                data.notFound

            );

        }

        else {

            result.innerHTML =

            `❌ Error\n\n${data.message}`;

        }

    }

    catch(error){

        console.error(error);

        result.innerHTML =

`❌ Connection Failed

Could not connect to Google Apps Script.

Check:

• Internet Connection

• Script URL

• Deployment Settings`;

    }

}