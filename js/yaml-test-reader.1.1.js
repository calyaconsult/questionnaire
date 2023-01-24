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
    $('#L4').append('<h5 style="width:10em;font-weight:normal;padding-left:2px;border-left:1px solid blue;border-right:1px solid blue;border-top:1px solid blue;">Generierte &lt;form&gt;</h5>');
    fromYaml = yaml;
    const questionSet = [...Object.values(fromYaml),
      ...[
      [
        [null,"What is A?",null,null],
        [null,"How does B look?",null,null],
        [null,"When will C arrive?",null,null]
      ],
      [
        [null,"Why did D fail?",null,null],
        [null,"How many parts does E have?",null,null],
        [null,"What is the weight of F?",null,null]
      ],
      [
        [null,"Does G look new?",null,null],
        [null,"What is the color of H?",null,null],
        [null,"How many words are on I?",null,null]]
    ]];

    const formParams = {
        sectionNames : [...Object.keys(fromYaml),...["General","Technical","Content"]],
        questions : questionSet.map(x => x.map(y => y[1])),
        answers   : questionSet.map(x => x.map(y => y[3]))
    }
    const myForm = buildFormV2(formParams);
    $('#L4').append(myForm);
  })
  .then(() => {


  });
