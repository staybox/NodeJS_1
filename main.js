#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var observer = require("./lib/Observer.js");
var program = require('commander');
var del = require('del');


/**
 * Commander
 */
program
  .version('1.0.0')
  .option('-d, --dir [myVar]', 'Add dir')
  .option('-e, --dest [myVar]', 'Add dest')
  .option('-x, --removeSource', 'Delete source directory with subfolders')
  .parse(process.argv); 
  
    
var where = program.dir;
var these = program.dest;
var delSource = program.removeSource;



var obs = new observer(() => {
    console.log('************ read ***********');
    if(delSource === true){
        del.sync(where);
    }
    
    //del.sync(`${path.join(where, path.sep)}**`);
    console.log('delete source directory');
    
});


function listDirAndMoveFiles(where, these) {
    
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
                console.log(file);
                if (stat.isDirectory()) {
                
                    listDirAndMoveFiles(file, these);
                } 
                if (!stat.isDirectory()) {
                    obs.addObserver(file);
                    var name = these + "\\" + path.basename(file)[0] + "\\" + path.basename(file);
                    var folder = these + "\\" + path.basename(file)[0];
                    // Создание новой корневой папки и проверка
                    if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder);
                    }

                    fs.rename(file, name, (err) => {
                        if (err) throw err;
                        console.log('Rename complete!');
                        obs.removeObserver(file);
                      });
                }

            });
            
        });
    });
    
}

listDirAndMoveFiles(where, these);
obs.start('sorting...');
