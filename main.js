const imgContainer = document.querySelector('#img-container');
let myModal = document.querySelector('.modal');
let modalImg = document.querySelector('#modalImg');
let closeSpan = document.querySelector('.close');
let backSpan = document.querySelector('#back');
let forwardSpan = document.querySelector('#forward');
let files;

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
   if (result['images'] != null) {
    let files = result['images'].replace('[', '').replace(']', '').split(',');

    //Removing '\' and '/' on file names.
    for (let i = 0; i < files.length; i++) {
        files[i] = files[i].substr(1, files[i].length-2);
        let img = document.createElement('img');
        img.src = files[i];
        img.id = `${i}`;
        img.onclick = function() {
            modalImg.src = this.src;
            modalImg.id = this.id;
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


function changeImage(id, direction) {
    let changedId = direction == 'back' ? parseInt(id) - 1 : parseInt(id) + 1;
    console.log(id);
    let changedImg = document.getElementById(changedId.toString());

    if (changedImg != null) {
        modalImg.src = changedImg.src;
        modalImg.id = changedImg.id;
        
        console.log(`Image now has id ${changedId}`);
    }
}
/*  
if (myModal.checkVisibility === true) {
    if (modalImg.id === "img-0") {
        backSpan.style.color = 'gray';
    }

    if (modalImg.id === `img-${files.length}`) {
        forwardSpan.style.color = 'gray';
    }
} */

