function submitForm() {
    // Get the form data
    var formData = new FormData(document.getElementById("questionnaire"));
    // Use the Fetch API to send the form data to a remote server
    fetch("http://192.168.1.53:8088/webforms/website-check-up-ultra-light.php", {
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
            thisAnswer = (typeof data[q]["answers"][a]["text"] === "undefined") ? '<span class="noa">nicht beantwortet</span>' : data[q]["answers"][a]["text"];
          }
        }
        //console.log(thisQuestion,thisAnswer);
        if (typeof thisQuestion != "undefined") {
           output += `<p><span class="que">${thisQuestion.replace("?",":")}</span> <span class="ans">${thisAnswer}</span></p>`;
        }
      }
      document.getElementById("result").innerHTML = output;
    })
    .catch(error => {
      console.log("Error:", error);
    });
  }

$(document).ready(function () {
  $("#result").hide();
  $("form").submit(function (event) {
    event.preventDefault();
    submitForm();
    $("#i_4w1ccu").html("Ihre Antworten");
    $("#result").show();
  });
});
