class promptMachine {
    constructor(questions) {
        this.questions = questions;
    }
    getRandomQuestion() {
        const rand = Math.floor(Math.random() * this.questions.length);
        const newQuestion = this.questions[rand];
        return newQuestion;
    }
};

const prompts = new promptMachine([ 
    "Things we lose in every way but in memory",
    "Someone once told me...",
    "That time...",
    "Last night I dreamt...",
    "A special place",
    "The expression on that person's face",
    "Nice things I want to hear",
    "My mom never...",
    "This is why I'm not like that",
    "If all else fails...",
    "In another life I...",
    "I never knew about...",
    "I miss this from my previous self",
    "I wish I was less...",
    "When it gets dark, I feel...",
    "One thing I want to do in the next season",
    "One thing I did that was great this season",
    "Next year I want to do this better",
    "I really like...",
    "I'm seriously bothered by...",
    "When I feel lonely",
    "I'm not like my dad. I'm...",
    "I like the taste of...",
    "I like the smell of...",
    "I don't miss..."
]);

const DOM = {
    // write
    inputArea: '.input-area',
    alignmentBtn: '.alignment-btn',
    entryId: '#entry-id',
    promptRefreshBtn: '#prompt-refresh-btn',
    promptQuestion: "#prompt-question",

    // read
    promptBtn: '.prompt-btn',
    refreshBtn: '.refresh-btn',
    editBtn: '.edit-btn',
    entryContent: '#entry-content',
    date: 'date'
};

// Initialization things
$(function () {
    // Write
    $(DOM.promptQuestion).text(prompts.getRandomQuestion());
});

// Write: Alignment buttons callbacks
const alignmentButtons = $(DOM.alignmentBtn);
for (let i = 0; i < alignmentButtons.length; i++) {
    $(alignmentButtons[i]).click( event => {
        const alignMode = event.currentTarget.childNodes[1].value;
        $(DOM.inputArea).removeClass("text-left text-center text-right");
        $(DOM.inputArea).addClass('text-' + alignMode);
    });
}
$(DOM.promptRefreshBtn).click(event => {
    $(DOM.promptQuestion).text(prompts.getRandomQuestion());
});

// Read: prompt, refresh, edit buttons callbacks 
$(DOM.promptBtn).click(event => {
    console.log("event");
});

$(DOM.refreshBtn).click(event => {
    $.ajax({
        url: "/random", success: result => {
            // Update UI parts with new pickle
            $(DOM.entryContent).attr('data-id', result.pickle.id);
            $(DOM.entryContent).attr('data-alignment', result.pickle.alignment);
            $(DOM.entryContent).text(result.pickle.content);
            $(DOM.entryContent).text(result.pickle.content);
            $(DOM.entryContent).removeClass("text-left text-center text-right");
            $(DOM.entryContent).addClass('text-' + result.pickle.alignment);
            $(DOM.date).text(result.date);
            $(DOM.editBtn).attr('href', '/' + result.pickle.id);
        }
    });
});


