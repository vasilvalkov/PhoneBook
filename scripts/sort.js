// --------------------------------------
// LISTENERS
// --------------------------------------

$('#sorter').on('change', function () {
    var $this = $(this);
    var sorter = document.getElementById('sorter').value;
    var sortedContacts = sortContactsBy(sorter);
    
    var contacts = {
        contacts: sortedContacts
    };

    listContacts(contacts);
})

// --------------------------------------
// HANDLERS
// --------------------------------------

function sortContactsBy(prop) {
    var contacts = objectifySavedContacts();

    contacts.sort((a, b) => {
        if (a[prop] < b[prop]) {
            return -1;
        } else if (a[prop] > b[prop]) {
            return 1;
        } else {
            return 0;
        }
    });

    return contacts;
}