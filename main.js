var fs = require("fs");
var path = require("path");

function listDirAndMoveFiles(dir, dest) {
    if (!dir || !dest) {
        return console.log("need two args");
    }

    if (!(isNaN(dir) || isNaN(dest))) {
        return console.log("Вы ввели числа вместо указания строчных аргументов");
    }

    fs.readdir(dir, (err, files) => {
        if (err) {
            return console.log("Ошибка чтения каталога");
        }

        // Создание новой корневой папки и проверка
        if (!fs.existsSync(dest)) {
            return fs.mkdirSync(dest);
        }

        files.forEach(function (file) {
            file = path.resolve(dir, file);


            fs.stat(file, function (err, stat) {
                if (stat.isDirectory()) {
                    listDirAndMoveFiles(file, dest);

                } else if (!stat.isDirectory()) {

                    var name = dest + "\\" + path.basename(file)[0] + "\\" + path.basename(file);
                    var folder = dest + "\\" + path.basename(file)[0];
                    // Создание новой корневой папки и проверка
                    if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder);
                    }

                    fs.renameSync(file, name);
                }
            });
        });
    });
    return 0;
}

listDirAndMoveFiles(process.argv[2], process.argv[3]);

