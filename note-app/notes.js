const fs = require('fs');
const myFile = 'notes.json'

const chalk = require('chalk');

const addNotes = (title, body) => {

    notesJson = loadNotes(myFile);

    let check = notesJson.filter( note =>   note.title === title   );
    

   if (!check.length) {
       notesJson.push({
        title: title,
        body: body
    });

    let newString = JSON.stringify(notesJson);
    writeToFile(myFile, newString);

   } else {
       console.log(chalk.inverse.red('note already exists'))
   }

}

const loadNotes = function (file) {
    try {
        const json = fs.readFileSync(file);
        const notesJson = JSON.parse(json);
        return notesJson;
    } catch (e) {
        return []
    }
}

const writeToFile = function (file, text) {
    fs.writeFileSync(file, text);
}

const removeNotes = function (title) {
    notesJson = loadNotes(myFile);

    const newArray = notesJson.filter(function(item) {
        return item.title !== title
    });
    
    if (newArray.length !== notesJson.length ) {
         let newString =  JSON.stringify(newArray);
         writeToFile(myFile,newString)
         console.log(chalk.green('deleting the article'))
    } else {
        console.log(chalk.red('no found article'))
    }
}


module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes
}