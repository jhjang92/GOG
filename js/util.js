let responseData;
let responseObject;

window.addEventListener('DOMContentLoaded',function(){

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        responseObject = JSON.parse(xhr.responseText);

        console.log(responseObject);
    };

    xhr.open('GET', 'json/main.json', true);        // Prepare the request
    xhr.send(null);   

});

function setResponseData(response){
    responseData = response;
}

function getIndex(target) {
    var i = 0;
    while((target = target.previousSibling) != null ) {
        if(target.nodeType != 3){
            i++;
        }
    }
    return i;
}

function zIndexAdd(target){
    var index = target.length;
    for(var i=0; i <= target.length -1; i++){
        target[i].style = "z-index: " + index--;
    }
}