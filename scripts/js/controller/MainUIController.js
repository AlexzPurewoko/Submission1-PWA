// Base class for all fragments....

class MainUIController extends HTMLElement{
    constructor() {
        super();
        if(this === MainUIController){
            throw new TypeError('Please implement this class!');
        }

        if(this.setPreData ===MainUIController.prototype.setPreData){
            this.setPreData(null);
        }
        
        if(this.reload ===MainUIController.prototype.reload){
            this.reload();
        }

        if(this.addCallbacks === MainUIController.prototype.addCallbacks){
            this.addCallbacks(null);
        }
    }

    setPreData(newData){
        throw new TypeError('Please implement setPreData() method!');
    }

    reload(){
        throw new TypeError('Please implement reload() method!');
    }

    addCallbacks(callbacks) {
        throw new TypeError('Please implement addCallbacks() method!');
    }
}