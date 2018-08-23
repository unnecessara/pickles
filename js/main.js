// --------TEST--------------------
let x = true;
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



// PICKLE CONTROLLER
function pickleController() {
    // Pickle constructor
    class Pickle {
        constructor(id, date, content, alignment) {
            this.id = id;
            this.date = date;
            this.content = content;
            this.alignment = alignment;
        }   
    }

    let jar = [];

    return {
        addPickle: function(date, content, alignment) {
            
        }
    }

    // Fetch today's pickle 
    // Fetch random pickle
    // Save new pickle
    // Save old pickle
};


// UI CONTROLLER
function UIController () {
    const DOMStrings = {
        inputArea: '.input-area',
        date: '.date'
    }

    // Show write or read 
    // Get input pickle
    // Shuffle new pickle
    // Access to DOMStrings
};


// GLOBAL APP CONTROLLER
(function controller(pickleCtrl, UICtrl) {
    // Set up event listeners
    // Store Pickle
    // Init (Check for today's pickle and set up views accordingly)


})(pickleController, UIController);

//controller.init();




