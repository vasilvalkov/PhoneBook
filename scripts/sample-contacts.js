var sampleData = {
    contacts: [{
        city: 'London',
        gender: 'male',
        name: 'John Doe',
        phone: '+4497687329',
        note: 'National hero',
        sign: 'Gemini'
    },
    {
        city: 'Paris',
        gender: 'female',
        name: 'Jane Doe',
        phone: '+34886688383',
        note: 'Mountain bike team leader',
        sign: 'Taurus'
    }]
};

$('#btnAddSampleContacts').on('click', function () {
    var savedContacts = getContactsFromStorage();
    
    if (savedContacts) {
        return;
    } else {
        saveContactsToStorage(sampleData.contacts);
        $(this).addClass('hidden');
        savedContacts = getContactsFromStorage();
        listContacts(savedContacts);
    }
});