var x = true;
document.querySelector('.btn-test').addEventListener('click', function() {
    x ? x = false : x = true;
    toggleModes();
});

var toggleModes = function() {
    if (x) {
        document.getElementById('write').style.display = 'none';
        document.getElementById('read').style.display = 'block';
    } else {
        document.getElementById('write').style.display = 'block';
        document.getElementById('read').style.display = 'none';
    }
}

toggleModes();



// PICKLE CONTROLLER
var pickleController = (function () {
    // Pickle constructor
    var Pickle = function(id, date, content, alignment) {
        this.id = id;
        this.content = content;
        this.alignment = alignment;
    };

    var jar = [];

    return {
        addPickle: function(date, content, alignment) {

        }
    }

    // Fetch today's pickle 
    // Fetch random pickle
    // Save new pickle
    // Save old pickle
});


// UI CONTROLLER
var UIController = (function() {
    var DOMStrings = {
        inputArea: '.input-area',
        date: '.date'
    }

    // Show write or read 
    // Get input pickle
    // Shuffle new pickle
    // Access to DOMStrings
});


// GLOBAL APP CONTROLLER
var controller = (function () {
    // Set up event listeners
    // Store Pickle
    // Init (Check for today's pickle and set up views accordingly)

})(pickleController, UIController);

controller.init();




