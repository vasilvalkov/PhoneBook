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

    $('#btnAddContact').on('click', addContactCallback)
});

// --------------------------------------
// HANDLERS
// --------------------------------------

function addContactCallback() {
    var $inputTel = $('#inputTel');
    var $inputName = $('#inputName');
    var $inputCity = $('#inputCity');
    var $inputGender = $('#inputGender');
    var $inputNote = $('#inputNote');
    var currentContacts = objectifySavedContacts();
    var hasDuplicatePhoneNumber = false;
    var hasDuplicateName = false;

    // validate entered phone number
    var phoneNumber = $inputTel.val();

    var hasCorrectStart = phoneNumber[0] === '0' || phoneNumber[0] === '+';
    var hasCorrectDigitsCount = 5 < phoneNumber.length && phoneNumber.length < 12;
    var hasOnlyDigits = true;

    for (var i = 1, len = phoneNumber.length; i < len; i += 1) {
        if (Number.isNaN(Number(phoneNumber[i]))) {
            hasOnlyDigits = false;
            break;
        }
    }

    if (!hasCorrectStart || !hasCorrectDigitsCount || !hasOnlyDigits || phoneNumber === '') {
        removeWarningMessage();
        notifyUserForIncorrectInput('Phone number must begin with 0 or + and must have 5 to 12 digits.', $inputTel);
        return;
    }

    currentContacts.forEach(function (cont) {
        if (cont.phone === phoneNumber) {
            removeWarningMessage();
            notifyUserForIncorrectInput('This phone number already exists.', $inputTel);

            hasDuplicatePhoneNumber = true;
            return;
        }
    });

    if (hasDuplicatePhoneNumber) {
        return;
    }

    removeWarningMessage();

    // validate entered name
    var name = $inputName.val();

    if (name === '' || name.length > 30) {
        removeWarningMessage();
        notifyUserForIncorrectInput('Name must be no longer that 30 characters.', $inputName);
        return;
    }

    currentContacts.forEach(function (cont) {
        if (cont.name.toLowerCase() === name.toLowerCase()) {
            removeWarningMessage();
            notifyUserForIncorrectInput('This name already exists.', $inputName);

            hasDuplicateName = true;
            return;
        }
    });

    if (hasDuplicateName) {
        return;
    }

    removeWarningMessage();

    // validate entered city
    var city = $inputCity.val();

    if (city.length > 30) {
        removeWarningMessage();
        notifyUserForIncorrectInput('The name of the city must be no longer that 30 characters.', $inputCity);
        return;
    }

    removeWarningMessage();

    // validate entered gender
    var gender = $inputGender.val();

    if (gender === '') {
        removeWarningMessage();
        notifyUserForIncorrectInput('Gender must be specified.', $inputGender);
        return;
    }

    removeWarningMessage();

    // validate entered note
    var note = $inputNote.val();

    if (note.length > 500) {
        removeWarningMessage();
        notifyUserForIncorrectInput('The note must be no longer that 500 characters.', $inputNote);
        return;
    }

    removeWarningMessage();

    // add contact to storage
    var contactObj = $('#addContactForm').serializeArray()
        .reduce(function (obj, input) {
            obj[input.name] = input.value;
            return obj;
        }, {});

    addContact(contactObj);
}

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