module.exports = class Observer {
    
    // Нужен для инициализации
    constructor(cb){
        this.isStarted = false;
        this.observers = [];
        this.callback = cb;
    }

    start(msg){
        this.isStarted = true;
        return console.log(msg);
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    removeObserver(observer){
        var index = this.observers.findIndex(x => x === observer);
        this.observers.splice(index, 1);
        this.isCompleted();
    }

    isCompleted() {
        if (this.isStarted && !this.observers.length) {
            this.callback();
        }
    }

}