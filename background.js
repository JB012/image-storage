chrome.runtime.onInstalled.addListener(() => {     
    chrome.contextMenus.create({
        title: "Save image",
        contexts: ["image"],
        id: "save-image"
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log(info);
    /* let data = new FormData();
    data.append("image", info.srcUrl);

    async function fetchText() {
        let response = await fetch('http:localhost/image-storage/test.php', {method: "POST", body: data});
    
        if (response.status === 200) {
                let data = await response.text();
                console.log(data);
        }
    }
    
    fetchText(); */

    chrome.storage.local.set({"rightclick-image":info.srcUrl}).then(() => {
        console.log(info.srcUrl);
        console.log("Image is in create.html");
    });


    chrome.windows.getAll((windowsList) => {
        console.log(windowsList);
        for (let i = 0; i < windowsList.length; i++) {
            if (windowsList[i].type === "popup") {
                chrome.windows.remove(windowsList[i].id);
            }
        }
    });

    chrome.windows.create({
        url:"create.html",
        type:"popup",
        width:400,
        height:600
    });

});