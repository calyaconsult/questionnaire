/*
  Send form data to an external script for processing
*/

// Configuration
const remoteUrl = "http://192.168.1.53:8088/webforms/website-check-up-gpt.php";
// const remoteUrl = "https://staging.calyaconsult.ch/ccch/webforms/website-check-up-gpt.php";
// const notAnswered = 'nicht beantwortet';
const notAnswered = 'not answered';
// const noText = 'kein Antworttext';
const noText = 'no text for this answer';
const formId = "form-qu";
const resultDivId = "result";
const h5TabId = "h5-tab";

// console.log("form230125.js");

const submitForm = (formId) => {
    console.log(formId);
    // Get the form data
    var formData = new FormData(document.getElementById(formId));
    // Use the Fetch API to send the form data to a remote server
    fetch(remoteUrl, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Handle the server response
      document.getElementById(formId).remove();
      var output = '';
      for (const q in data) {
        let thisQuestion = data[q]["question"];
        let thisAnswer = null;
        let foundAnswer = false;
        for (const a in data[q]["answers"]) {
          if (data[q]["answers"][a]["selected"] === true) {
            foundAnswer = true;
            thisAnswer = (typeof data[q]["answers"][a]["text"] === "undefined") ? `${a}|<span class="noa">${noText}</span>` : `${a}|${data[q]["answers"][a]["text"]}`;
          } else {

          }
          thisAnswer = (foundAnswer) ? thisAnswer : `${a}|<span class="noa">${notAnswered}</span>`;
        }

        /* Check if this is still necessary */
        if (typeof thisQuestion != "undefined") {
           let [answerNr, answer] = ['0',thisAnswer];
           if (thisAnswer !== null) [answerNr, answer] = thisAnswer.split("|");
           output += `<p><span class="qid">${q}a${answerNr}</span> <span class="que">${thisQuestion.replace("?",":")}</span> <span class="ans">${answer}</span></p>`;
        }
      };
      document.getElementById(resultDivId).innerHTML = output;
      document.getElementById(resultDivId).style.display = "block";
      document.getElementById(resultDivId).style.visibility = "visible";
      document.getElementById(h5TabId).innerHTML = "Ihre Antworten";
    })
    .catch(error => {
      console.log("Error:", error);
    });
}
