chrome.commands.onCommand.addListener(function (command) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        //if(tabs.length)
        if (tabs.length > 0 && tabs[0].hasOwnProperty('id')) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "fetch_images"
            }, function (response) {});
        }
    });
});