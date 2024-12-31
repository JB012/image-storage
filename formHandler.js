$("#submitForm").on("submit", function(event) {
    var form = $(this);
    var actionUrl = form.attr('action');

    $.ajax({
        method: "POST",
        url: actionUrl,
        data: new FormData(this),
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