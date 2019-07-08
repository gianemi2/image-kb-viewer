"use strict";

var runBefore = false;
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
    var sizes = document.getElementsByClassName('image-kb-viewer-element');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = sizes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var size = _step.value;
            size.classList.toggle('visible');
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

async function fetchImagesSize() {
    var imgElems = document.getElementsByTagName('img');

    for (var i = 0, len = imgElems.length; i < len; i++) {
        var img = imgElems[i];
        var url = img.src || img.href;

        if (url && url.length > 0) {
            var request_blob = await fetch(url);
            var blob = await request_blob.blob();
            var kbyte = formatBytes(blob.size);
            var div = await addSizeToImage(kbyte);
            img.parentNode.insertBefore(div, img);
        }
    }

    runBefore = true;
}

async function addSizeToImage(size) {
    var element = document.createElement('div');
    element.innerText = size;
    element.classList.add('image-kb-viewer-element');
    return element;
}

function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}