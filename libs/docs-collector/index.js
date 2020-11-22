const fs = require("fs")
const path = require("path")

class DocsCollector {
    constructor(dir,definition) {
        this.dir = dir;
        this.definition = definition 
    }
    getSwaggerDocument = () => {
        return 5
    }
    getAllFiles(dirPath, arrayOfFiles) {
        files = fs.readdirSync(dirPath)
      
        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(function(file) {
          if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
          }
        })
      
        return arrayOfFiles
    }
}
console.log(__dirname + "/../../src")
// let swaggerDocument = new DocsCollector(__dirname + "../../src").getSwaggerDocument
// console.log(swaggerDocument)
module.exports = { DocsCollector }