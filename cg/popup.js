// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function click(e) {
    if(e.target.id === 'get'){
        window.open("https://gmp.xxx.com/captcha/", "_blank");
    }
    if(e.target.id === 'login') {
        window.open("http://webauth-redirect.xxx.com", "_blank");
    }
    if(e.target.id === 'show') {
        chrome.storage.local.get(function(data){
            copyToClipboard(data.password);
            alert(data.password);
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
