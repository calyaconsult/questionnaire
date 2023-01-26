// Source: https://stackoverflow.com/questions/70917787/looking-for-a-coherent-example-on-how-to-read-a-yaml-file-in-a-browser-yaml-fil
$(document).ready(function () {
const formId = "form-qu";
fetch("webforms/fragebogen-1.yaml")
  .then(response => response.text())
  .then(text => {
    // once the file has been loaded, we can parse it into an object.
    const yaml = jsyaml.load(text);
    //console.log(yaml);
    const sampleSection = Object.keys(yaml["Questions"])[0];
    //console.log(sampleSection);
    for (let section in yaml["Questions"]) {
      $("#L1").append(`<p>${section}</p>`);
      const questionNr = 1;
      if (typeof yaml["Questions"][section][questionNr] != "undefined"){
        let anzahlFragen = yaml["Answers"][section][questionNr].length;
        $("#qnumber").html(questionNr+1);
        $(".qindex").html(questionNr);
        $("#L2").append(`<p><span class="sp-section">${section}</span>: <span class="sp-question">${yaml["Questions"][section][questionNr]}</span>  -  ${anzahlFragen} answers</p>`);
      }
    }
    for (let q=0;q<yaml["Questions"][sampleSection].length;q++) {
      let anzahlFragen = yaml["Answers"][sampleSection][q].length;
      $("#abschnitt").html(sampleSection);
      $("#L3").append(`<p><span class="sp-question">${yaml["Questions"][sampleSection][q]}</span> -  ${anzahlFragen} answers</p>`)
    }
    $('#L4').append('<h5 id="h5-tab" style="width:10em;font-weight:normal;padding-left:2px;border-left:1px solid blue;border-right:1px solid blue;border-top:1px solid blue;">Generierte &lt;form&gt;</h5>');
    const formParams = {
        sectionNames : Object.keys(yaml["Questions"]),
        questions : yaml["Questions"],
        answers   : yaml["Answers"],
        formAction : "https://webhook.site/79bb8cdc-1afc-4511-bbf0-5d977b034550",
        formMethod : 'post',
        formId : formId
    }
    const myForm = buildForm(formParams);
    $('#L4').append(myForm);
  }).then(function() {
    $("#result").hide();
    $(`#${formId}`).submit(function (event) {
      event.preventDefault();
      console.log(submitForm);
      submitForm(formId);
    });
  });
});
