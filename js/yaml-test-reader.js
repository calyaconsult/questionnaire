// Source: https://stackoverflow.com/questions/70917787/looking-for-a-coherent-example-on-how-to-read-a-yaml-file-in-a-browser-yaml-fil
const buildForm = (params) => {
  //console.log(params);
  var myForm = $('<form/>');
  const sectionNames = params["sectionNames"];
  const answers = params["nrOfAnswers"];
  const questions = params["questions"];
  const maxQuestions = 2;
  for (let section=0;section<sectionNames.length;section++) {
    myForm.append(`<h3 id="H3s${section}">Section &laquo;${sectionNames[section]}&raquo;</h3>`);
    for (let question=0;question<questions[section].length;question++) {
      if (question >= maxQuestions) break;
      myForm.append(createFieldset(section,`${questions[section][question]}`,question,answers));
    }
  }
  return myForm;
}
fetch("webforms/fragebogen-1.yaml")
  .then(response => response.text())
  .then(text => {
    // once the file has been loaded, we can parse it into an object.
    const yaml = jsyaml.load(text);
    //console.log(yaml);
    const sampleSection = "BASIC"; // Object.keys(yaml)[0]
    for (let section in yaml) {
      $("#L1").append(`<p>${section}</p>`);
      const questionNr = 2;
      if (typeof yaml[section][questionNr] != "undefined"){
        let anzahlFragen = 0;
        $("#qnumber").html(questionNr+1);
        $(".qindex").html(questionNr);
        if(yaml[section][questionNr][3] !== null) anzahlFragen = yaml[section][questionNr][3].length;
        $("#L2").append(`<p><span class="sp-section">${section}</span>: <span class="sp-question">${yaml[section][questionNr][0]}</span> - ${yaml[section][questionNr][1]} -  ${anzahlFragen} Antworten</p>`);
      }
    }
    for (let q=0;q<yaml[sampleSection].length;q++) {
      let anzahlFragen = yaml[sampleSection][q][3].length;
      $("#abschnitt").html(sampleSection);
      $("#L3").append(`<p><span class="sp-question">${yaml[sampleSection][q][0]}</span> - ${yaml[sampleSection][q][1]} -  ${anzahlFragen} Antworten</p>`)
    }
    let paramObj = {
        sectionNames : [sampleSection,"CONT"],
        nrOfAnswers : 3,
        questions : [yaml[sampleSection].map(x => x[1]),yaml["CONT"].map(x => x[1])]
    }
    $('#L4').append('<h5 style="width:10em;font-weight:normal;padding-left:2px;border-left:1px solid blue;border-right:1px solid blue;border-top:1px solid blue;">Generierte &lt;form&gt;</h5>');
    $('#L4').append(buildForm(paramObj));
  });
