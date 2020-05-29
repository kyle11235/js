
console.log('getPassword');
var japac;
var myVar = setInterval(function(){
    japac = $('#ext-gen21');
    if(japac.html()){
        clearInterval(myVar);
        $.get("https://gmp.xxx.com/captcha/fi1es/airespace_pwd_apac.txt?_dc=1540349127639", function(data, status){
            var password = data.substring(data.indexOf('Password:') + 9,data.indexOf('Generated')).trim();
            chrome.storage.local.set({'password': password}, function() {
            });
            document.getElementById('ext-gen21').click();
        });
    }
}, 500);
