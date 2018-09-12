const DOM = {
    // write
    inputArea: ".input-area",
    alignmentBtn: ".alignment-btn",
    entryId: "#entry-id",

    // read
    promptBtn: ".prompt-btn",
    refreshBtn: ".refresh-btn",
    editBtn: ".edit-btn",
    entryContent: "#entry-content"
};

// Write block: Alignment buttons callbacks
const alignmentButtons = $(DOM.alignmentBtn);
for (let i = 0; i < alignmentButtons.length; i++) {
    $(alignmentButtons[i]).click( event => {
        const alignMode = event.currentTarget.childNodes[1].value;
        $(DOM.inputArea).css('text-align', alignMode);
    });
}

// Read block: prompt, refresh, edit buttons callbacks 
$(DOM.promptBtn).click(event => {
    console.log("event");
});

$(DOM.refreshBtn).click(event => {
    $.ajax({
        url: "/random"
    });
});

$(DOM.editBtn).click(event => {
    console.log("EDIT BUTTON CLICKED");
    let pickleId, pickleContent, pickleAlignment;
    
    pickleId = $(DOM.entryContent).attr('data-id');
    pickleContent = $(DOM.entryContent).text();
    pickleAlignment = $(DOM.entryContent).attr('data-alignment');

    // In write block (hidden) set value of text area and ID to current pickle content and id
    $(DOM.entryId).val(pickleId);
    $(DOM.inputArea).text(pickleContent);
    $(DOM.inputArea).css('text-align', pickleAlignment);
    $(DOM.alignmentBtn + "input[value = "+ pickleAlignment + "]").prop("checked", true);

    // Hide read, show write
    $('#read').toggle();
    $('#write').toggle();
});


