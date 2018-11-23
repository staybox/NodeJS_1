var fs = require("fs");
var path = require("path");
var observer = require("./lib/Observer.js");
var program = require('commander');

// var obs = new observer();
// obs.start();
// return;

/**
 * Commander
 */
program
  .version('1.0.0')
  .option('-d, --dir [myVar]', 'Add dir')
  .option('-e, --dest [myVar]', 'Add dest')
  .parse(process.argv); 
  
    
var where = program.dir;
var these = program.dest;


function listDirAndMoveFiles(where, these) {
    console.log(where, these);
    return;
    if (!where || !these) {
        return console.log("need two args");
    }

    if (!(isNaN(where) || isNaN(these))) {
        return console.log("Вы ввели числа вместо указания строчных аргументов");
    }

    fs.readdir(where, (err, files) => {
        if (err) {
            return console.log("Ошибка чтения каталога");
        }

        // Создание новой корневой папки и проверка
        if (!fs.existsSync(these)) {
            return fs.mkdirSync(these);
        }

        files.forEach(function (file) {
            file = path.resolve(where, file);

            fs.stat(file, function (err, stat) {
                if (stat.isDirectory()) {
                    listDirAndMoveFiles(file, these, delFolder);
                } else if (!stat.isDirectory()) {
                    var name =
                        these + "\\" + path.basename(file)[0] + "\\" + path.basename(file);
                    var folder = these + "\\" + path.basename(file)[0];
                    // Создание новой корневой папки и проверка
                    if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder);
                    }

                    fs.renameSync(file, name);
                }

            });
        });
        // console.log(delFolder);
        // if (delFolder === "y") {
        //     return fs.rmdir(where, function (del) {
        //         console.log(del);
        //     });
        // }
    });
    return 0;
}


listDirAndMoveFiles(where, these);