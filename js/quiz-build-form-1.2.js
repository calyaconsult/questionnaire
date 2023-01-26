const createField = (sectionSiglum,questionSiglum,qnr,qtxt,appendNr) => {
  const indent = '     ';
  const fieldId = `s${sectionSiglum}q${questionSiglum}`;
  const qnrA = (appendNr) ? ' '+qnr : '';
  return `${indent}<label class="form-control" id="l-${fieldId}"><input type="radio" name="${fieldId}" id="${fieldId}" value="${qnr}">${qtxt}${qnrA}</label>`;
}

const createDummyAnswers = (sectionSiglum,questionNr,nrOfAnswers) => {
  const qtxt = "Answer";
  labelSet = [];
  for (let anr=0;anr<nrOfAnswers;anr++) {
     labelSet.push(createField(sectionSiglum,questionNr,anr,qtxt,true)); // 'true/false' steuert, ob die Antwortnummer angezeigt wird oder nicht
  }
  return labelSet;
}

const createFieldset = (sectionSiglum,legend,questionNr,answers) => {
  var nrOfAnswers = (isNaN(answers) || answers === null)  ? 3 : Number(answers); // Default
  const qtxt = "Answer"; // Default
  var qLabelSet = [];
  if (Array.isArray(answers)) {
    nrOfAnswers = answers.length;
    for (let anr = 0;anr<nrOfAnswers;anr++) {
      let answer = Object.keys(answers[anr])[0];
      let isCorrect = answers[anr][answer];
      qLabelSet.push(createField(sectionSiglum,questionNr,anr,answer,false)); // 'true/false' steuert, ob die Antwortnummer angezeigt wird oder nicht
    }
  } else { // if we dont have an array of answers we create a default field
    qLabelSet = [...qLabelSet,...createDummyAnswers(sectionSiglum,questionNr,nrOfAnswers)];
  }

  const qLegend = `<legend id="leg-s${sectionSiglum}q${questionNr}">${legend}</legend>`;
  const fieldsetTemplate = `
  <fieldset class="f04" id="fs-s${sectionSiglum}q${questionNr}">
    ${qLegend}${qLabelSet.reduce((a,b) => {return a+'\n'+b;}, '' )}
  </fieldset>`;
   return fieldsetTemplate;
}

const buildForm = (params) => {
  const sectionNames = params["sectionNames"];
  const questions = params["questions"];
  const answers = params["answers"];
  const formAction = params["formAction"] || '#';
  const formMethod = params["formMethod"] || 'get';
  const formId = params["formId"] || 'myForm';
  const maxQuestions = 99;
  var myForm = $(`<form action="${formAction}" method="${formMethod}" id=${formId}></form>`);
  myForm.append('<input type="submit">');
  for (let section=0;section<sectionNames.length;section++) {
    //console.log(questions);
    myForm.append(`<h3 id="H3s${section}">Section &laquo;${sectionNames[section]}&raquo;</h3>`);
    for (let question=0;question<questions[sectionNames[section]].length;question++) {
      if (question >= maxQuestions) break;
      myForm.append(createFieldset(section,`${questions[sectionNames[section]][question]}`,question,answers[sectionNames[section]][question]));
    }
  }
  return myForm;
}
