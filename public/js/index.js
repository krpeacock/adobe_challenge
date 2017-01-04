(function(){

  function init(){
    var json;
    var data = $.get("https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts", function(){
        json = data.responseJSON
    }).done(()=>{
      generatePosts(json);
    })
  }

  

  function generatePosts(json){
    var posts = json.posts;
    console.log(posts);
    posts.forEach(function(post){
      var excerpt = post.excerpt.slice(3, post.excerpt.length - 5).split(" ");
      var short_content = ""
      for (i=0; i< (15 || excerpt.length); i++){
        if(excerpt[i]) short_content += excerpt[i] + " ";
      }
      short_content += "[...]"


      var template = `<div class="column"><div class="item"><a href="${post.URL}"><h3 class="item-title">${post.title}</h3></a><p>${short_content}</p></div></div>`
      $(".container").append(template)
    })
    var columns = $(".column");
    for(var i = 0; i < columns.length; i+=4) {
      columns.slice(i, i+4).wrapAll("<div class='row'></div>");
    }
  }




  init();

})()

