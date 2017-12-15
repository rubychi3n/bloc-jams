var collectionItemTemplate =
'<div class="collection-album-container column fourth">'
+ '  <img src="assets/images/album_covers/01.png"/>'
+ '  <div class="collection-album-info caption">'
+ '    <p>'
+ '      <a class="album-name" href="album.html"> The Colors </a>'
+ '      <br/>'
+ '      <a href="album.html"> Pablo Picasso </a>'
+ '      <br/>'
+ '      X songs'
+ '      <br/>'
+ '    </p>'
+ '  </div>'
+ '</div>'
;

// here we are assigning the template to the collectionItemTemplate variable
// cached elements speed up page loading times 
// to make a template a string, it must be wrapped in quotation marks 
// to keep the string together, we use + at the start of each line

window.onload = function() {
    // #1 assinging specified element to the collectionContainer variable 
    var collectionContainer = document.getElementsByClassName('album-covers')[0];
    // #2 assigning empty string to clear content 
    collectionContainer.innerHTML = '';
    // #3 each loop adds the contents of the collectionItemTemplate to the innerHTML 
    // of the collection container -> generating the albums that display on the collection page 
    for (var i = 0; i < 12; i++) {
        collectionContainer.innerHTML += collectionItemTemplate;
    }
}
