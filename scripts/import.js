// --------------------------------------
// LISTENERS
// --------------------------------------

$('#btnImport').on('click', function () {
    if (!$addForm.hasClass('hidden')) {
        $addForm.addClass('hidden');
    }

    $importForm.removeClass("hidden");

    $('#btnImportContent').on('click', importContacts);

    $('#btnCloseImportForm').on('click', function () {
        $('#dataInputArea').val('');
        $importForm.addClass("hidden");
    });
});

// --------------------------------------
// HANDLERS
// --------------------------------------

function importContacts() {
    var $data = $('#dataInputArea').val().trim();
    var importedContacts = parseToContactObjects($data);

    var existingContacts = objectifySavedContacts();

    if (existingContacts.length) {
        var existingPhones = existingContacts.map(function (cont) {
            return cont.phone;
        });
        var existingNames = existingContacts.map(function (cont) {
            return cont.name;
        });

        // remove existing contacts from newly imported contacts
        var filteredContacts = importedContacts.filter(function (cont) {
            var phoneExists = existingPhones.indexOf(cont.phone) >= 0;
            var nameExists = existingNames.indexOf(cont.name) >= 0;

            if (!phoneExists && !nameExists) {
                return cont;
            }
        });

        [].push.apply(existingContacts, filteredContacts);
    } else {
        [].push.apply(existingContacts, importedContacts);
    }

    saveContactsToStorage(existingContacts);

    $('#dataInputArea').val('');
    $('#importForm').addClass('hidden');

    var savedContacts = getContactsFromStorage();
    listContacts(savedContacts);
}