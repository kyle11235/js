
console.log('login');
var button;
var myVar = setInterval(function(){
    button = document.getElementsByName('Submit')[0];
    if(button){
        clearInterval(myVar);
        chrome.storage.local.get(function(data){
            document.getElementsByName('username')[0].value = 'guest';
            document.getElementsByName('password')[0].value = data.password;
            button.click();
        });
    }
}, 500);
