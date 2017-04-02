// --------------------------------------
// LISTENERS
// --------------------------------------

$('tbody').on('click', '.contactActionButton', function action(ev) {
    var $this = $(this);
    var $contactRow = $this.parent();

    while (!$contactRow.hasClass('dataRow')) {
        $contactRow = $contactRow.parent();
    }

    var contactIndex = $contactRow.attr('data-row-index');

    if ($this.hasClass('previewButton')) {
        var $previewElement = getContactPreviewElement(contactIndex);

        $previewElement.insertAfter($contactRow);

        $this.removeClass('previewButton')
            .addClass('foldPreviewButton')
            .html('Fold preview');
    } else if ($this.hasClass('foldPreviewButton')) {
        $this.removeClass('foldPreviewButton')
            .addClass('previewButton')
            .html('preview');

        $contactRow.next().remove();
    }

    if ($this.hasClass('deleteButton')) {
        if (confirm('You are about to delete this contact? The operation cannot be undone!')) {
            deleteContact(contactIndex);
        } else {
            return;
        }
    }

    if ($this.hasClass('editButton')) {
        $addForm.removeClass('hidden');

        $('#btnCloseAddForm').one('click', function () {
            $('#addContactForm')[0].reset();
            $addForm.addClass("hidden");
        });

        var contacts = localStorage.getItem('data').split(';');
        var contactObj = JSON.parse(contacts[contactIndex]);

        var controls = $('#addContactForm').find('.form-control');
        controls = populateEditForm(contactObj);

        $('#btnAddContact')
            .html('edit contact')
            .one('click', function () {
                var editedContactObj = $('#addContactForm').serializeArray()
                    .reduce(function (a, x) {
                        a[x.name] = x.value;
                        return a;
                    }, {});

                editContact(contactIndex, editedContactObj);
            });
    }
});

// --------------------------------------
// HANDLERS
// --------------------------------------

// preview contact handler
function getContactPreviewElement(contactIndex) {
    var contacts = localStorage.getItem('data').split(';');

    var contactObj = JSON.parse(contacts[contactIndex]);

    var template = document.getElementById('contactPreviewTemplate').innerHTML;
    var hbPreviewTemplate = Handlebars.compile(template);

    return $('<tr>')
        .attr('id', 'contactPreview' + contactIndex)
        .html(hbPreviewTemplate(contactObj));
}

// edit contact handler
function editContact(contactIndex, editedContact) {
    var contacts = objectifySavedContacts();

    contacts[contactIndex] = editedContact;

    saveContactsToStorage(contacts);

    $('#addContactForm')[0].reset();

    $('#btnAddContact')
        .html('add contact')
        .one('click', addContactCallback);
    
    $addForm.addClass('hidden');

    var savedContacts = getContactsFromStorage();

    listContacts(savedContacts);

    return editedContact;
}

// delete contact handler
function deleteContact(contactIndex) {
    var contacts = localStorage.getItem('data').split(';');

    contacts.splice(contactIndex, 1);

    localStorage.setItem('data', contacts.join(';'));

    var savedContacts = getContactsFromStorage();

    listContacts(savedContacts);
}

// --------------------------------------
// HELPERS
// --------------------------------------

function populateEditForm(contactObj) {
    var controls = $('#addContactForm').find('.form-control');

    $.each(controls, function (i, val) {
        var $name = controls[i].name;
        controls[i].value = (contactObj[$name]);
    })

    return controls;
}