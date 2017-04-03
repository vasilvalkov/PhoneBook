// --------------------------------------
// LISTENERS
// --------------------------------------

$('#btnAdd').on('click', function () {
    $('#addContactForm')[0].reset();
    $('#btnAddContact').html('add contact');

    if (!$importForm.hasClass('hidden')) {
        $importForm.addClass('hidden');
    }

    $addForm.removeClass('hidden');

    $('#btnCloseAddForm').one('click', function () {
        $('#addContactForm')[0].reset();
        $addForm.addClass("hidden");
    });

    $('#btnAddContact').on('click', function () {
        var areCorrectInputs = validateInputs();

        if (areCorrectInputs) {
            var contactObj = $('#addContactForm').serializeArray()
                .reduce(function (obj, input) {
                    obj[input.name] = input.value.trim();
                    return obj;
                }, {});

            addContact(contactObj);
        }
    })
});

// --------------------------------------
// HANDLERS
// --------------------------------------

function addContact(contact) {
    var contacts = objectifySavedContacts();

    contacts.push(contact);

    saveContactsToStorage(contacts);

    $('#addContactForm')[0].reset();
    $('#addContactFormContainer').addClass('hidden');

    var savedContacts = getContactsFromStorage();
    listContacts(savedContacts);

    return contact;
}

// --------------------------------------
// HELPERS
// --------------------------------------

function removeWarningMessage() {
    if ($('#warningMessage').length) {
        $('#warningMessage').parent().removeClass('has-error');
        $('#warningMessage').remove();
    }
}

function notifyUserForIncorrectInput(messageStr, $inputNode) {
    $inputNode.parent().addClass('has-error');

    $('<p />')
        .addClass('text-danger')
        .attr('id', 'warningMessage')
        .html(messageStr)
        .insertAfter($inputNode);
}