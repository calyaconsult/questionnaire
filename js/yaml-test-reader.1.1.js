// Source: https://stackoverflow.com/questions/70917787/looking-for-a-coherent-example-on-how-to-read-a-yaml-file-in-a-browser-yaml-fil

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
    $('#L4').append('<h5 style="width:10em;font-weight:normal;padding-left:2px;border-left:1px solid blue;border-right:1px solid blue;border-top:1px solid blue;">Generierte &lt;form&gt;</h5><form id="myform"></form>');

  })
  .then(() => {
    const myForm = buildFormV1(formParams);
    console.log(myForm);
    $('#myform').append(myForm);
  });
