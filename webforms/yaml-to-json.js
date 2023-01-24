const inputYML = 'input.yml';
const outputJSON = 'output.json';
const yaml = require('js-yaml');
const fs = require('fs');
const obj = yaml.load(fs.readFileSync(inputYML, {encoding: 'utf-8'})); 
 
//this code if you want to save file locally
fs.writeFileSync(outputJSON, JSON.stringify(obj, null, 2));
