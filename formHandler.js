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
TODO: For update.php, on't check esxtension because we know that the file's an image from Chrome
Don't use filename to store rightclick images because the files don't exist, use the original url
Save image as a BLOB, get custom name (i don't think type matters). Comparing duplicates can be checking BLOBS.
The images folder from upload.php should be a list of original urls/files. To retrieve name/tags of pics, use
the BLOB value as it's the images id.
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