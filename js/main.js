// --------TEST--------------------
let x = false;
document.querySelector('.btn-test').addEventListener('click', function() {
    x ? x = false : x = true;
    toggleModes();
});

function toggleModes() {
    if (x) {
        document.getElementById('write').style.display = 'none';
        document.getElementById('read').style.display = 'block';
    } else {
        document.getElementById('write').style.display = 'block';
        document.getElementById('read').style.display = 'none';
    }
}

toggleModes();
//-------------------------------


class Pickle {
    constructor(id, date, content, alignment) {
        this.id = id;
        this.date = date;
        this.content = content;
        this.alignment = alignment;
    }   
};

// PICKLE CONTROLLER
class PickleController {
    constructor(jar = []) {
        this.jar = jar;
    }

    // Add new pickle to the jar
    addNewPickle(input, alignment) {
        let newPickle, id;

        // Create new pickle object
        // Create new ID
        if(this.jar.length > 0) {
            id = this.jar[this.jar.length - 1].id + 1;
        } else {
            id = 0;
        }
        newPickle = new Pickle(id, new Date(), input, alignment);
        this.jar.push(newPickle);
        console.log(newPickle);

        //Save pickle to file
        //savePickleFile(pickle);
    }

    // Save new pickle to a file 
    savePickleFile(pickle) {
        const blob = new Blob(pickle.content, {type: "text/plain;charset=utf-8"});
    }

    // Fetch today's pickle 
    // Fetch random pickle
    // Save old pickle
};


// UI CONTROLLER
class UIController {
    constructor() {
        this._DOMStrings = {
            inputArea: '.input-area',
            date: '.date',
            saveBtn: 'save-btn',
            alignLeftBtn: 'align-left-btn',
            alignCenterBtn: 'align-center-btn',
            alignRightBtn: 'align-right-btn'
        }
    }

    // Get input pickle
    readInput() {
        return [document.querySelector(this._DOMStrings.inputArea).value, 1];
    }

    // (Read mode) Show new pickle 
    showNewPickle(Pickle) {
        // Set date
        // Set entry
        // Set settings       
    }

    // Show write mode 
    showWriteMode(){

    }

    // Set default settings
    setDefaultSettings() {
        document.getElementById(this.DOMStrings.alignLeftBtn).classList.toggle('active');
    }

    // Access to DOMStrings
    get DOMStrings() {
        return this._DOMStrings;
    }
};


// GLOBAL APP CONTROLLER
class Controller {
    constructor(pickleCtrl, UICtrl) {
        this.pickleCtrl = pickleCtrl;
        this.UICtrl = UICtrl;
    }

    // Add new Pickle
    ctrlAddNewPickle() {
        const [entry, alignment] = this.UICtrl.readInput();

        if (entry !== "") {
            // Pass input to pickleCtrl
            this.pickleCtrl.addNewPickle(entry, alignment);

            // Tell UICtrl to update UI
            //this.UICtrl.showNewPickle();
        }

    }

    // Set up event listeners
    setupEventListeners() {
        const DOM = this.UICtrl.DOMStrings;
        document.getElementById(DOM.saveBtn).addEventListener('click', () => {
            this.ctrlAddNewPickle();
        });
    }

    init() {
        this.setupEventListeners();

        // Set the default alignment
        this.UICtrl.setDefaultSettings();

        // Check for today's pickle and set up views accordingly
    }

};

{
    let UICtrl = new UIController();
    let pickleCtrl =  new PickleController();
    let ctrl = new Controller(pickleCtrl, UICtrl);
    ctrl.init();
}





