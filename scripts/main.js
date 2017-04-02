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

    if (dataJsonParsedObject) {
        document.querySelector('.contactsList tbody').innerHTML = hbTbodyTemplate(dataJsonParsedObject);
    }
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