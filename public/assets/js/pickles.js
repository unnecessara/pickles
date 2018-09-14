const DOM = {
    // write
    inputArea: '.input-area',
    alignmentBtn: '.alignment-btn',
    entryId: '#entry-id',

    // read
    promptBtn: '.prompt-btn',
    refreshBtn: '.refresh-btn',
    editBtn: '.edit-btn',
    entryContent: '#entry-content',
    date: 'date'
};

// Write: Alignment buttons callbacks
const alignmentButtons = $(DOM.alignmentBtn);
for (let i = 0; i < alignmentButtons.length; i++) {
    $(alignmentButtons[i]).click( event => {
        const alignMode = event.currentTarget.childNodes[1].value;
        $(DOM.inputArea).removeClass("text-left text-center text-right");
        $(DOM.inputArea).addClass('text-' + alignMode);
        //css('text-align', alignMode);
    });
}

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

// $(DOM.editBtn).click(event => {
//     let pickleId, pickleContent, pickleAlignment;
    
//     pickleId = $(DOM.entryContent).attr('data-id');
//     pickleContent = $(DOM.entryContent).text();
//     pickleAlignment = $(DOM.entryContent).attr('data-alignment');

//     // In write block (hidden) set value of text area and ID to current pickle content and id
//     $(DOM.entryId).val(pickleId);
//     $(DOM.inputArea).text(pickleContent);
//     $(DOM.inputArea).css('text-align', pickleAlignment);
//     $(DOM.alignmentBtn + "input[value = "+ pickleAlignment + "]").prop("checked", true);

//     // Hide read, show write
//     $('#read').toggle();
//     $('#write').toggle();
// });


