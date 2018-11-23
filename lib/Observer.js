module.exports = class Observer {
    
    // Нужен для инициализации
    constructor(cb){
        this.isStarted = false;
        this.observers = [];
        this.callback = cb;
    }

    start(){
        this.isStarted = true;
        return console.log('isStarted = true');
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    removeObserver(observer){

    }

}