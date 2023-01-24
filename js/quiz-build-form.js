// FOR TESTING
var fromYaml = {};
/*
  "BASIC": [
    ["B1","Benutzt Ihre Website das https-Protokoll",null,["Ja","Nein, nur http","Beides, http und https","Ich weiss es nicht"]],
    ["B2","Meldet der Browser beim Aufruf Ihrer Domain ein fehlerhaftes oder abgelaufenes SSL-Zertifikat",null,["Nein, es gibt keine solche Meldung","Ja, es gibt eine solche Meldung","Ich weiss nicht, was das ist"]],
    ["B3","Gibt es auf Ihrer Website Seiten, die beim Aufruf eine Fehlermelung des Typs '500 - Server' Error auslösen",null,["Ja, es gibt Seiten mit solch einer Fehlermeldung","Nein, alle Seiten funktionieren"]],
    ["B4","Gibt es Seiten, die die Fehlermeldung '404 - nicht gefunden' auslösen",null,["Nein, alle können aufgerufen werden","Ja, einige werden nicht gefunden"]],
    ["B5","Ist das HTML aller Ihrer Seiten validiert",null,["Ja, alles in Ordnung","Ja, aber bei einigen gibt es Fehler","Nein, ich habe das noch nie kontrolliert"]],
    ["B6","Haben Sie bei allen Ihren Seiten den Seitentitel kontrolliert",null,["Ja, und jede Seite hat einen passenden, unverwechselbaren Titel","Ja, aber einige Seiten haben identische Titel oder es fehlen Titel","Nein, ich habe das noch nie kontrolliert"]]
  ],
  "TECH": [
  [
    "T52",
    "Gibt es aktuelle oder wiederkehrende technische Probleme, die Nutzer auf der Website gemeldet haben",
    null,
    [
      "Ja, es gibt Seiten mit technischen Problemen",
      "Nein, alle Seiten funktionieren"
    ]
  ],
  [
    "T53",
    "Gibt es Inhalte, die die Ladezeit oder Leistung der Website beeinträchtigen",
    null,
    [
      "Ja, es gibt solche Inhalte",
      "Nein"
    ]
  ],
  [
    "T54",
    "Gibt es Probleme mit der Leistung der Website an verschiedenen geografischen Standorten",
    "Geografie",
    null
  ],
  [
    "T55",
    "Gibt es Probleme mit der Leistung der Website bei geringen Geräteressourcen",
    "Geräteleistung",
    null
  ],
  [
    "T56",
    "Gibt es Probleme mit der Leistung der Website bei hohem Traffic oder hoher Last",
    "Serverlast",
    null
  ],
  [
    "T57",
    "Gibt es Probleme mit der Leistung der Website bei schlechter Netzwerkkonnektivität",
    "Netzwerklast",
    null
  ]
]}; */
/*
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

// END FOR TESTING
// When reading questions from YAML, remove the test data from 'sectionNames' and 'questionSet'

const formParams = {
    sectionNames : [...Object.keys(fromYaml),...["General","Technical","Content"]],
    questions : questionSet.map(x => x.map(y => y[1])),
    answers   : questionSet.map(x => x.map(y => y[3]))
}
/*
/* REMOVE
const buildForm = (params) => {
  console.log(params);
  const sectionNames = params["sectionNames"];
  const questions = params["questions"];
  const answers = params["answers"];
  for (let section=0;section<sectionNames.length;section++) {
    $("#questionnaire").append(`<h3 id="H3s${section}">Section &laquo;${sectionNames[section]}&raquo;</h3>`);
    for (let question=0;question<questions[section].length;question++) {
      $("#questionnaire").append(createFieldset(section,`${questions[section][question]}`,question,answers[question]));
    }
  }
}
*/
const buildFormV1 = (params) => {
  const sectionNames = params["sectionNames"];
  const questions = params["questions"];
  const answers = params["answers"];
  const formId = params["formId"] || "myForm"; // Just in case there is no param called 'formId'
  for (let section=0;section<sectionNames.length;section++) {
    $(`#${formId}`).append(`<h3 id="H3s${section}">Section &laquo;${sectionNames[section]}&raquo;</h3>`);
    for (let question=0;question<questions[section].length;question++) {
      $(`#${formId}`).append(createFieldset(section,`${questions[section][question]}`,question,answers[section][question]));
    }
  }
}

/* TEST */
const buildFormV2 = (params) => { // Same function as buildForm but doesn't update an existing form; it creates a new form fills it and returns the form object
  var myForm = $('<form/>');
  const sectionNames = params["sectionNames"];
  const questions = params["questions"];
  const answers = params["answers"];
  const maxQuestions = 2;
  for (let section=0;section<sectionNames.length;section++) {
    myForm.append(`<h3 id="H3s${section}">Section &laquo;${sectionNames[section]}&raquo;</h3>`);
    for (let question=0;question<questions[section].length;question++) {
      if (question >= maxQuestions) break;
      myForm.append(createFieldset(section,`${questions[section][question]}`,question,answers[section][question]));
    }
  }
  return myForm;
}
