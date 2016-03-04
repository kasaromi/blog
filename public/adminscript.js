document.getElementsByClassName('postButton')[0].addEventListener('click', blogPost);

function blogPost(){
    var title = document.getElementById('Title').value;
    var postArea = document.getElementsByClassName('postArea')[0].value;
    var xhr = new XMLHttpRequest();
    function post(title, postArea){
        xhr.open('post', '/admin/title=' + title + '&postArea=' + postArea);
        xhr.send();
    }
    post(title, postArea);
}
