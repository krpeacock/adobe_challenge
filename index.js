var json;
var data = $.get("https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts/", function(){
    json = data.responseJSON
}).done(()=>{console.log(json)})

var postContainer = $('#postContainer');
postContainer.innerHTML = 'hello'