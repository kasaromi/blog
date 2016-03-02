document.getElementsByClassName('submit')[0].addEventListener('click', createUser);

function createUser(){
    var user = document.getElementsByClassName('createUser')[0].value;
    var password = document.getElementsByClassName('createPass')[0].value;
    console.log(user, password);
    var xhr = new XMLHttpRequest();
    function send(user, password){
        xhr.open('post', '/login/username=' + user + '&password=' + password);
        xhr.send();
    }
    send(user, password);
}
