// --------------------------------------
// LISTENERS
// --------------------------------------

$('#resetFilter').on('click', function () {
    $('#sorter').val('').trigger('change');
    $('#filterColumnSelector').val('').trigger('change');
});

$('#filterColumnSelector').on('change', function () {
    var prop = $(this).val();
    var contacts = objectifySavedContacts();

    $('#filterOptionSelector').val('');
    listContacts({
        contacts: contacts
    });

    if (prop === '') {
        $('#filterOptionContainer').addClass('hidden');
        listContacts({
            contacts: contacts
        });
        return;
    }

    var optionsTemplate = document.getElementById('filterOptionsTemplate').innerHTML;
    var hbOptionsTemplate = Handlebars.compile(optionsTemplate);

    var availableValues = {
        values: getUniqueValues(contacts, prop)
    };

    $('#filterOptions')
        .html(hbOptionsTemplate(availableValues))
        .parents('#filterOptionContainer').removeClass('hidden');

    $('#filterOptionSelector').on('input', function () {
        availableValues = {
            values: getUniqueValues(contacts, prop)
        };

        $('#filterOptions')
            .html(hbOptionsTemplate(availableValues));

        var filteredContacts = contacts.filter(function (cont) {
            if (cont[prop] === $('#filterOptionSelector').val()) {
                return cont;
            }
        });

        var foundContacts = {
            contacts: []
        };

        if (filteredContacts.length) {
            foundContacts.contacts = filteredContacts;
        } else {
            foundContacts.contacts = contacts;
        }

        listContacts(foundContacts);
    });
})

// --------------------------------------
// HELPERS
// --------------------------------------



function getUniqueValues(objects, objProp) {
    var uniques = {};

    for (var i in objects) {
        uniques[objects[i][objProp]] = null;
    }

    return Object.keys(uniques).map(function (val) {
        return {
            value: val
        };
    });
}