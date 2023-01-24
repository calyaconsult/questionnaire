const fillTemplate = (legend,legendSiglum,questionSiglum) => {
  const fieldsetTemplate = `<fieldset class="f04" id="fs${legendSiglum}-${questionSiglum}">
   <legend id="qu${legendSiglum}">${legend}?</legend>
   <label class="form-control"><input type="radio" name="s${legendSiglum}q${questionSiglum}" value="1"> Ja</label>
   <label class="form-control"><input type="radio" name="s${legendSiglum}q${questionSiglum}" value="2"> Nein</label>
   <label class="form-control"><input type="radio" name="s${legendSiglum}q${questionSiglum}" value="3"> Weiss nicht</label>
   <label class="form-control"><input type="radio" name="s${legendSiglum}q${questionSiglum}" value="4"> Vielleicht</label>
</fieldset>`;
  return fieldsetTemplate;
}

const remoteUrl = "http://192.168.1.53:8088/webforms/website-check-up-gpt.php";
// const remoteUrl = "https://staging.calyaconsult.ch/ccch/webforms/website-check-up-gpt.php";

const submitForm = () => {
    // Get the form data
    var formData = new FormData(document.getElementById("questionnaire"));
    // Use the Fetch API to send the form data to a remote server
    fetch(remoteUrl, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Handle the server response
      // console.log(data);
      document.getElementById("questionnaire").remove();
      var output = '';
      for (const q in data) {
        let thisQuestion = data[q]["question"];
        let thisAnswer = null;
        for (const a in data[q]["answers"]) {
          if (data[q]["answers"][a]["selected"] === true) {
            thisAnswer = (typeof data[q]["answers"][a]["text"] === "undefined") ? `${a}|<span class="noa">nicht beantwortet</span>` : `${a}|${data[q]["answers"][a]["text"]}`;
          }
        }
        if (typeof thisQuestion != "undefined") {
           let [answerNr, answer] = ['0',thisAnswer];
           if (thisAnswer !== null) [answerNr, answer] = thisAnswer.split("|");
           output += `<p><span class="qid">${q}a${answerNr}</span> <span class="que">${thisQuestion.replace("?",":")}</span> <span class="ans">${answer}</span></p>`;
        }
      }
      document.getElementById("result").innerHTML = output;
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

const buildForm = (gptQuestions) => {
  var outerCounter = 0;
  for (const section in gptQuestions) {
    var innerCounter = 0;
    $("#questionnaire").append(`<h3 id="H3s${outerCounter}">${section}</h3>`);
    for (q in gptQuestions[section]) {
      innerCounter++;
      // if (counter>2) continue;
      if (gptQuestions[section][q][1] === null) {
        $("#questionnaire").append(fillTemplate(gptQuestions[section][q][0],outerCounter,q));
      } else {
        let fieldsetId = `fs${outerCounter}-${innerCounter}`;
        $("#questionnaire").append(`<fieldset class="f04" id="${fieldsetId}">
         <legend id="qu${outerCounter}">${gptQuestions[section][q][0]}?</legend></fieldset>`);
         for (let lbl=0;lbl<gptQuestions[section][q][1].length;lbl++) {
           $(`#${fieldsetId}`).append(`<label class="form-control"><input type="radio" name="s${outerCounter}q${q}" value="${lbl+1}"> ${gptQuestions[section][q][1][lbl]}</label>`);
         }
      }
    }
    outerCounter++;
  }
}

$(document).ready(function () {
  $.getJSON( "webforms/gpt-questions-D1.json", function( data ) {
    buildForm(data);
    $("#result").hide();
    $("form").submit(function (event) {
      event.preventDefault();
      submitForm();
      $("#i_4w1ccu").html("Ihre Antworten");
      $("#result").show();
    });
  });
});
