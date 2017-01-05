## Adobe Frontend Coding Challenge

## Directions:
To get started, clone this repository from https://github.com/krpeacock/adobe_challenge.git and navigate into the directory.

Open index.html in your preferred program to interact with the website


Here are the terms I was given for this challenge:

```
Build an app!
·         Create a Single Page App with an MVC approach that displays JSON data in an elegant way that is responsive.
·         Use a framework of your choice (CanJS or native/vanilla JS is a bonus)
o   Use data from this URL: https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts/?callback=ajpRspthis 
o   Desktop view should display content in 4 columns, Tablet 2 columns, Mobile 1 column
o   Uses semantic markup
o   Bonus
§  Show/hide description content only using CSS
§  Manage displaying 10 data sets at a time and have a way to see more
§  Testable
·         Developing only for Chrome is fine
```

## What I Produced:
* Single-page, responsive app with a minimalist vanillaJS / jquery MVC
 * 4 column Desktop, 2 column Tablet, and 1 column Mobile
 * With Semantic Markup
* Handwritten modal screens that display additional information from the preview card
* Forward / backward navigation through the data set
* Instant updating of posts through a tool to specify how many posts to display per page


## My Process:

### Step 1 - The Data
My first step was to get my hands on the JSON and see what information I was working with. I identified:
* Title
* Author
* Content Excerpt
* Content
* and URL
as candidates for early inclusion. I structured an HTTP request to the server and set it aside to think about how I would bring the elements to the page. 

### Step 2 - The Framework 
Next, I decided which framework to use. While React and Angular both would have been comfortable environments to work within, I noted decided to go the extra mile and head over http://vanilla-js.com/. (Sorry for the lame joke). 

### Step 3 - Styling 
I spent a while filling up an HTML document with dummy data while I set up my columns and basic CSS. During this stage, I thought I would be able to use the Gravatars that were included from the JSON data, but I found out later that most of the gravatars were just placeholders. 

I settled on using flexbox and some fairly rudimentary media query logic to handle columns and rows.

### Step 4 - Bringing them together
Naturally, this is where most of my time was spent, and where most of my false-starts and second guessing happened. For a while, I was using a Node.js server to serve my content, but nothing was being generated on the backend. I decided to let the browser-side code take care of making the GET request while serving a static site.

 A couple values that I initially identified ended up not being useful. The Gravatar and the Author were't informative or interesting. I found that the exerpts could be excessively long, so I spent a some time drafting up a regex limitation to the excerpt. Ultimately, I settled on this piece of code to filter it to 15 words or less:
```
let short_content = ""
for (i=0; i< (15 || excerpt.length); i++){
  if(excerpt[i]) short_content += excerpt[i] + " ";
}
short_content += "[...]"
```
I used a combination of vanilla DOM manipulation plus jQuery to handle my templating and controllers. Since I already imported jQuery for my HTTP requests, I figured I might as well enjoy the benefits of `.click()` syntax.

Finally, some of my time went into researching AEM styling standards, and I discovered the Coral UI documentation for Adobe AEM. While the JavaScript is hidden, I managed to identify a few components and incorporate them into my own SCSS.

## With More Time
While I left some TODO's behind in my code, there are two main steps I would have liked to take. 

First, I would have restructured my code to reflect a more comprehensive MVC approach to separation of concerns. I was more occupied with getting content on the page for today's purposes, but even at this scale, some more organization at the start would have saved me time and produced nicer code. 

Secondly, I would continue to identify more useful information from the JSON and continue to translate it into functional, responsive components, with proper care to create a consistent aesthetic.
