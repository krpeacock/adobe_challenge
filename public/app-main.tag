<app-main>
  <div class="container">
    <div class="row">
      <div class="column" each={posts.filter(whatShow)}>
        <h3 class="item-title">{title}</h3>
      </div>
    </div>
  </div>
  <script>
    this.posts = opts.posts;
    whatShow(){
      return this.posts.slice(0,4);
    }
  </script>
</app-main>