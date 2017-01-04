var json
    posts;

var data = $.get("/posts", function(){
    json = data.responseJSON
}).done(()=>{
  console.log("hi")
  generatePosts(json);
})

function generatePosts(json){
   // 
}
