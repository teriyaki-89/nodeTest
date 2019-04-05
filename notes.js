const fs = require('fs');
const file = 'notes.json'
const addNotes = (title, body) => {
    notesJson = loadNotes()
    let check = notesJson.filter(note => note.title === title)
    notesJson.push({
        title: title,
        body: body
    });
    debugger;
    let string = JSON.stringify(notesJson);
    //console.log(check.length)
    if (!check.length) {
        writeToFile(file, string);
        console.log(string)
    }

}

const loadNotes = function () {
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

const removeNotes = function (title, body) {
    try {
        const json = fs.readFileSync('notes.json');
        const notesJson = JSON.parse(json);
        notesJson.push({
            title: title,
            body: body
        })

    } catch (e) {
        return []
    }

}


module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes
}