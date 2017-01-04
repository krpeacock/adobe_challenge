function init(){
  var json;
  var data = $.get("https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts/", function(){
      json = data.responseJSON
  }).done(()=>{
    generatePosts(json);
  })
}





function generatePosts(json){
  var posts = json.posts;
  console.log(posts);
  posts.forEach(function(post){
    var template = `<div class="column"><div class="item"><h3 class="item-title">${post.title}</h3><div class="item-author">${post.author.first_name + post.author.last_name}</div></div></div>`
    $(".container").append(template)
  })
  var columns = $(".column");
  for(var i = 0; i < columns.length; i+=4) {
    columns.slice(i, i+4).wrapAll("<div class='row'></div>");
  }
}


init();