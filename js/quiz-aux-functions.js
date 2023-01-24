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
  //console.log(sectionSiglum,legend,questionNr,answers);
  var nrOfAnswers = (isNaN(answers) || answers === null)  ? 3 : Number(answers); // Default
  console.log(nrOfAnswers);
  const qtxt = "Answer"; // Default
  var qLabelSet = [];
  if (Array.isArray(answers)) {
    nrOfAnswers = answers.length;
    for (let anr = 0;anr<nrOfAnswers;anr++) {
      qLabelSet.push(createField(sectionSiglum,questionNr,anr,answers[anr],false)); // 'true/false' steuert, ob die Antwortnummer angezeigt wird oder nicht
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

/*
  Hier muss weiter am CSS gearbeitet werden. Mit Text-Input funktioniert der Fragebogen noch nicht
*/
const createTextFieldset = (sectionSiglum,legend,questionNr,nrOfAnswers) => {
  const qLegend = `<legend id="s${sectionSiglum}-q${questionNr}-leg">${legend}</legend>`;
  const qLabelSet = [];
  for (let qnr = 0;qnr<nrOfAnswers;qnr++) {
    qLabelSet.push(`     <label class="text-field-label" style="display:block"><input type="text" size="80" name="s${sectionSiglum}q${questionNr}" value="${qtxt} ${qnr}"></label>`);
  }
  const fieldsetTemplate = `
  <fieldset class="f04" id="fs-${sectionSiglum}-${questionNr}">
    ${qLegend}${qLabelSet.reduce((a,b) => {return a+'\n'+b;}, '' )}
  </fieldset>`;
   return fieldsetTemplate;
}
