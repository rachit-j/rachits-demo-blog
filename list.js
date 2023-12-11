$(document).ready(function() {
    displayItems();

    $('#addItem').click(function() {
        var itemValue = $('#itemInput').val();
        if (itemValue) {
            addItem(itemValue);
            $('#itemInput').val('');
            displayItems();
        }
    });

    $('#itemsList').on('click', '.deleteItem', function() {
        var itemId = $(this).data('id');
        var itemDiv = $(this).parent();

        // Slide out effect before deletion
        itemDiv.slideUp(500, function() {
            deleteItem(itemId);
            displayItems();
        });
    });
    $('#itemsList').on('click', '.editItem', function() {
        var itemId = $(this).data('id');
        var itemValue = prompt("Edit the item:", $(this).siblings('.itemValue').text());
        if (itemValue) {
            editItem(itemId, itemValue);
            displayItems();
        }
    });
});

function getItems() {
    var items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
}

function addItem(itemValue) {
    var items = getItems();
    items.push({ id: Date.now(), value: itemValue });
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItem(itemId) {
    var items = getItems();
    items = items.filter(item => item.id !== itemId);
    localStorage.setItem('items', JSON.stringify(items));
}

function editItem(itemId, newValue) {
    var items = getItems();
    items = items.map(item => {
        if (item.id === itemId) {
            return { ...item, value: newValue };
        }
        return item;
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function displayItems() {
    var items = getItems();
    $('#itemsList').empty();
    items.forEach(function(item) {
        $('#itemsList').append('<div><span class="itemValue">' + item.value + '</span> <button class="editItem" data-id="' + item.id + '">Edit</button> <button class="deleteItem" data-id="' + item.id + '">Delete</button></div>');
    });
}

function deleteItem(itemId) {
    var items = getItems();
    items = items.filter(item => item.id !== itemId);
    localStorage.setItem('items', JSON.stringify(items));
}
