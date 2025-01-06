let img = document.querySelector('img');
let customName = document.querySelector('#name');
let fileInput = document.querySelector('#file');
let span = document.querySelector('span');
let tagButton = document.querySelector('#tag-button');
let tags = document.querySelector('#tags');
let dataElements = {};
let type;
let allTags = '';

/*
TODO: (HIGHEST PRIORITY IS THE CLICK TAG, THEN ALL IMPORTANT GOALS WILL HAVE BEEN MET).
- Instead of doing edit.html. Put a pencil logo next to name. And a vertical three dots next to tag
button to where there'll be one dropdown menu (for now), delete. 
- Clicking on a tag shows the image gallery with images with that tag.
- Entering an image via files will display the image, making it easier to think of tags while looking at them. 
- Back button.
- Delete image feature (Could make something like edit-modal.png. For tags, instead of three dots, it'll just be X. There 
could also be an option to add more tags via + sign. Delete button for image)
- Sort of duplicate names: Popup that says there's an existing file name, giving you an option to give the current image
name(# of duplicate names).
- Search feature: Search by name (images that are named character-series, character-series(1), ...), tags

Completed:
- Adding images via files.
- Adding customizable tags and names.
- Clicking through images.
*/

tagButton.addEventListener('click', () => {
    let tagInput = document.createElement('input');
    tagButton.insertAdjacentElement('beforebegin', tagInput);
    tagButton.style.display = 'none';
    tagInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            let tag = document.createElement('button');
            tag.textContent = tagInput.value;

            tagInput.remove();
            tags.appendChild(tag);
            tagButton.style.display = 'block';
        }
    })
});

chrome.storage.local.get('rightclick-image', function (result) {
    if (result["rightclick-image"] != null) {
        dataElements['rightclick-image'] = result["rightclick-image"];
        
        fileInput.style.display = "none";

        img.style.display = "block";
        img.src = result["rightclick-image"];
        customName.value = `${result["rightclick-image"]}`;

        type = img.src.match('png|jpg|jpeg');
        span.style.display = 'block';
        span.textContent = `.${type}`;

        chrome.storage.local.set({'rightclick-image': null});
        console.log('right clicked image');
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


fileInput.addEventListener('change', (event) => {
    console.log(event);
    console.log(fileInput.value);

    let filePath = fileInput.value.split('\\');
    customName.value = filePath[filePath.length - 1];

    type = customName.value.match('png|jpg|jpeg');

    span.style.display = 'block';
    span.textContent = `.${type}`;
    console.log(span.textContent);
    customName.value = customName.value.split(`.${type}`)[0];
});


$("#submitForm").on("submit", function(event) { 
    event.preventDefault();

    var form = $(this);
    var actionUrl = form.attr('action');

    let data = new FormData(this);

    if (customName.value != "undefined") {
        dataElements["name"] = customName.valuevalue+span.textContent;
        data.append("name", dataElements["name"]);
        if ("rightclick-image" in dataElements) {
            data.append("rightclick-image", dataElements["rightclick-image"]);
        }

        if (tags.childElementCount != 0) {
            let children = tags.childNodes;

            for (let i = 0; i < children.length; i++) {
                if (i != children.length - 1) {
                    allTags += children[i].textContent + ' ';
                }
                else {
                    allTags += children[i].textContent;
                }

            }
        }
        
        data.append('tags', allTags);
    }
    
    $.ajax({
        method: "POST",
        url: actionUrl,
        data: data,
        processData: false,
        contentType: false,
        success: function(data) {
            //Checking if what's returned is a string of an array of file paths. If not,
            //then it's an error message.
           // if (data[0] === '[') {
           console.log(JSON.parse(data));
                chrome.storage.local.set({images: JSON.parse(data)}).then(() => {
                    console.log("Value is set");
                });
            //}
            location.href = "index.html";
            //TODO: Display error in index like a snackbox (for like 5 seconds)
        },
        error: function() {
            console.log('Error on submitting a file.');
        }
    });
});