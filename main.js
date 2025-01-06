const imgContainer = document.querySelector('#img-container');
let myModal = document.querySelector('.modal');
let modalImg = document.querySelector('#modalImg');
let modalName = document.querySelector('#modalName');
let modalTags = document.querySelector('#modalTags');
let closeSpan = document.querySelector('.close');
let backSpan = document.querySelector('#back');
let forwardSpan = document.querySelector('#forward');
let link = document.querySelector('a');
let edit = document.querySelector('#edit');
let images;

$("#clearImages").on("submit", function(event) {
    let actionUrl = $(this).attr('action');

    $.ajax({
        method: 'POST',
        url: actionUrl,
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(data) {
            console.log(data);
            chrome.storage.local.set({images: null}).then(() => {
                console.log("Value is set to null");
            });
            location.href = "index.html"
        },
        error: function() {
            console.log('Error on clearing images');
        }
    })
});

chrome.storage.local.get('images', function (result) {
    console.log(result['images']);
   if (result['images'] != null) {
    images = result['images'];
    for (let i = 0; i < images.length; i++) {
        let img = document.createElement('img');
        img.src = images[i]["image"];
        img.alt = images[i]["tags"];
        img.id = `${i}`;
        img.onclick = function() {
            modalImg.src = this.src;
            modalImg.id = this.id;

            backSpan.style.color = this.id === '0' ? '#7e7e7e' : '#f1f1f1';
            forwardSpan.style.color = this.id === `${images.length-1}` ? '#7e7e7e' : '#f1f1f1';


            //Will need to change this condiiton when working on editing names.
            if (modalName.textContent === "") {
                modalName.textContent = `Name: ${images[i]["name"]}`;
            }

            //Will need to change this condiiton when working on editing tags.
            if (modalTags.childElementCount === 0) {
                let tags = images[i]["tags"].split(' ');

                if (tags[0] != "") {
                    for (let i = 0; i < tags.length; i++) {
                        let tagButton = document.createElement('button');
                        tagButton.textContent = tags[i];
        
                        modalTags.appendChild(tagButton);
                    }
                }
            }

            myModal.style.display = 'flex';
        }
        imgContainer.appendChild(img);
    }
   }
}); 

closeSpan.addEventListener('click', () => {
    myModal.style.display = 'none';
});

forwardSpan.addEventListener('click', () => changeImage(modalImg.id, "forward"));

backSpan.addEventListener('click', () => changeImage(modalImg.id, "back"));

link.addEventListener('click', () => {
    chrome.storage.local.set({"add-file": "true"});
})

edit.addEventListener('click', () => {
    location.href = "edit.html";
});

function changeImage(id, direction) {
    let changedId = direction == 'back' ? parseInt(id) - 1 : parseInt(id) + 1;
    let changedImg = document.getElementById(changedId.toString());

    if (changedImg != null) {
        modalImg.src = changedImg.src;
        modalImg.id = changedImg.id;

        modalName.textContent = `Name: ${images[modalImg.id]["name"]}`;
        modalTags.innerHTML = "Tags:";
        let tags = images[modalImg.id]["tags"].split(' ');

        if (tags[0] != "") {
            for (let i = 0; i < tags.length; i++) {
                let tagButton = document.createElement('button');
                tagButton.textContent = tags[i];

                modalTags.appendChild(tagButton);
            }
        }
        
        backSpan.style.color = changedId === 0 ? '#7e7e7e' : '#f1f1f1';
        forwardSpan.style.color = changedId === images.length - 1 ? '#7e7e7e' : '#f1f1f1';

        console.log(`Image now has id ${changedId}`);
    }
}

