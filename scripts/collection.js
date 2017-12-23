// #1
// var collectionItemTemplate =
// change the name of variable that stores the template from collectionItemTemplate to template
var buildCollectionItemTemplate = function () {
    var template =
        '<div class="collection-album-container column fourth">' +
        '  <img src="assets/images/album_covers/01.png"/>' +
        '  <div class="collection-album-info caption">' +
        '    <p>' +
        '      <a class="album-name" href="album.html"> The Colors </a>' +
        '      <br/>' +
        '      <a href="album.html"> Pablo Picasso </a>' +
        '      <br/>' +
        '      X songs' +
        '      <br/>' +
        '    </p>' +
        '  </div>' +
        '</div>';
    // #2
    // wraping template in jQuery object in case we want to use jQuery methods in the future 
    return $(template);
};

$(window).load(function () {
    // #3 
    // prefixed collectionContainer with $ - a convention that identifies jQuery-related variables
    // changed to jQuery selector

    var $collectionContainer = $('.album-covers');
    // #4
    // replace innerHTML with jQuery's empty method 
    // which empties or removes any text or other elements from the elements it is called on
    $collectionContainer.empty();

    for (var i = 0; i < 12; i++) {
        var $newThumbnail = buildCollectionItemTemplate();
        // #5
        // replace += in the for lopp with the append()
        // we append the template to the collection container 
        $collectionContainer.append($newThumbnail);
    }
});


// here we are assigning the template to the collectionItemTemplate variable
// cached elements speed up page loading times 
// to make a template a string, it must be wrapped in quotation marks 
// to keep the string together, we use + at the start of each line

// vanilla JS
// window.onload = function () {
//     // #1 assinging specified element to the collectionContainer variable 
//     var collectionContainer = document.getElementsByClassName('album-covers')[0];
//     // #2 assigning empty string to clear content 
//     collectionContainer.innerHTML = '';
//     // #3 each loop adds the contents of the collectionItemTemplate to the innerHTML 
//     // of the collection container -> generating the albums that display on the collection page 
//     for (var i = 0; i < 12; i++) {
//         collectionContainer.innerHTML += collectionItemTemplate;
//     }
// }