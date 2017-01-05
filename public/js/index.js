//TODO: 

// Eliminate use of Globally scoped JSON call
// Build out modal view to display  more information like tags + links
// Implement search functionality
// Show which results are being displayed
// Migrate off jQuery


// Large-scale TODOS: 

// Implement Jasmine Unit Testing
// Tighten up event handling
// More rigorously separate MVC concerns
// Preprocess data into a database on backend to minimize excess data transfer 


var json;
(function(){

  function init(){
    // The Model is essentially nothing more than the JSON. I'm not running CRUD on it at this point
    var data = $.get("https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts", function(){
        json = data.responseJSON
    }).done(()=>{
    // Generate Post Views
      generatePosts(json, 10);
    })
    // Controller to alter number of data sets
    postLimiter()

    // Controller for stepping forward and backward through posts
    postStepper()


  }

  // TODO: Rename for clarity
  function postLimiter(){
    $(".header-container").append('<div id="result_number">Display <input id="number_input" type="text" value="10"/> results</div>')
    $("#number_input").on('input', function(){
      var value = $('#number_input').val();
      console.log(value)
      console.log(Number(value))
      if (Number(value) <= 100 ){
          generatePosts(json, Number(value));
      }
    })
  }


  function generatePosts(json, limit){
    var start_index = Number($('.container').attr('data-start'));
    var end_index = start_index + limit;


    $('.container').empty();
    var posts = json.posts;
    console.log(posts);

    for(i=start_index; i<end_index; i++){      
      $(".container").append(constructTemplate(posts[i]))
    
    }

    var columns = $(".column");
    for(var i = 0; i < columns.length; i+=4) {
      columns.slice(i, i+4).wrapAll("<div class='row'></div>");
    }
  }

  // TODO: make prettier
  function constructTemplate(post){
    let excerpt = post.excerpt.slice(3, post.excerpt.length - 5).split(" ");
    let short_content = ""
    for (i=0; i< (15 || excerpt.length); i++){
      if(excerpt[i]) short_content += excerpt[i] + " ";
    }
    short_content += "[...]"

    var div = document.createElement('div');
    div.className = "column";
    
    var item = document.createElement('div');
    item.className= "item";
    
    var title = document.createElement('h3');
    title.className = "item-title";
    title.innerHTML = post.title;

    var content = document.createElement('p');
    content.innerHTML = short_content;

    var button = document.createElement('button');
    button.className = "expand";
    $(button).text("See More");
    button.id=post.ID
    $(button).click(function(){
      var post = json.posts.filter((val)=>{
        return val.ID === Number(this.id);
      })[0]
      openModal(post)
    })

    // Append chaining
    item.append(title);
    item.append(content);
    item.append(button);

    div.append(item);


    return div;
  }

  // Modal Controller, Event Handling, and Templating
  // TODO: Separate concerns

  function openModal(post){
    console.log(post.ID)
    var modal_fill = document.createElement('div');
    modal_fill.className= "modal_fill"
    modal_fill.id = "modal";

    var modal_content = document.createElement('div');
    modal_content.className = "modal_content"

    var close = document.createElement('button');
    $(close).click(()=>{
      $('#modal').remove();
    })
    $(close).text("close");
    close.className = "close_modal";

    var title = document.createElement('h2');
    title.className = "item-title";
    title.innerHTML = post.title;


    var content = document.createElement('div');
    content.innerHTML = post.content;

    modal_content.append(close);
    modal_content.append(title);
    modal_content.append(content);

    modal_fill.append(modal_content);
    document.body.append(modal_fill);

    $(document).keyup(function(e) {
         if (e.keyCode == 27) { // escape key maps to keycode `27`
          $('#modal').remove();
        }
    });

  }

  // TODO: show what steps are being displayed
  function postStepper(){
    var start_index = Number($('.container').attr('data-start'));
    var limit = Number($("#number_input").val());


    var prev = document.createElement('a');
      $(prev).text('prev')
      $(prev).addClass("prev");
      $(prev).click((e)=>{
        e.preventDefault();
        if (start_index - limit >=0){
          $('.container').attr('data-start', Number($('.container').attr('data-start')) + Number($("#number_input")) );
        }
        else $('.container').attr('data-start', 0);
        generatePosts(json, limit)
      })

    
    var next = document.createElement('a');
    $(next).addClass("next");
    $(next).text("next");
    $(next).click((e)=>{
      e.preventDefault();
      $('.container').attr('data-start', Number($('.container').attr('data-start')) + Number($("#number_input").val()) ) ;
      generatePosts(json, limit)
    })
    $('footer').append(prev);
    $('footer').append(next);
  }


  init();

})()

