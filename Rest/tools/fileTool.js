const fs = require('fs');

const fileTool = {
    readAndWriteFile: function(singleImg, newPath) {
        fs.readFile(singleImg.path , function(err,data) {
            fs.writeFile(newPath,data, function(err) {
                if (err) console.log('Error: ' + err);
                console.log('Fitxer: '+ singleImg.originalFilename + ' - ' + newPath);
            })
        })
    }
}

module.exports = fileTool;