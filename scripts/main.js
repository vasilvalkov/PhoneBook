// --------------------------------------
// INITIALIZATIONS
// --------------------------------------

var $addForm = $('#addContactFormContainer');
var $importForm = $('#importForm');
var existingContacts = getContactsFromStorage();

window.onload = listContacts(existingContacts);

$('#dataOrganizationForm')[0].reset();

function getContactsFromStorage() {
    var data = localStorage.getItem('data');    
    var existingContacts = dataJsonParse(data);

    if (existingContacts && existingContacts.contacts) {;
        return existingContacts;
    } else {
        $('#btnAddSampleContacts').removeClass('hidden');
        return null;
    }
}

function listContacts(dataJsonParsedObject) {
    var template = document.getElementById('tableDatarowTemplate').innerHTML;
    var hbTbodyTemplate = Handlebars.compile(template);

    // if (dataJsonParsedObject) {
        document.querySelector('.contactsList tbody').innerHTML = hbTbodyTemplate(dataJsonParsedObject);
    // }
}

// --------------------------------------
// HELPERS
// --------------------------------------

// contacts storage helplers
function objectifySavedContacts() {
    var contacts = localStorage.getItem('data');

    if (contacts) {
        var objectifiedContacts = contacts.split(';')
            .map(function (cont) {
                return JSON.parse(cont);
            });

        return objectifiedContacts;
    } else {
        return [];
    }
}

function saveContactsToStorage(contactsAsObjects) {
    var contacts = contactsAsObjects.map(function (cont) {
        return JSON.stringify(cont);
    });

    localStorage.setItem('data', contacts.join(';'));
}

function parseToContactObjects(data) {
    var parsedData = data.split(`\n`)
        .map(record => {
            var items = record.split(`\t`);
            return {
                phone: items[0].trim(),
                name: items[1].trim(),
                city: items[2].trim(),
                gender: items[3].trim(),
                sign: items[4].trim(),
                note: items[5].trim()
            }
        });

    return parsedData;
}

function dataJsonParse(data) {
    if (!data) {
        return;
    }

    var records = [];
    var parsedData = data
        .split(';')
        .forEach(obj => {
            records.push(JSON.parse(obj));
        });

    return {
        contacts: records
    };
}

function validateInputs() {
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
        return false;
    }

    currentContacts.forEach(function (cont) {
        if (cont.phone === phoneNumber) {
            removeWarningMessage();
            notifyUserForIncorrectInput('This phone number already exists.', $inputTel);

            hasDuplicatePhoneNumber = true;
            return false;
        }
    });

    if (hasDuplicatePhoneNumber) {
        return false;
    }

    removeWarningMessage();

    // validate entered name
    var name = $inputName.val();

    if (name.trim() === '' || 2 > name.length || name.length > 30) {
        removeWarningMessage();
        notifyUserForIncorrectInput('Name must be between 2 and 30 characters long.', $inputName);
        return false;
    }

    currentContacts.forEach(function (cont) {
        if (cont.name.toLowerCase() === name.toLowerCase()) {
            removeWarningMessage();
            notifyUserForIncorrectInput('This name already exists.', $inputName);

            hasDuplicateName = true;
            return false;
        }
    });

    if (hasDuplicateName) {
        return false;
    }

    removeWarningMessage();

    // validate entered city
    var city = $inputCity.val();

    if (city.length > 30) {
        removeWarningMessage();
        notifyUserForIncorrectInput('The name of the city must be no longer that 30 characters.', $inputCity);
        return false;
    }

    removeWarningMessage();

    // validate entered gender
    var gender = $inputGender.val();

    if (gender === '') {
        removeWarningMessage();
        notifyUserForIncorrectInput('Gender must be specified.', $inputGender);
        return false;
    }

    removeWarningMessage();

    // validate entered note
    var note = $inputNote.val();

    if (note.length > 500) {
        removeWarningMessage();
        notifyUserForIncorrectInput('The note must be no longer that 500 characters.', $inputNote);
        return false;
    }

    removeWarningMessage();

    return true;
}