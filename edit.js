let img = document.querySelector('img');
let fileName = document.querySelector('#name');
let tags = document.querySelector('#tags');
let fileInput = document.querySelector('#file');
let dataElements = {};

chrome.storage.local.get('edit-image', function (result) {
    if (result["edit-image"] != null) {
        dataElements["edit"] = "true";
        dataElements["image"] = `${img.src}`;

        fileInput.style.display = "none";

        img.style.display = "block";
        img.src = result["edit-image"];

        chrome.storage.local.set({'edit-image': null});
        console.log('edit image');
    }
});

chrome.storage.local.get('add-file', function (result) {
    console.log(result);
    if (result["add-file"] != null) {
        img.style.display = "none";
        fileInput.style.display = "block";
        chrome.storage.local.set({'add-file': null});
        console.log("add file");
    }
});


//TODO: Append tags
$(document).ready(function() {
$("#submitButton").click(function(event) {
    event.preventDefault();
    var form = $('#submitForm');
    var actionUrl = form.attr('action');

    var data = new FormData($('#submitForm'));
    data.append("name", fileName.value);

    if (!jQuery.isEmptyObject(dataElements)) {
        data.append("edit", dataElements["edit"]);
        data.append("image", dataElements["image"]);
    }

    $.ajax({
        method: "POST",
        url: actionUrl,
        data: data,
        processData: false,
        contentType: false,
        success: function(data) {
            console.log(data);
            chrome.storage.local.set({images: data}).then(() => {
                console.log("Value is set");
            });
            location.href = "index.html";
        },
        error: function() {
            console.log('Error on submitting a file.');
        }
    });

    event.preventDefault();
});
});
