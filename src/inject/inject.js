let runBefore = false;
chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.action == 'fetch_images') {
        if (!runBefore) {
            fetchImagesSize();
        } else {
            toggleImagesSize();
        }
    }
});

function toggleImagesSize() {
    const sizes = document.getElementsByClassName('image-kb-viewer-element');
    for (const size of sizes) {
        size.classList.toggle('visible');
    }
}

async function fetchImagesSize() {
    const imgElems = document.getElementsByTagName('img');
    for (let i = 0, len = imgElems.length; i < len; i++) {
        const img = imgElems[i];
        const url = img.src || img.href;
        if (url && url.length > 0) {
            const request_blob = await fetch(url);
            const blob = await request_blob.blob();

            let kbyte = formatBytes(blob.size);
            let div = await addSizeToImage(kbyte);
            img.parentNode.insertBefore(div, img);
        }
    }
    runBefore = true;
}

async function addSizeToImage(size) {
    const element = document.createElement('div');
    element.innerText = size;
    element.classList.add('image-kb-viewer-element');
    return element;
}

function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    const c = 1024,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}